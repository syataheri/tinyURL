import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await mongoose.connect(process.env.MONGO_TEST_URL ,{useNewUrlParser: true,
        useUnifiedTopology: true});
    } else {
      await mongoose.connect(process.env.MONGO_PRODUCTION_URL);
    }
    console.log("mongoDB connected...");
  } catch (error) {
    throw error;
  }
};

export {connectDB};
