const { ServerError } = require("../exceptions.js");
const { User } = require("../models/user.js");

const createUser = async (email, password) => {
  try {
    const user = new User({ email, password });
    await user.save();
    return user;
  } catch (error) {
    throw new ServerError(error);
  }
};

const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email: email });
  } catch (error) {
    throw new ServerError(error);
  }
};
module.exports = { createUser, findUserByEmail };
