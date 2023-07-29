const fs = require('fs')
const AngerPostModel = require("../models/AngerPost");

const uploadAngerPost = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title2, summary2, codename2, cover2 } = req.body;
  const postDoc = await AngerPostModel.create({
    title2,
    summary2,
    codename2,
    cover2: newPath,
  });

  res.json(postDoc);
};

const getAngerPost = async (req, res) => {
  res.json(await AngerPostModel.find());
};

module.exports = {
  getAngerPost,
  uploadAngerPost,
};
