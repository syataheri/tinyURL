const bcrypt  = require( 'bcryptjs' );
const jwt  = require( "jsonwebtoken" );

const hashPassword = (password) => {
    return bcrypt.hash(password, 12);
}

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}

const creatToken = (email, userId) => {
    return jwt.sign(
        {
            email,
            userId
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
    );

}

module.exports = {hashPassword,comparePassword,creatToken}