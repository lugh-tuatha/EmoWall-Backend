const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const Post = require("./models/Post");
const Post1 = require("./models/Post");
require("dotenv").config();

const multer = require("multer");
const uploadMiddleware = multer({ dest: "upload/" });
const fs = require("fs");

app.use("/upload", express.static(__dirname + "/upload"));

const SadPostModel = require("./models/SadPost");
const AngerPostModel = require("./models/AngerPost");

const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

app.listen(5000, () => {
  console.log("Server Started");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, summary, codename, cover } = req.body;
  const postDoc = await Post1.create({
    title,
    summary,
    codename,
    cover: newPath,
  });

  res.json(postDoc);
});

app.get("/post", async (req, res) => {
  res.json(await Post.find());
});

// Sad
app.post("/sadpost", uploadMiddleware.single("file"), async (req, res) => {
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
});

app.get("/sadpost", async (req, res) => {
  res.json(await SadPostModel.find());
});

// Anger
app.post("/angerpost", uploadMiddleware.single("file"), async (req, res) => {
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
});

app.get("/angerpost", async (req, res) => {
  res.json(await AngerPostModel.find());
});
