const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  const date = new Date();
  res.status(200).json({
    date,
    msg: "hey successfully tested",
  });
});

module.exports = router;
