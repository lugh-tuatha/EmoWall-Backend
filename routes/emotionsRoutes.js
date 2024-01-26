const express = require("express");
const router = express.Router();
const { fetchEmotions, createEmotions, fetchEmotionByCategory, fetchEmotionById } = require("../controllers/emotionsController");

router.get("/", fetchEmotions);

router.get("/category/:category", fetchEmotionByCategory);

router.get("/id/:id", fetchEmotionById);

router.post("/", createEmotions)

module.exports = router;