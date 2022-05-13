const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.hashPassword = (password) => {
    return bcrypt.hash(password, 12);
}

exports.comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}

exports.creatToken = (email, userId) => {
    return jwt.sign(
        {
            email,
            userId
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
    );

}