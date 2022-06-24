import { ServerError, EmailOrPasswordWrongError } from "../exceptions.js";
import { User } from "../models/user.js";
import { hashPassword, comparePassword, creatToken } from "./utils.js";

class UserDataAccess {


    async findUserByEmail(email) {
        try {
            const user = await User.findOne({ email: email });
            return user;
        } catch (error) {
            throw new ServerError(error);
        }
    }

    async createUser(email, password) {
        try {
            const hashedPassword = await hashPassword(password);
            const user = new User({ email, password: hashedPassword });
            await user.save();
            return user;
        } catch (error) {
            throw new ServerError(error);
        }
    }

    async checkEmailAndPassword(email, password) {
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                const passwordCheck = await comparePassword(password, user.password);
                if (passwordCheck) {
                    const token = creatToken({ email, userId: user._id.toString() });
                    return token;
                }
            }
            throw new EmailOrPasswordWrongError;
        } catch (error) {
            throw new ServerError(error);
        }
    }
}

export { UserDataAccess };