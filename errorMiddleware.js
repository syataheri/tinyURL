// importing logger from winston

const logger = require('./winston');

module.exports = (error, req, res, next) => {
    const status = error.statusCode;
    const message = error.message;
    const data = error.data;
    if (error.statusCode === 401) {
        logger.warn(`This happend because user unauthenticated on ${new Date()} with statusCode : ${error.statusCode} and message : ${error.message}`);;
    }
    else if (error.statusCode === 403) {
        logger.warn(`This happend because action is not allowed on ${new Date()}} with statusCode : ${error.statusCode} and message : ${error.message}`);;
    }
    else if (error.statusCode === 404) {
        logger.info(`This happend because data is not found on ${new Date()} with statusCode : ${error.statusCode} and message : ${error.message}`);;
    }
    else if (error.statusCode === 409 || error.statusCode === 406) {
        logger.silly(`This happend because user data is invalid on ${new Date()} with statusCode : ${error.statusCode} and message : ${error.message} and data: ${error.data}`);;
    }
    else {
        logger.error(`This happend because server failed to connect on ${new Date()} with statusCode : ${error.statusCode} and message : ${error.message}`);
    }
    res.status(status).json({
        message: message,
        data: data,
    });
}