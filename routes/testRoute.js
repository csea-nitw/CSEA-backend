const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  const date = new Date().getDate();
  res.status(200).json({
    date,
    msg: [
      "super",
      "caring",
      "honest",
      "smart",
      "cute",
      "hardworking",
      "great",
      "adept",
      "brave",
      "capable",
    ],
  });
});

module.exports = router;
