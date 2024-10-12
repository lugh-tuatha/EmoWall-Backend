const Emotion = require("../models/Emotion");
const { uploadImageToCloudinary } = require("../service/emotionsService");

// @desc   Get All Emotions
// @route  GET /api/v2/release/emotions
// @access Public
const fetchEmotions = async (req, res) => {
  try {
    const fetchEmotions = await Emotion.find()

    res.status(200).json({
      status: "retrieved successfully",
      results: fetchEmotions.length,
      emotions:  fetchEmotions,
    })
  } catch (error) {
    res.status(404).json({
      status: "failed to retrieve",
      message: error.message
    })
  }
};

// @desc   Get Emotions by Category
// @route  GET /api/v2/release/emotions/category/:category
// @access Public
const fetchEmotionByCategory = async (req, res) => {
  const category = req.params.category;
  console.log(category)
  try {
    const ds = await Emotion.find({ category: category })

    res.status(200).json({
      status: "retrieved successfully",
      results: ds.length,
      emotions:  ds,
    })
  } catch (error) {
    res.status(404).json({
      status: "failed to retrieve",
      message: error.message
    })
  }
};

// @desc   Get Emotions by id
// @route  GET /api/v2/release/emotions/:id
// @access Public
const fetchEmotionById = async (req, res) => {
  const id = req.params.id;

  try {
    const ds = await Emotion.findById(id);

    res.status(200).json({
      status: "retrieved successfully",
      results: ds.length,
      emotions:  ds,
    })
  } catch (error) {
    res.status(404).json({
      status: "failed to retrieve",
      message: error.message
    })
  }
};


// @desc   Add One Emotions
// @route  POST /api/v2/release/emotions
// @access Public
const createEmotions = async (req, res) => {
  try {
    const { image, title, summary, codename, category } = req.body;
    
    const uploadedImageUrl = await uploadImageToCloudinary(image)

    const postDoc = await Emotion.create({
      title,
      summary,
      codename,
      category,
      likes: 0,
      cover: uploadedImageUrl,
    });

    res.json(postDoc)
  } catch (error) {
    console.log(error)
  }
};

// @desc   Update One Emotions
// @route  PATCH /api/v2/release/emotions/:id
// @access Public
const editEmotion = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body; 

  try {
    const emotion = await Emotion.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    })

    res.status(200).json({
      status: "updated successfully",
      data: {
        emotion
      }
    })
  } catch (error) {
    console.log(error)
  }
}

// @desc   Delete One Emotions
// @route  DEL /api/v2/release/reflection/:id
// @access Public
const deleteEmotion = async (req, res) => {
  try {
    const emotion = await Emotion.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: "deleted successfully",
      data: null
    })
  } catch (error) {
    console.log(error)
  }
}


module.exports = {
  fetchEmotions,
  createEmotions,
  fetchEmotionByCategory,
  fetchEmotionById,
  editEmotion,
  deleteEmotion
};
