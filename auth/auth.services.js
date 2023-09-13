const userDataAccess = require("./auth.repository.mongodb.js");
const { EmailDuplicateError } = require("../exceptions.js");
const {
  EmailOrPasswordWrongError,
  EmailDoesNotExistError,
} = require("../exceptions.js");
const { hashPassword, comparePassword, creatToken } = require("./utils.js");

const singin = async (email, password) => {
  let user = await userDataAccess.findUserByEmail(email);
  if (user) {
    throw new EmailDuplicateError();
  }
  const hashedPassword = await hashPassword(password);
  return await userDataAccess.createUser(email, hashedPassword);
};

const login = async (email, password) => {
  const user = await userDataAccess.findUserByEmail(email, password);

  if (!user) throw new EmailDoesNotExistError();

  const passwordCheck = await comparePassword(password, user.password);
  if (passwordCheck) {
    const token = creatToken({ email, userId: user._id.toString() });
    return token;
  }
  throw new EmailOrPasswordWrongError();
};
module.exports = { singin, login };
