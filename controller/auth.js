const express  = require( "express" );
const authService  = require( "../auth/auth.services.js" );
const { signupValidationMiddleware }  = require( "./validation.js" );
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
  signupValidationMiddleware,
  async (req, res, next) => {

    try {

      const { email, password } = req.body;
      await authService.singin(email, password);
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

  try {
    const result = await authService.login(email, password);

    if (result.statusCode) {
      return next(result);
    }
    return res.status(200).json({
      message: "Congrats your in",
      token: result,
    });
  } catch (err) { next(err); }

});

module.exports = { authRouter };
