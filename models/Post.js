const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const PostSchema = new Schema(
  {
    codename: String,
    title: String,
    summary: String,
    cover: String,
  },
  {
    timestamps: true,
    collection: "posts",
  }
);

const PostModel = model('Post', PostSchema);

module.exports = PostModel;