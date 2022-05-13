const { ServerError, UrlNotFoundError, ForbiddenError } = require('../exceptions');
const Url = require("../models/url");
const utils = require("./utils");

module.exports = class mongoDBFn {

    static async findURLByLongUrl(longUrl) {
        try {
            const url = await Url.findOne({ longUrl });
            return url;
        } catch (error) {
            throw new ServerError(error);
        }
    }

    static async createURL(longUrl, userId) {
        try {
            const urlCode = await utils.createCode(longUrl);
            let url = await Url.findOne({ urlCode });
            while (true) {
                url = await Url.findOne({ urlCode });
                if (!url) {
                    break;
                }
            }
            const baseUrl = process.env.BASE_URL;
            const shortUrl = baseUrl + "/" + urlCode;
            url = new Url({ longUrl, shortUrl, urlCode, userId });
            await url.save();
            return url;
        } catch (error) {
            throw new ServerError(error);
        }
    }

    static async getUserURLs(userId) {
        try {
            const urls = await Url.find({ userId });
            if (!urls) {
                throw -1;
            }
            return urls;
        } catch (error) {
            switch(error){
                case -1:
                    throw new UrlNotFoundError();
                default:
                    throw new ServerError(error);
            }        }
    }

    static async deleteUrl(code, userId) {
        try {

            let url = await Url.find({ urlCode: code });
            url = url[0];
            if (!url) {
                throw -1;
            }
            if (url.userId.toString() !== userId) {
                throw 0;
            }
            await url.remove();
        } catch (error) {
            switch(error){
                case -1:
                    throw new UrlNotFoundError();
                case 0:
                    throw new ForbiddenError();
                default:
                    throw new ServerError(error);
            }
        }
    }

    static async findURLByCode(urlCode) {
        try {
            const url = await Url.findOne({ urlCode });
            if (!url) {
                throw -1;
            }
            return url;
        } catch (error) {
            switch(error){
                case -1:
                    throw new UrlNotFoundError();
                default:
                    throw new ServerError(error);
            }
        }
    }
}