var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
// const { isSignedIn } = require("../controllers/auth");

const {
  addQuestion,
  getQuestion,
  saveResponse,
  getAllResponses,
} = require("../controllers/quizmas");

router.post(
  "/addQuestion",
  [
    check("day", "Day should be a number").isNumeric(),
    check("question", "question is required").isLength({ min: 1 }),
    check("answer", "answer field is required").isLength({ min: 1 }),
  ],
  addQuestion
);

router.post(
  "/check",
  [
    check("userId", "Day should be a number").isLength({ min: 1 }),
    check("answer", "answer field is required").isLength({ min: 1 }),
  ],
  saveResponse
);

router.get("/fetch", getQuestion);

router.get("/results", getAllResponses);

module.exports = router;
