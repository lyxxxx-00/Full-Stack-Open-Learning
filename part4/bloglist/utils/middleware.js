const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  }

  next();
};

const userExtractor = async (req, res, next) => {
  try {
    const detoken = jwt.verify(req.token, process.env.SECRET);
    if (!detoken.id) {
      return res.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(detoken.id);
    if (!user) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return res.status(400).json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: "token missing or invalid" });
  }

  next(error);
};

module.exports = {
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};
