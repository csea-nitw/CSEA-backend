const Quiz = require("../models/quiz");
const { validationResult } = require("express-validator");

exports.addNewQuiz = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const quiz = new Quiz(req.body);
  quiz.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save quiz in DB",
      });
    }
    res.json({
      quiz_name: quiz.quiz_name,
      quiz_id: quiz._id,
      quiz_start_date: quiz.quiz_start_date,
      quiz_end_date: quiz.quiz_end_date,
      total_questions: quiz.total_questions,
    });
  });
};

exports.getQuizById = (req, res, next, id) => {
  Quiz.findById(id).exec((err, quiz) => {
    if (err || !quiz) {
      console.log("err");
      return res.status(400).json({
        id: id,
        error: "Quiz don't exists in Db",
      });
    }
    req.quiz = quiz;
    next();
  });
};

exports.getAllAvailableQuizes = (req, res) => {
  const errors = validationResult(req);
  // console.log("hey");

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  Quiz.find({}, (err, quizes) => {
    if (err || !quizes) {
      return res.status(400).json({
        error: "No Quiz exists",
      });
    }
    return res.json(quizes);
  });
};

exports.getAllQuestions = (req, res) => {
  const quiz = req.quiz.questions;
  return res.status(200).json(quiz);
};

exports.getQuestions = (req, res) => {
  // console.log("hey");
  const quiz = req.quiz.questions;
  const sets = [
    [0, 2, 4, 6, 7, 8, 9, 11, 12, 13],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [0, 1, 2, 3, 4, 5, 10, 11, 12, 13],
  ];
  const selectedSet = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43];
  const myQuizQuestions = [];
  selectedSet.forEach((i) => {
    if (i < quiz.length) {
      const question = quiz[i];
      question.answer = undefined;
      question.qsCode = question._id;
      myQuizQuestions.push(question);
    }
  });
  return res.status(200).json({
    quiz_name: req.quiz.quiz_name,
    start_date: req.quiz.quiz_start_date,
    end_date: req.quiz.quiz_end_date,
    quiz_id: req.quiz._id,
    questions: myQuizQuestions,
  });
};

exports.addQuestionToQuiz = (req, res) => {
  Quiz.findOneAndUpdate(
    { _id: req.quiz._id },
    { $push: { questions: req.body } },
    { new: true, useFindAndModify: false },
    (err, quiz) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save question.. Try again after some time..",
        });
      }
    }
  );
  return res.status(200).json({
    msg: `successfully added to quiz ${req.quiz.quiz_name}`,
  });
};
