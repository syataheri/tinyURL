const mongoose = require("mongoose");
const logger = require("../winston");
const { SERVER_ERROR } = require("../exceptions");

exports.connectDB = async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await mongoose.connect(process.env.MONGO_TEST_URL);
    } else {
      await mongoose.connect(process.env.MONGO_PRODUCTION_URL);
    }
    console.log("mongoDB connected...");
  } catch (error) {
    const err = await new SERVER_ERROR();
    err.data = error.message;
    logger.error(`This happend because server failed to connect on ${new Date()} with statusCode : ${error.statusCode} and message : ${error.message}`);
    return err;
  }
};
