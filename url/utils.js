const nanoid = require("nanoid/non-secure");

const createCode = () => {
  try {
    return nanoid();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createCode };
