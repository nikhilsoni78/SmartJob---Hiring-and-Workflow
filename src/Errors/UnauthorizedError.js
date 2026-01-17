const { StatusCodes } = require('http-status-codes');
const CustomErros = require("./CustomErros");
class Unauthorized extends CustomErros{
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = Unauthorized;