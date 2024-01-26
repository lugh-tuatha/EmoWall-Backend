const Emotion = require("../models/Emotion");
const {cloudinary} = require('../utils/cloudinary')

// @desc   Get All Emotions
// @route  GET /api/v2/release/reflection
// @access Public
const fetchEmotions = async (req, res) => {
  try {
    const fetchEmotions = await Emotion.find()

    res.status(200).json({
      status: 200,
      results: fetchEmotions.length,
      emotions:  fetchEmotions,
    })
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message
    })
  }
};

const fetchEmotionByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const ds = await Emotion.find({ category: category })

    res.status(200).json({
      status: 200,
      results: ds.length,
      emotions:  ds,
    })
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message
    })
  }
};

const fetchEmotionById = async (req, res) => {
  const id = req.params.id;

  try {
    const ds = await Emotion.findById(id);

    res.status(200).json({
      status: 200,
      results: ds.length,
      emotions:  ds,
    })
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message
    })
  }
};


// @desc   Add One Emotions
// @route  POST /api/v2/release/reflection
// @access Public
const createEmotions = async (req, res) => {
  try {
    const { image, title, summary, codename, category } = req.body;
    const uploadedImage = await cloudinary.uploader.upload(image, {
      upload_preset: 'masked_emotion',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg', 'ico', 'jfif'],
    },)

    const postDoc = await Emotion.create({
      title,
      summary,
      codename,
      category,
      likes: 0,
      cover: uploadedImage.url,
    });

    res.json(postDoc)
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
  fetchEmotions,
  createEmotions,
  fetchEmotionByCategory,
  fetchEmotionById
};
