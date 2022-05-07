const getOriginalURLRepositoryMongo = require('./getOriginalURL.repository.mongogdb');
const { UrlNotFound } = require('../exceptions');

module.exports = class AuthService {

    constructor() {
    }

    async redirect(code) {
        const url = await getOriginalURLRepositoryMongo.findURLByCode(code);
        if (!url) {
            return await new UrlNotFound();
        }
        return url.longUrl;
    }

}

