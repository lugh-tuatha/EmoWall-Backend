const express = require("express");
const router = express.Router();
const { fetchEmotions, createEmotions, fetchEmotionByCategory, fetchEmotionById, editEmotion, deleteEmotion } = require("../controllers/emotionsController");

router.get("/", fetchEmotions);

router.get("/category/:category", fetchEmotionByCategory);

router.get("/:id", fetchEmotionById);

router.post("/", createEmotions);

router.patch("/:id", editEmotion);

router.delete("/:id", deleteEmotion);

module.exports = router;