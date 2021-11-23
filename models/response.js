const { ObjectId } = require("mongoose");
var mongoose = require("mongoose");

var quizSchema = new mongoose.Schema(
  {
    participant: {
      type: ObjectId,
      ref: "User",
    },
    quiz: {
      type: ObjectId,
      ref: "Quiz",
    },
    score: {
      type: Number,
      default: 0,
    },
    responses: [
      {
        option: {
          type: Number,
        },
        question: {
          type: String,
        },
        correctAnswer: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
