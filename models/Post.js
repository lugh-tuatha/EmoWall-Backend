const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const PostSchema = new Schema(
  {
    codename: String,
    title: String,
    summary: String,
    category: String,
    cover: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "posts",
  }
);

const PostModel = model('Post', PostSchema);

module.exports = PostModel;