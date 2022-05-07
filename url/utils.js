const shortid = require("shortid");

exports.createCode = () => {
    return urlCode = shortid.generate();
}