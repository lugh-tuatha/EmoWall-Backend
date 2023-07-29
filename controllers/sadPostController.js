const fs = require("fs");
const SadPostModel = require("../models/SadPost");

const uploadSadPost = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title1, summary1, codename1, cover1 } = req.body;
  const postDoc = await SadPostModel.create({
    title1,
    summary1,
    codename1,
    cover1: newPath,
  });

  res.json(postDoc);
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
