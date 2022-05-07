const { body, validationResult } = require("express-validator");
const express = require("express");

const AuthService = require("../auth/auth.services.js");
const { NOTVALID } = require("../exceptions");

const router = express.Router();

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
 *         description: Created User.
 *       422:
 *         description: You have to enter valid values!
*/

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("enterd value shoud be type of email"),
    body("password").isStrongPassword().withMessage("Password should be 8 character combination of number, letter and symbol")
  ],
  async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      const err = await new NOTVALID();
      err.data = error.array();
      return next(err);
    }

    const { email, password } = req.body;
    const authService = new AuthService(email, password);
    const result = await authService.singin();

    if (result.statusCode) {
      return next(result);
    }
    return res.status(process.env.CREATED).json({
      message: "user successfully created now you can login with it!",
      user: result,
    });
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
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  const authService = new AuthService(email, password);
  const result = await authService.login();

  if (result.statusCode) {
    return next(result);
  }
  return res.status(process.env.OK).json({
    message: "Congrats your in",
    token: result,
  });
});

module.exports = router;
