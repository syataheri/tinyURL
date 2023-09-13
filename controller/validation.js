const Joi  = require( "joi" );
const { NotValidError }  = require( "../exceptions.js" );

const signupValidationMiddleware = async (req, res, next) => {
    const { email, password } = req.body;
    const schema = Joi.object({
        email: Joi.string().required().email().trim().message("You should Enter valid email address"),
        password: Joi.string().required()
            .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,20})'))
            .message("You password should be minmum 8 characters, combenation of uppercase, lowercase, digit and symbol."),
    });

    const error = await schema.validate({ email, password });

    if (error.error) {
        next(new NotValidError(error.error.message));
    }
    next();
}

const urlValidationMiddleware = async (req, res, next) => {
    const { longUrl } = req.body;

    const schema = Joi.object({
        longUrl: Joi.string().required().uri()
            .message("You should enter valid URL")
    });
    const error = await schema.validate({ longUrl });
    if (error.error) {
        next(new NotValidError(error.error.message));
    }
    next();
}

module.exports = { signupValidationMiddleware, urlValidationMiddleware };