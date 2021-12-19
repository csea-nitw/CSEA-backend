var mongoose = require("mongoose");

var quizmasSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      trim: true,
      required: true,
    },
    question: {
      type: String,
      trim: true,
      required: true,
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },
    answer: {
      type: String,
      trim: true,
      required: true,
    },
    winners: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quizmas", quizmasSchema);
