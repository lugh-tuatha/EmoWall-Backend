const express = require("express");
const router = express.Router();
const { getAngerPost, uploadAngerPost } = require("../controllers/angerPostControllers");

const multer = require("multer");
const uploadMiddleware = multer({ dest: "upload/" });

router.post("/", uploadMiddleware.single("file"), uploadAngerPost);

router.get("/", getAngerPost)

module.exports = router;