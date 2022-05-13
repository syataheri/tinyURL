const AuthRepositoryMongo = require('./auth.repository.mongodb');
const { EmailDuplicateError, EmailOrPasswordWrongError } = require('../exceptions');

module.exports = class AuthService {

    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    async singin() {
        let user = await AuthRepositoryMongo.findUserByEmail(this.email);
        if (user) {
            throw new EmailDuplicateError();
        }
        user = await AuthRepositoryMongo.createUser(this.email, this.password);
        return user;
    }

    async login() {
        const user = await AuthRepositoryMongo.checkEmailAndPassword(this.email, this.password);
        if (!user) {
            throw new EmailOrPasswordWrongError();
        }
        return user;
    }
}

