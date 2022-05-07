const timespan = require("jsonwebtoken/lib/timespan");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const urlSchema = new Schema(
  {
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    userId: Schema.Types.ObjectId,
  },
  timespan
);

module.exports = mongoose.model("Url", urlSchema);
