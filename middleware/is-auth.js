const jwt = require("jsonwebtoken");
const { NotAuthorized } = require("../exceptions");

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization").split(" ")[1];

  if (!authHeader) {
    const err = await new NotAuthorized();
    return next(err);
  }
  const token = jwt.verify(authHeader, process.env.JWT_SECRET_KEY);
  if (!token) {
    const err = await new NotAuthorized();
    return next(err);
  }
  req.userId = token.email.userId;
  next();
};
