
const Url = require("../models/url");
const utils = require("./utils");

module.exports = class mongoDBFn {

    static async FindURLByLongUrl(longUrl) {
        try {
            const url = await Url.findOne({ longUrl });
            return url;
        } catch (error) {
            const err = await new SERVER_ERROR();
            err.data = error.message;
            return err;
        }
    }

    static async createURL(longUrl, userId) {
        try {
            const urlCode = await utils.createCode();
            const baseUrl = process.env.BASE_URL;
            const shortUrl = baseUrl + "/" + urlCode;
            const url = new Url({ longUrl, shortUrl, urlCode, userId });
            await url.save();
            return url;
        } catch (error) {
            const err = await new SERVER_ERROR();
            err.data = error.message;
            return err;
        }
    }

    static async getUserURLs(userId) {
        try {
            const urls = await Url.find({ userId });
            if (urls) {
                return urls;
            }
            return 0;
        } catch (error) {
            const err = await new SERVER_ERROR();
            err.data = error.message;
            return err;
        }
    }

    static async deleteUrl(code, userId) {
        let url = await Url.find({ urlCode: code });
        url = url[0];
        if (!url) {
            return 0;
        }
        if (url.userId.toString() !== userId) {
            return -1;
        }
        await url.remove();
        return 1;
    }
}