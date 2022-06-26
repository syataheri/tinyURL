import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "../exceptions.js";

const isAuthMiddleware = async (req, res, next) => {
  try {

    jwt.verify(req.get("Authorization").split(" ")[1], process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        throw err;
      }
      req.userId = decoded.email.userId;
      next();

    });
  } catch (error) {
    next(new NotAuthorizedError());
  }
};

export { isAuthMiddleware };