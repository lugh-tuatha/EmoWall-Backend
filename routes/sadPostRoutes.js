const express = require("express");
const router = express.Router();
const { getSadPost, uploadSadPost, getSadPostId } = require("../controllers/sadPostController");

const multer = require("multer");
const uploadMiddleware = multer({ dest: "upload/" });

router.post("/", uploadMiddleware.single("file"), uploadSadPost);

router.get("/", getSadPost);

router.get("/:id", getSadPostId);

module.exports = router;