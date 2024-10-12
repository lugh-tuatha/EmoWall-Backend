const {cloudinary} = require('../utils/cloudinary')

const uploadImageToCloudinary = async (image) => {
  console.log("image" + image)
  if(image != ""){
    const uploadedImage = await cloudinary.uploader.upload(image, {
      upload_preset: 'masked_emotion',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg', 'ico', 'jfif'],
    },)

    return uploadedImage.url
  }else{
    return ""
  }
}

module.exports = {
  uploadImageToCloudinary,
};
