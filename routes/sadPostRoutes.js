const express = require("express");
const router = express.Router();
const { getSadPost, uploadSadPost } = require("../controllers/sadPostController");

const multer = require("multer");
const uploadMiddleware = multer({ dest: "upload/" });

router.post("/", uploadMiddleware.single("file"), uploadSadPost);

router.get("/", getSadPost);

module.exports = router;