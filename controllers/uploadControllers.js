const PostModel = require("../models/Post");

const uploadPost = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, summary, codename, cover } = req.body;
  const postDoc = await PostModel.create({
    title,
    summary,
    codename,
    cover: newPath,
  });

  res.json(postDoc);
};


const getPost = async (req, res) => {
  res.json(await PostModel.find());
};

module.exports = {
  getPost,
  uploadPost,
};