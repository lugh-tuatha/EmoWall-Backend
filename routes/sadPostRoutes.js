const express = require("express");
const router = express.Router();
const { getSadPost, uploadSadPost, getSadPostId } = require("../controllers/sadPostController");

router.post("/", uploadSadPost);

router.get("/", getSadPost);

router.get("/:id", getSadPostId);

module.exports = router;