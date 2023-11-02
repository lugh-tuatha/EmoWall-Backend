const fs = require("fs");
const PostModel = require("../models/Post");
const {cloudinary} = require('../utils/cloudinary')

const uploadPost = async (req, res) => {
  try {
    const { image, title, summary, codename } = req.body;
    const uploadedImage = await cloudinary.uploader.upload(image, {
      upload_preset: 'masked_emotion',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg', 'ico', 'jfif'],
    },)

    const postDoc = await PostModel.create({
      title,
      summary,
      codename,
      cover: uploadedImage.url,
    });

    res.json(postDoc)
  } catch (error) {
    console.log(error)
  }
};

const getPost = async (req, res) => {
  res.json(await PostModel.find());
};

module.exports = {
  getPost,
  uploadPost,
};
