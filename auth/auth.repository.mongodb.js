
const User = require("../models/user");
const utils = require("./utils");

module.exports = class mongoDBFn {

    static async findUserByEmail(email) {
        try {
            const user = await User.findOne({ email: email });
            return user;
        } catch (error) {
            const err = await new SERVER_ERROR();
            err.data = error.message;
            return err;
        }
    }

    static async createUser(email, password) {
        try {
            const hashedPassword = await utils.hashPassword(password);
            const user = new User({ email, password: hashedPassword });
            await user.save();
            return user;
        } catch (error) {
            const err = await new SERVER_ERROR();
            err.data = error.message;
            return err;
        }
    }

    static async checkEmailAndPassword(email, password) {
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                const passwordCheck = await utils.comparePassword(password, user.password);
                if (passwordCheck) {
                    const token = utils.creatToken({ email, userId: user._id.toString() });
                    return token;
                }
            }
            return 0;
        } catch (error) {
            const err = await new SERVER_ERROR();
            err.data = error.message;
            return err;
        }
    }
}