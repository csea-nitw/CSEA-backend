const Responses = require("../models/response");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const Quiz = require("../models/quiz")

exports.saveResponses = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const responses = new Responses(req.body);
  const user = User.findById(responses.participant).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        id: id,
        error: "User Invalid",
      });
    }
    responses.name = user.name;
    responses.email = user.email;
  });
  const quiz = Quiz.findById(responses.quiz).exec((err, quiz) => {
    if (err || !quiz) {
      return res.status(400).json({
        id: id,
        error: "Quiz Invalid",
      });
    }
    // console.log(quiz)
    responses.quiz_name = quiz.quiz_name;
  });
  responses.save((err, response) => {
    if (err) {
      return res.status(400).json({
        err: err,
      });
    }
    res.json({
      participant: response.name,
      quiz: response.quiz_name,
      score: response.score,
      email: response.email,
    });
  });
};
