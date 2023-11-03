const fs = require("fs");
const SadPostModel = require("../models/SadPost");
const {cloudinary} = require('../utils/cloudinary')

const uploadSadPost = async (req, res) => {
  try {
    const { image, title, summary, codename } = req.body;
    const uploadedImage = await cloudinary.uploader.upload(image, {
      upload_preset: 'masked_emotion',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg', 'ico', 'jfif'],
    },)

    const postDoc = await SadPostModel.create({
      title1: title,
      summary1: summary,
      codename1: codename,
      cover1: uploadedImage.url,
    });

    res.json(postDoc)
  } catch (error) {
    console.log(error)
  }
};

const getSadPost = async (req, res) => {
  res.json(await SadPostModel.find());
};

const getSadPostId = (req, res) => {
  console.log(req.params);

  // ? udemy 54

  res.status(200).json({
    status: "success",
  });
};

module.exports = {
  getSadPost,
  uploadSadPost,
  getSadPostId,
};
