var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { isSignedIn } = require("../controllers/auth");
const {
  addNewQuiz,
  getAllAvailableQuizes,
  getQuizById,
  addQuestionToQuiz,
  getQuestions,
  getAllQuestions,
} = require("../controllers/quiz");

router.post(
  "/quiz",
  [check("quiz_name", "name should be at least 3 char").isLength({ min: 3 })],
  addNewQuiz
);

router.param("quizId", getQuizById);

router.get("/quiz", getAllAvailableQuizes);

router.post("/questions/:quizId", addQuestionToQuiz);
router.get("/questions/:quizId", getAllQuestions);
router.get("/attempt/:quizId", getQuestions);

module.exports = router;
