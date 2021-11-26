const Responses = require("../models/response");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const Quiz = require("../models/quiz");

exports.saveResponses = (req, res) => {
  const errors = validationResult(req);
  // console.log(req.body);
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
  let score = 0;
  // console.log(responses.quiz);
  const quiz = Quiz.findById(responses.quiz).exec((err, quiz) => {
    if (err || !quiz) {
      return res.status(400).json({
        id: responses.quiz,
        error: "Quiz Invalid",
      });
    }
    // console.log(quiz)
    else {
      responses.quiz_name = quiz.quiz_name;
      const newResp = [];
      responses.responses.forEach((item) => {
        quiz.questions.forEach((item2) => {
          if (item.question == item2._id) {
            item.correctAnswer = item2.answer;
            newResp.push(item);
            if (item.correctAnswer == item.option) {
              score++;
            }
          }
        });
      });
      responses.responses = newResp;
      responses.score = score;
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
    }
  });
};

exports.getMyScore = (req, res) => {
  const errors = validationResult(req);
  const { participant } = req.body;
  const newResp = [];
  let score = 0;
  Responses.findOne({ participant }, (err, responses) => {
    if (err || !responses) {
      return res.status(400).json({
        error: "Attempt quiz first",
      });
    }
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
    // console.log(responses.responses);
    const quiz = Quiz.findById(responses.quiz).exec((err, quiz) => {
      if (err || !quiz) {
        return res.status(400).json({
          id: id,
          error: "Quiz Invalid",
        });
      }
      // console.log(quiz.questions);
      const map1 = new Map();
      quiz.questions.forEach((item2) => {
        map1.set(item2._id.toString(), item2.answer);
      });
      // console.log(map1);
      responses.responses.forEach((item) => {
        const ans = map1.get(item.question);
        item.correctAnswer = ans;
        newResp.push(item);
        if (item.correctAnswer == item.option) {
          score++;
        }
      });
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
        score: score,
        email: response.email,
        responses: newResp,
      });
    });
  });
};
