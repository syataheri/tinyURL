import { UrlDataAccess } from './url.repository.mongodb.js';

class UrlService {

    constructor() {
        this.urlDataAccess = new UrlDataAccess;
    }

    async createShortURL(longUrl, userId) {

        let url = await this.urlDataAccess.findURLByLongUrl(longUrl);
        if (url) {
            return url;
        }
        url = await this.urlDataAccess.createURL(longUrl, userId);
        return url;
    }

    async getUserURLs(userId) {
        return await this.urlDataAccess.getUserURLs(userId);
    }

    async deleteURL(code, userId) {
        return await this.urlDataAccess.deleteUrl(code, userId);

    }

    async redirect(code) {
        return await this.urlDataAccess.findURLByCode(code);
    }
}

export { UrlService }