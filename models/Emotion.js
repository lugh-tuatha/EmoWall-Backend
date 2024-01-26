const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const EmotionSchema = new Schema(
  {
    codename: String,
    title: String,
    summary: String,
    category: String,
    likes: Number,
    cover: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "emotions",
  }
);

const Emotion = model('Emotions', EmotionSchema);

module.exports = Emotion;