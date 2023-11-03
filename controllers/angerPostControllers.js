const fs = require('fs')
const AngerPostModel = require("../models/AngerPost");
const {cloudinary} = require('../utils/cloudinary')


const uploadAngerPost = async (req, res) => {
  try {
    const { image, title, summary, codename } = req.body;
    const uploadedImage = await cloudinary.uploader.upload(image, {
      upload_preset: 'masked_emotion',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg', 'ico', 'jfif'],
    },)

    const postDoc = await AngerPostModel.create({
      title2: title,
      summary2: summary,
      codename2: codename,
      cover2: uploadedImage.url,
    });

    res.json(postDoc)
  } catch (error) {
    console.log(error)
  }
};

const getAngerPost = async (req, res) => {
  res.json(await AngerPostModel.find());
};

module.exports = {
  getAngerPost,
  uploadAngerPost,
};
