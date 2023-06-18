const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require("crypto");
const { type } = require("os");

const UserSchema = new mongoose.Schema({
  added_by: String,
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Veuillez nous indiquer une adresse e-mail"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Veuillez entrer un email valide"],
  },
  password: {
    type: String,
    required: [true, "Veuillez entrer un mot de passe"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Veuillez confirmer le mot de passe"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "les mots de passe ne sont pas les mêmes",
    },
  },
  role: {
    type: String,
    enum: ["Volontaire", "Member", "Donneur", "Admin"],
    default: "Volontaire",
  },
  status: {
    type: Boolean,
    default: false,
  },
  skill: {
    type: String,
  },
  skill_description: {
    type: String,
  },
  occupation: {
    type: String,
  },
  adress: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
  disponibility: {
    type: String,
  },
  badges: [String],
  passwordResetToken: String,
  passwordResetExpires: Date,
});

UserSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 60 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("Users", UserSchema);

module.exports = User;
