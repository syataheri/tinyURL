const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [

        new winston.transports.File({ filename: 'errors/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'errors/warn.log', level: 'warning' }),
        new winston.transports.File({ filename: 'errors/combined.log', level: 'silly' }),
        new winston.transports.File({ filename: 'errors/not-found.log', level: 'info' }),

        new winston.transports.Console({ format: winston.format.simple(), }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

module.exports = logger;