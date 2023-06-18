const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/sendEmail");
const signToken = require("../utils/signToken");
const generator = require("generate-password");
const crypto = require("crypto");

const { promisify } = require("util");

// REGISTER FUNCTION
exports.registerGiver = catchAsync(async (req, res, next) => {
  const password = generator.generate({
    length: 12,
    numbers: true,
  });

  const user = new User({
    ...req.body,
    role: "Donneur",
    password: password,
    passwordConfirm: password,
    added_by: req.user.id,
    status: true,
  });

  await user.save();

  const emailOptions = {
    email: user.email,
    subject: "Bienvenue à notre organisation",
    html: `<p>Bienvenue ${
      user.first_name + " " + user.last_name
    } chez Croissant Rouge Tunisie Nabeul, vous pouvez vous connecter en utilisant le lien et vos identifiants de compte ci-dessous.<br/><br/><p>Email: ${
      user.email
    }</p><p>Mot de passe: ${password}</p><a href="http://localhost:5173/login">Se connecter !</></p>`,
  };

  sendEmail(emailOptions);

  res.status(201).json({
    status: "success",
    user,
  });
});

exports.register = catchAsync(async (req, res, next) => {
  const password = generator.generate({
    length: 12,
    numbers: true,
  });

  const user = new User({
    ...req.body,
    password: password,
    passwordConfirm: password,
  });

  await user.save();

  const emailOptions = {
    email: req.body.email,
    subject: "Merci de votre inscription",
    html: `<p>Nous avons remarqué que vous êtes candidat pour rejoindre notre organisation, nous vous répondrons sous peu concernant votre candidature.</p>
          <p>Cordialement, Croissant Rouge Tunisie Nabeul</p>
          `,
  };

  sendEmail(emailOptions);

  res.status(201).json({
    status: "success",
    user,
  });
});

exports.validateAccount = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.params.id).select("+password");

  if (!user) {
    return next(new AppError("User not found !", 400));
  }

  const password = generator.generate({
    length: 12,
    numbers: true,
  });

  user.password = password;
  user.passwordConfirm = password;
  user.status = true;

  await user.save();

  const emailOptions = {
    email: user.email,
    subject: "Bienvenue à notre organisation",
    html: `<p>Bienvenue ${
      user.first_name + " " + user.last_name
    } chez Croissant Rouge Tunisie Nabeul, vous pouvez vous connecter en utilisant le lien et vos identifiants de compte ci-dessous.<br/><br/><p>Email: ${
      user.email
    }</p><p>Mot de passe: ${password}</p><a href="http://localhost:5173/login">Se connecter !</></p>`,
  };

  sendEmail(emailOptions);

  res.status(201).json({
    status: "success",
    message:
      "Un courriel a été envoyé au volantaire contenant les informations d'identification (" +
      user.first_name +
      " " +
      user.last_name +
      ")",
  });
});

exports.disabledAccount = catchAsync(async (req, res, next) => {
  let user = await User.findByIdAndUpdate(req.params.id, { status: false });
  res.status(201).json({
    status: "success",
    message: "Utilisateur désactivé avec succès",
  });
});

// LOGIN FUNCTION
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new AppError("Veuillez fournir un email et un mot de passe !", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Email ou mot de passe incorrect", 400));
  }

  const token = signToken(user._id, user.role, user.first_name, user.last_name);

  user.password = undefined;

  res.status(201).json({
    token,
    role: user.role,
    fullName: user.first_name + " " + user.last_name,
    status: user.status,
  });
});

// FORGOT PASSWORD FUNCTION
exports.forgetPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  // Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const emailOptions = {
    email: req.body.email,
    subject: "Réinitialiser le mot de passe",
    html: `<div><h4>Lien pour réinitialiser votre mot de passe:</h4><a href="${process.env.LINK}reset/${resetToken}">${process.env.LINK}reset/${resetToken}</a><div>`,
  };

  sendEmail(emailOptions);

  res.status(200).json({
    status: "success",
  });
});

// RESET PASSWORD FUNCTION
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json({ message: "success" });
});

// CHANGE PASSWORD FUNCTION
exports.changePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  if (req.body.password !== req.body.passwordConfirm)
    return next(new AppError("Confirmer votre mot de passe !", 400));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();

  res.status(200).json({ status: "success" });
});

// EDIT ACCOUNT
exports.editAccount = catchAsync(async (req, res, next) => {
  let user = await User.findByIdAndUpdate(req.user._id, { ...req.body });
  res.status(201).json({
    user,
  });
});

exports.fetchMe = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.user._id).select("+password");
  res.status(200).json({
    user,
  });
});

// PROTECT MIDDLEWARE
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exist.", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

// RESTRICT MIDDLEWARE
exports.restrictTo = (roles) => {
  return (req, res, next) => {
    // roles ['ADMIN', "SUPER_ADMIN", "]. role='user'
    if (!roles.includes(req.user.Role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

exports.SetRole = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    role: req.body.role,
  });

  res.status(201).json({
    status: "success",
    user,
  });
});
