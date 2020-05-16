const AppError = require("../utils/appError");

// send error response back to client
const sendError = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

const handleJWTError = (err) => new AppError("Please login first.", 401);

const handleDublicateKeyError = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value for ${value}. Please Enter different value.`;
  return new AppError(message, 400);
};

// Global Error Handler
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let operationalError = { ...err };

  operationalError.message = err.message;
  if (err.code == 11000) {
    operationalError = handleDublicateKeyError(err);
  }
  if (err.name == "JsonWebTokenError") {
    operationalError = handleJWTError(err);
  }

  sendError(operationalError, res);
};
