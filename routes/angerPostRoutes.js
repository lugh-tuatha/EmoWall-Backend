const express = require("express");
const router = express.Router();
const { getAngerPost, uploadAngerPost } = require("../controllers/angerPostControllers");

router.post("/", uploadAngerPost);

router.get("/", getAngerPost)

module.exports = router;