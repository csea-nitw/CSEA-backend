var mongoose = require("mongoose");
const { ObjectId } = require("mongoose");


var quizmasResponseSchema = new mongoose.Schema(
  {
    participant: {
      type: ObjectId,
      ref: "User",
    },
    participant_name: {
      type: String,
      trim: true,
    },
    participant_email: {
      type: String,
      trim: true,
    },
    day: {
      type: Number,
      required: true,
    },
    answer: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizmasResponse", quizmasResponseSchema);
