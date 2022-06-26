import express from "express";
import { body, validationResult } from "express-validator";

import { UrlService } from "../url/url.services.js";
import { isAuthMiddleware } from "../middleware/is-auth.js";
import { urlValidationMiddleware } from "./validation.js";

const urlRouter = express.Router();


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

urlRouter.post(
  "/shorten",
  isAuthMiddleware,
  urlValidationMiddleware,
  async (req, res, next) => {
    try {

      const { longUrl } = req.body;

      const urlService = new UrlService;
      const userId = req.userId;
      const result = await urlService.createShortURL(longUrl, userId);
      console.log(result)
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


urlRouter.get("/", isAuthMiddleware, async (req, res, next) => {
  const urlService = new UrlService();
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

urlRouter.delete("/delete/:code", isAuthMiddleware, async (req, res, next) => {
  const code = req.params.code;
  const urlService = new UrlService();
  try {

    await urlService.deleteURL(code, req.userId);
    res.status(202).json({ message: "URL deleted!" });
  } catch (error) {
    next(error);
  }

});

export { urlRouter };