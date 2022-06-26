import dotenv from "dotenv";

dotenv.config();


// requiring the express for the middlewares

import express from "express";
const app = express();


app.use(express.json());


//importing routes
import { urlRouter } from "./controller/url.js";
import { authRouter } from "./controller/auth.js";
import { getOriginalUrlRouter } from "./controller/getOriginalUrl.js";
import { errorRouter } from "./errorMiddleware.js";

//connect to mongoD
import { ServerError } from "./exceptions.js";

import { connectMongonDB } from "./config/db.js";
try {
  connectMongonDB();
} catch (err) {
  throw new ServerError(err);
}

// swagger requires
import swaggerUI from "swagger-ui-express";
import { swaggerDocs } from "./swagger.js";

// passing the Routers to middlewares
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/api/url", urlRouter);
app.use("/api/auth", authRouter);
app.use(getOriginalUrlRouter);
app.use(errorRouter);

// Start listening to server
app.listen(process.env.PORT, () => {
  console.log(`server is runing on port ${process.env.PORT}`);
});

export { app };