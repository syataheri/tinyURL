require("dotenv").config();


// requiring the express for the middlewares

const express = require("express");
const app = express();


app.use(express.json());


//importing routes
const urlRouter = require("./controller/url");
const authRouter = require("./controller/auth");
const getOriginalUrlRouter = require("./controller/getOriginalUrl");
const errorRouter = require("./errorMiddleware");

//connect to mongoDB
const connectDB = require("./config/db").connectDB;
connectDB();

// swagger requires
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = require("./swagger");

// passing the Routers to middleware
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/api/url", urlRouter);
app.use("/api/auth", authRouter);
app.use(getOriginalUrlRouter);
app.use(errorRouter);

// Start listening to server
app.listen(process.env.PORT, () => {
  console.log(`server is runing on port ${process.env.PORT}`);
});

module.exports = app;