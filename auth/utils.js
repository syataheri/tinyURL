import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

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

export {hashPassword,comparePassword,creatToken}