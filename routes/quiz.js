var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { isSignedIn } = require("../controllers/auth");
const { addNewQuiz, getAllAvailableQuizes } = require("../controllers/quiz");

router.post(
  "/quiz",
  [check("quiz_name", "name should be at least 3 char").isLength({ min: 3 })],
  isSignedIn,
  addNewQuiz
);

router.get("/quiz", getAllAvailableQuizes);

module.exports = router;
