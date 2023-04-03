const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const Post = require("./models/Post");
const Post1 = require("./models/Post");

const multer = require("multer");
const uploadMiddleware = multer({ dest: "upload/" });
const fs = require("fs");

app.use("/upload", express.static(__dirname + "/upload"));

const SadPostModel = require("./models/SadPost");
const AngerPostModel = require("./models/AngerPost");

const jwt = require("jsonwebtoken");

const JWT_SECRET = "asdasdasdasfdfge4dadsfiloasdveujai()123asad3d";

const mongoUrl =
  "mongodb+srv://acegabriel:acegabriel@cluster-1.vk8798k.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./userDetails");
const Userinfo = mongoose.model("Userinfo");

const User = mongoose.model("Userinfo");
const LovePosts = mongoose.model("Post");

app.post("/register", async (req, res) => {
  const { fname, lname, phone, password, userType } = req.body;

  try {
    const oldUser = await Userinfo.findOne({ phone });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    await Userinfo.create({
      fname,
      lname,
      phone,
      password: encryptedPassword,
      userType,
    });

    res.status(200).json({ status: "ok", message: "User created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});


app.post("/login-user", async (req, res) => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ phone: user.phone }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "invalid password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const userphone = user.phone;
    User.findOne({ phone: userphone })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.listen(5000, () => {
  console.log("Server Started");
});

app.get("/getAllUser", async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

app.post("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  try {
    const result = await User.deleteOne({ _id: userid });
    if (result.deletedCount === 1) {
      res.send({ status: "Ok", data: "Deleted" });
    } else {
      res.status(404).send({ status: "Error", data: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error", data: "Failed to delete user" });
  }
});

// get posts
app.get("/getAllPosts", async (req, res) => {
  try {
    const allPosts = await LovePosts.find({});
    res.send({ status: "ok", data: allPosts });
  } catch (error) {
    console.log(error);
  }
});


app.post("/deletePosts", async (req, res) => {
  const { postsid } = req.body;

  try {
    const result = await Post1.deleteOne({ _id: postsid })
    if (result.deletedCount === 1){
      res.send({ status: "Ok", data: "Deleted" });
    } else {
      res.status(404).send({ status: "Error", data: "Post not found" })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error", data: "Failed to delete post" });
  }
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
