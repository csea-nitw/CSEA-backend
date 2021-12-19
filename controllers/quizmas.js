const { validationResult } = require("express-validator");
const Quizmas = require("../models/quizmas");
const QuizmasResponses = require("../models/quizmasResponses");
const User = require("../models/user");
const { questions } = require("./constants/quizmas21");

exports.addQuestion = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const question = new Quizmas(req.body);
  question.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: err,
      });
    } else {
      return res.status(200).json({ question });
    }
  });
};

exports.getQuestion = (req, res) => {
  const today = new Date();
  let day = today.getDate();
  let hours = today.getHours();
  if (hours < 20) {
    day = day - 1;
  }
  const startDate = 16;
  day = day - startDate;
  const todays_question = {};
  questions.forEach((qs) => {
    if (qs.day == day) {
      return res.status(200).json(qs);
    }
  });

  return res.status(400).json({
    err: "something went wrong",
  });
};

exports.saveResponse = (req, res) => {
  //find question
  const today = new Date();
  let day = req.body.day;
  let todays_question = {};
  questions.forEach((qs) => {
    if (qs.day == day) {
      todays_question = qs;
    }
  });

  //find user
  const userId = req.body.userId;
  const user = User.findById(userId).exec((err, thisUser) => {
    if (err || !thisUser) {
      return res.status(400).json({
        id: userId,
        error: "User Invalid",
      });
    } else {
      thisUser.salt = undefined;
      const response = {};
      response.participant = userId;
      response.participant_name = thisUser.name;
      response.participant_email = thisUser.email;
      response.day = day;
      response.answer = req.body.answer;
      const quizmasResponses = new QuizmasResponses(response);
      quizmasResponses.save((err, resp) => {
        if (err) {
          return res.status(422).json({
            error: err,
          });
        } else {
          //   console.log(todays_question);
          if (
            resp.answer.trim().toLowerCase() ==
            todays_question.answer.trim().toLowerCase()
          ) {
            Quizmas.find({ day }, (err, quizzes) => {
              if (err) {
                return res.status(422).json({
                  err: "Quiz not found.. try again or contact csea",
                });
              } else {
                let thisQuiz = {};
                quizzes.forEach((quiz) => {
                  if (quiz.day === day) {
                    thisQuiz = quiz;
                  }
                });
                const winnersList = thisQuiz.winners;
                let already_resp = false;
                winnersList.forEach((winner) => {
                  if (winner._id == userId) {
                    already_resp = true;
                    return res.status(201).json({
                      message: "Already responded correctly..",
                    });
                  }
                });
                if (!already_resp) {
                  Quizmas.findOneAndUpdate(
                    { day },
                    { $push: { winners: thisUser } },
                    { new: true, useFindAndModify: false },
                    (err, quiz) => {
                      if (err) {
                        res.status(400).json({
                          error:
                            "Unable to save response.. Try again after some time..",
                        });
                      }
                    }
                  );
                  return res.status(200).json({
                    message: "Yayy!! You got it right!! ",
                    expectedRankToday: winnersList.length + 1,
                  });
                }
              }
            });
          } else {
            const messages = [
              "Just there.. Try again..",
              "You’re on the right track, but not there yet.",
              "Interesting . . . it’s not exactly what we are looking for, but try again.",
            ];
            return res.status(202).json({
              message: messages[Math.floor(Math.random() * 3)],
            });
          }
        }
      });
    }
  });
};

exports.getAllResponses = (req, res) => {
  Quizmas.find({}, (err, resps) => {
    if (err || !resps) {
      res.status(422).json({
        err: "No responses yet",
      });
    }
    res.status(200).json({
      resps,
    });
  });
};
