const { StatusCodes } = require("http-status-codes");
const { CustomErrors } = require('../Errors');


const ErrorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof CustomErrors) {
     return res.status(err.statusCode).json({ message: err.message });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({message:err.message, err});
};

module.exports = ErrorHandler;
