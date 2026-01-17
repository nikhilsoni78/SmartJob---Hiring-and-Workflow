const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const { UnauthorizedError } = require("../Errors");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Invalid Authentication");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: decodedToken.userId,
      role: decodedToken.role,
    };
    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid Authentication ");
  }
};

module.exports = authMiddleware;
