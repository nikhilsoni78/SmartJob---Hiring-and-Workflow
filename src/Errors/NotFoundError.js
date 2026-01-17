const { StatusCodes } = require('http-status-codes');
const CustomErros = require("./CustomErros");
class NotfoundError extends CustomErros{
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotfoundError;