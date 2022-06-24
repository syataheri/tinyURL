import {UserDataAccess} from './auth.repository.mongodb.js';
import { EmailDuplicateError } from '../exceptions.js';

class AuthService {


    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.userDataAccess = new UserDataAccess;
        
    }

    async singin() {
         
        let user = await this.userDataAccess.findUserByEmail(this.email);
        if (user) {
            throw new EmailDuplicateError();
        }
        user = await this.userDataAccess.createUser(this.email, this.password);
        return user;
    }

    async login() {
        const user = await this.userDataAccess.checkEmailAndPassword(this.email, this.password);
        return user;
    }
}


export {AuthService};