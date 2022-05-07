class BaseError extends Error {
    constructor(name, statusCode, description) {
        super(description);

        this.name = name;
        this.statusCode = statusCode;

        Error.captureStackTrace(this);
    }
}

class EmailDuplicateError extends BaseError {
    constructor(name = "CONFLICT", statusCode = +process.env.CONFLICT, description = 'email address already exist, try login with it.') {
        super(name, statusCode, description);
    }
}

class EmailOrPasswordWrong extends BaseError {
    constructor(name = "NOT FOUND", statusCode = +process.env.NOT_FOUND, description = 'email or password is wrong.') {
        super(name, statusCode, description);
    }
}

class UrlNotFound extends BaseError {
    constructor(name = "NOT FOUND", statusCode = +process.env.NOT_FOUND, description = 'No URL found') {
        super(name, statusCode, description);
    }
}

class NotAuthorized extends BaseError {
    constructor(name = "NOT Authorized", statusCode = +process.env.UNAUTHORIZED, description = 'Not Authorized') {
        super(name, statusCode, description);
    }
}

class NOTVALID extends BaseError {
    constructor(name = "NOT VALID", statusCode = +process.env.NOT_VALID, description = 'Data not found') {
        super(name, statusCode, description);
    }
}

class FORBIDDEN extends BaseError {
    constructor(name = "FORBIDDEN", statusCode = +process.env.FORBIDDEN, description = 'Forbidden! This is not allowed!') {
        super(name, statusCode, description);
    }
}

class SERVER_ERROR extends BaseError {
    constructor(name = "SERVER_ERROR", statusCode = +process.env.SERVER_ERROR, description = 'this is happend in server side...!') {
        super(name, statusCode, description);
    }
}

module.exports = {
    EmailDuplicateError,
    EmailOrPasswordWrong,
    UrlNotFound,
    NotAuthorized,
    FORBIDDEN,
    NOTVALID,
    SERVER_ERROR
}