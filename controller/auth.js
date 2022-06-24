import { body, validationResult } from "express-validator";
import express from "express";

import { AuthService } from "../auth/auth.services.js";
import { NotValidError } from "../exceptions.js";

const authRouter = express.Router();

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Signin a new user and save it in Mongodb.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: objetc
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: sya@gmail.com
 *               password: 1234@St2
 *     responses:
 *       201:
 *         description: Created User.
 *       422:
 *         description: You have to enter valid values!
*/

authRouter.post(
  "/signup",
  [
    body("email").isEmail().withMessage("enterd value shoud be type of email"),
    body("password").isStrongPassword().withMessage("Password should be 8 character combination of number, letter and symbol")
  ],
  async (req, res, next) => {
    const error = validationResult(req);

    try {
      if (!error.isEmpty()) {
        throw new NotValidError(error.array());
      }

      const { email, password } = req.body;
      const authService = new AuthService(email, password);
      await authService.singin();
      return res.status(201).json({
        message: "user successfully created now you can login with it!",
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: login user with email and password.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: objetc
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: syamak 
 *               email: sya@gmail.com
 *               password: 1234@St2
 *     responses:
 *       201:
 *         description: Login was successful.
 *       422:
 *         description: You have to enter valid email or password!
*/
authRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  const authService = new AuthService(email, password);
  try {
    const result = await authService.login();

    if (result.statusCode) {
      return next(result);
    }
    return res.status(200).json({
      message: "Congrats your in",
      token: result,
    });
  } catch (err) { next(err); }

});

export { authRouter };
