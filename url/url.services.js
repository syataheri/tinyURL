const UrlRepositoryMongo = require('./url.repository.mongodb');
const { UrlNotFoundError, ForbiddenError } = require('../exceptions');
const url = require('../models/url');

module.exports = class UrlService {

    constructor() {
    }

    async createShortURL(longUrl, userId) {

        let url = await UrlRepositoryMongo.findURLByLongUrl(longUrl);
        if (url) {
            return url;
        }
        url = await UrlRepositoryMongo.createURL(longUrl, userId);
        return url;
    }

    async getUserURLs(userId) {
        return await UrlRepositoryMongo.getUserURLs(userId);
    }

    async deleteURL(code, userId) {
        return await UrlRepositoryMongo.deleteUrl(code, userId);

    }

    async redirect(code) {
        return await UrlRepositoryMongo.findURLByCode(code);
    }
}

