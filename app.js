const dotenv  = require( "dotenv" );

dotenv.config();


// requiring the express for the middlewares

const express  = require( "express" );
const app = express();


app.use(express.json());


//importing routes
const { urlRouter }  = require( "./controller/url.js" );
const { authRouter }  = require( "./controller/auth.js" );
const { getOriginalUrlRouter }  = require( "./controller/getOriginalUrl.js" );
const { errorRouter }  = require( "./errorMiddleware.js" );

//connect to mongoD
const { ServerError }  = require( "./exceptions.js" );

const { connectMongonDB }  = require( "./config/db.js" );
try {
  connectMongonDB();
} catch (err) {
  throw new ServerError(err);
}

// swagger requires
const swaggerUI  = require( "swagger-ui-express" );
const { swaggerDocs }  = require( "./swagger.js" );

// passing the Routers to middlewares
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/api/url", urlRouter);
app.use("/api/auth", authRouter);
app.use(getOriginalUrlRouter);
app.use(errorRouter);

// Start listening to server
const port = process.env.PORT || 5000;
if(process.env.NODE_ENV !== 'test'){
  app.listen(port, () => {
    console.log(`server is runing on port ${port}`);
  });
}

module.exports = { app };