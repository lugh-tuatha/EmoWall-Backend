const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const sadPostSchema = new Schema(
  {
    title1: String,
    summary1: String,
    codename1: String,
    cover1: String,
  },
  {
    timestamps: true,
  }
);

const SadPostModel = mongoose.model("SadPost", sadPostSchema);

module.exports = SadPostModel;
