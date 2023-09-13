const urlDataAccess = require("./url.repository.mongodb.js");
const { createCode } = require("./utils.js");
const { UrlNotFoundError, ForbiddenError } = require("../exceptions.js");

const createShortURL = async (longUrl, userId) => {
  let url = await urlDataAccess.findURLByLongUrl(longUrl);
  if (url) {
    return url;
  }
  let urlCode;
  let checkCodeForDuplicate = true;
  while (checkCodeForDuplicate) {
    urlCode = await createCode(longUrl);
    checkCodeForDuplicate = await urlDataAccess.findURLByCode(urlCode);
  }
  const baseUrl = process.env.BASE_URL;
  const shortUrl = baseUrl + "/" + urlCode;
  return await urlDataAccess.createURL({
    longUrl,
    shortUrl,
    urlCode,
    userId,
  });
};

const getUserURLs = async (userId) => {
  const urls = await urlDataAccess.getUserURLs(userId);
  if (!urls.length) {
    return "User does not have any URLs";
  }
  return urls;
};

const deleteURL = async (code, userId) => {
  let url = await urlDataAccess.findURLByCode(code);
  if (!url) {
    throw new UrlNotFoundError();
  }
  if (url.userId.toString() !== userId) {
    throw new ForbiddenError();
  }
  await urlDataAccess.deleteUrl(code);
  return "URL deleted successfully";
};

const redirect = async (code) => {
  let url = await urlDataAccess.findURLByCode(code);
  if (!url) {
    throw new UrlNotFoundError();
  }
  return (await urlDataAccess.findURLByCode(code)).longUrl;
};

module.exports = { createShortURL, getUserURLs, deleteURL, redirect };
