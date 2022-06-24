import mongoose from "mongoose";

const Schema = mongoose.Schema;

const urlSchema = new Schema(
  {
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    userId: Schema.Types.ObjectId,
  }
);

const Url = mongoose.model("Url", urlSchema);

export {Url};
