const UrlRepositoryMongo = require('./url.repository.mongodb');
const { UrlNotFound, FORBIDDEN } = require('../exceptions');

module.exports = class UrlService {

    constructor() {
    }

    async createShortURL(longUrl, userId) {

        let url = await UrlRepositoryMongo.FindURLByLongUrl(longUrl);
        if (url) {
            return url;
        }
        url = await UrlRepositoryMongo.createURL(longUrl, userId);
        return url;
    }

    async getUserURLs(userId) {
        const urls = await UrlRepositoryMongo.getUserURLs(userId);
        if (!urls) {
            return await new UrlNotFound();
        }
        return urls;
    }

    async deleteURL(code, userId) {
        const url = await UrlRepositoryMongo.deleteUrl(code, userId);
        if (url === 0) {
            return await new UrlNotFound();
        }
        if (url === -1) {
            return await new FORBIDDEN();
        }
        return url;
    }
}

