const express = require("express");
const { body, validationResult } = require("express-validator");

const URLService = require("../url/url.services.js");
const isAuth = require("../middleware/is-auth");
const { NotValidError } = require("../exceptions");

const router = express.Router();


/**
 * @swagger
 * /api/url/shorten:
 *   post:
 *     summary: take a url and short it then save it in Mongodb.
 *     security:
 *       - jwt: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: objetc
 *             properties:
 *               longUrl:
 *                 type: string
 *             example:
 *               longUrl: "https://www.digikala.com/search/category-ice-cream-maker/"
 *     responses:
 *       201:
 *         description: Created a Short URL.
 *       403:
 *         description: Not Authorized!
 *       422:
 *         description: You have to enter valid URL!
*/

router.post(
  "/shorten",
  isAuth,
  body("longUrl").isURL().withMessage("you have to enter valid url"),
  async (req, res, next) => {
    const error = validationResult(req);
    try {
      if (!error.isEmpty()) {
        throw new NotValidError(error.array());
      }
      const { longUrl } = req.body;

      const urlService = new URLService();
      const userId = req.userId;
      const result = await urlService.createShortURL(longUrl, userId);

      return res.status(201).json({ code: result.urlCode, shortUrl: result.shortUrl });
    } catch (error) {
      next(error);
    }

  });


/**
 * @swagger
 * /api/url:
 *   get:
 *     summary: Get all user url's.
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Get a long URL.
 *       403:
 *         description: Not Authorized!
 *       404:
 *         description: URL not found!
*/


router.get("/", isAuth, async (req, res, next) => {
  const urlService = new URLService();
  try {
    const result = await urlService.getUserURLs(req.userId);
    return res.status(200).json({ code: result.urlCode, shortUrl: result.shortUrl });
  } catch (error) {
    next(error);
  }
});


/**
 * @swagger
 * /api/url/delete/{code}:
 *   delete:
 *     summary: Delete a URL.
 *     parameters:
 *     - in: path
 *       name: code
 *     responses:
 *       204:
 *         description: URL successfully deleted.
 *       403:
 *         description: Not Authorized!
 *       404:
 *         description: URL not found!
*/

router.delete("/delete/:code", isAuth, async (req, res, next) => {
  const code = req.params.code;
  const urlService = new URLService();
  try {

    await urlService.deleteURL(code, req.userId);
    res.status(202).json({ message: "URL deleted!" });
  } catch (error) {
    next(error);
  }

});

module.exports = router;