const { ForbiddenError, UnauthorizedError } = require("../Errors");

const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new UnauthorizedError("Authentication Required");
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ForbiddenError(
        "You do not have permission to access this resource"
      );
    }
    next();
  };
};

module.exports = roleMiddleware;
