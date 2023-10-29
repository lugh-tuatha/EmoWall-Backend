const express = require("express");
const router = express.Router();
const { getPost, uploadPost } = require("../controllers/uploadControllers");

const multer = require("multer");
const uploadMiddleware = multer({ dest: "upload/" });

router.post("/", uploadMiddleware.single("file"), uploadPost)

router.get("/", getPost);

module.exports = router;