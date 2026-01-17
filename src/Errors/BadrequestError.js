const { StatusCodes } = require('http-status-codes');
const CustomErros = require('./CustomErros');


class BadRequestError extends CustomErros{
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = BadRequestError;