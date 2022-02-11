const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  const date = new Date().getDate();
  res.status(200).json({
    date,
    msg: [
      "SuperHonest",
      "courageous",
      "perfect",
      "fearless",
      "missEinstein",
      "SelfConfident",
      "Awesome",
      "Rashi",
      "unique",
      "incredible",
      "Independent",
      "Intelligent",
      "Thoughtful",
      "Smart",
      "Clever",
      "Cute",
      "energetic",
      "friendly",
      "bright",
      "creative",
      "determined",
      "generous",
      "hardworking",
      "helping",
      "likable",
      "Kind",
      "patient",
      "polite",
      "sincere",
    ],
  });
});

module.exports = router;
