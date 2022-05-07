const Url = require("../models/url");

module.exports = class mongoDBFn {

    static async findURLByCode(urlCode) {
        try {
            const url = await Url.findOne({ urlCode });
            return url;
        } catch (error) {
            const err = await new SERVER_ERROR();
            err.data = error.message;
            return err;
        }
    }
}