const { StatusCodes } = require("http-status-codes");
const CustomErros = require("./CustomErros");
class ForbiddenError extends CustomErros {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
