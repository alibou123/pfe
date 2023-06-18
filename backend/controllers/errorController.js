const AppError = require("../utils/appError");

const handleDuplicateEmail = async (err, payload) => {
  const message = ` L'email '${err.keyValue.email}' est déjà utilisé choisir un autre`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  console.log(err.message);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error("ERROR 💥", err);

    // 2) Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

module.exports = async (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.code === 11000 && err.keyPattern.email === 1)
      err = await handleDuplicateEmail(err, {
        matricule: req.body.matricule,
      });

    sendErrorProd(err, res);
  }
};
