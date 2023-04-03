const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AngerPostSchema = new Schema(
  {
    title2: String,
    summary2: String,
    codename2: String,
    cover2: String,
  },
  {
    timestamps: true,
  }
);

const AngerPostModel = mongoose.model("AngerPost", AngerPostSchema);

module.exports = AngerPostModel;
