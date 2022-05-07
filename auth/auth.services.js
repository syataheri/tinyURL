const AuthRepositoryMongo = require('./auth.repository.mongodb');
const { EmailDuplicateError, EmailOrPasswordWrong } = require('../exceptions');

module.exports = class AuthService {

    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    async singin() {
        let user = await AuthRepositoryMongo.findUserByEmail(this.email);
        if (user) {
            return await new EmailDuplicateError();
        }
        user = await AuthRepositoryMongo.createUser(this.email, this.password);
        return user;
    }

    async login() {
        const user = await AuthRepositoryMongo.checkEmailAndPassword(this.email, this.password);
        if (!user) {
            return await new EmailOrPasswordWrong();
        }
        return user;
    }
}

