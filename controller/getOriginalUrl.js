const express = require("express");

const router = express.Router();

const GetOrininalUrlService = require("../getOriginalURL/getOriginalURL.services");

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

router.get("/:code", async (req, res, next) => {
  const code = req.params.code;

  const getOriginalURLService = new GetOrininalUrlService();
  const reslut = await getOriginalURLService.redirect(code);

  if (reslut.statusCode) {
    return next(reslut);
  }
  return res.status(process.env.OK).redirect(reslut);
});

module.exports = router;