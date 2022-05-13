// importing logger from winston

const logger = require('./winston');

module.exports = (error, req, res, next) => {
    const status = error.statusCode;
    const message = error.message;
    const data = error.data;
    if (status === 500) {
        logger.error(`This happend because server failed to connect on ${new Date()} with message : ${error.message} and data : ${error.data}`);
    }
    res.status(status).json({
        message: message,
        data: data,
    });
}