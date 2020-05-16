const db = require("../models");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { catchAsync } = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { User } = db;

const signToken = (id) => {
  return jwt.sign({ id }, "key");
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  res.cookie("jwt", token, { httpOnly: true, path: "/" });
  res.status(statusCode).json({ accessToken: token, user });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please Provide email and password", 400));
  }

  let result = await User.findAll({
    where: {
      email,
      password,
    },
  });
  if (result.length == 0) {
    return next(new AppError("Email or password is not correct", 401));
  } else createSendToken(result[0], 200, res);
});

exports.signup = catchAsync(async (req, res) => {
  const { email, password, name, address } = req.body;
  let user = await User.create({
    email,
    password,
    name,
    address,
  });
  user = user.toJSON();
  createSendToken(user, 201, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token = null;
  // check if token is present in header or not
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError("Pleas log in to continue.", 401));
  }

  // verify the token
  const decoded = await promisify(jwt.verify)(token, "key");

  // verify if the user still exists or not

  let user = await User.findAll({
    where: {
      id: decoded.id,
    },
  });

  if (!user) {
    return next(
      new AppError("The user belonging to this token no longer exist.", 401)
    );
  }

  // grant access to the protected route.
  req.user = user[0].dataValues;

  next();
});
