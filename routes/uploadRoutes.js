const express = require("express");
const router = express.Router();
const { getPost, uploadPost } = require("../controllers/uploadControllers");

const multer = require("multer");
const uploadMiddleware = multer({ dest: "upload/" });
const Post1 = require("../models/Post");

router.post("/post", uploadMiddleware.single("file"), uploadPost)

router.get("/", getPost);

module.exports = router;
