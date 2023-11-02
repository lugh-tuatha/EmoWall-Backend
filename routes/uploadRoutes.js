const express = require("express");
const router = express.Router();
const { getPost, uploadPost } = require("../controllers/uploadControllers");

router.post("/", uploadPost)

router.get("/", getPost);

module.exports = router;