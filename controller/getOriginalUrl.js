import express from "express";

import { UrlService } from "../url/url.services.js";

const getOriginalUrlRouter = express.Router();

/**
* @swagger
* /{code}:
*   get:
*     summary: Redirect to to long/original URL.  
*     description: Get the code and use that to retrieve long URL. Swagger can not redirect for that you did not get params to send!
*     responses:
*       200:
*         description: Get a long URL.
*/

getOriginalUrlRouter.get("/:code", async (req, res, next) => {
  const code = req.params.code;

  const urlService = new UrlService();
  try {
    const reslut = await urlService.redirect(code);

    return res.status(200).redirect(reslut);
  } catch (error) {
    next(error);
  }
});

export { getOriginalUrlRouter };