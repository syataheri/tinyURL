const { ServerError } = require("../exceptions.js");
const { Url } = require("../models/url.js");

const findURLByLongUrl = async (longUrl) => {
  try {
    return Url.findOne({ longUrl });
  } catch (error) {
    throw new ServerError(error);
  }
};

const createURL = async ({ longUrl, shortUrl, urlCode, userId }) => {
  try {
    const url = new Url({ longUrl, shortUrl, urlCode, userId });
    return url.save();
  } catch (error) {
    throw new ServerError(error);
  }
};

const getUserURLs = async (userId) => {
  try {
    return Url.find({ userId });
  } catch (error) {
    throw new ServerError(error);
  }
};

const deleteUrl = async (urlCode) => {
  try {
    return Url.deleteOne({urlCode});
  } catch (error) {
    throw new ServerError(error);
  }
};

const findURLByCode = async (urlCode) => {
  try {
    return Url.findOne({ urlCode });
  } catch (error) {
    throw new ServerError(error);
  }
};

module.exports = {
  findURLByCode,
  findURLByLongUrl,
  createURL,
  deleteUrl,
  getUserURLs,
};
