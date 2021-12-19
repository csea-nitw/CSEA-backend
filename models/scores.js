var mongoose = require("mongoose");

var scoreSchema = new mongoose.Schema(
  {
    quiz_name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    participant: {
      type: String,
    },
    score: {
      type: Number,
    },
    responses: {
      type: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Score", scoreSchema);
