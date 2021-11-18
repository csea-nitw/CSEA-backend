var mongoose = require("mongoose");

var quizSchema = new mongoose.Schema(
  {
    quiz_name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    quiz_start_date: {
      type: Date,
      required: true,
    },
    quiz_end_date: {
      type: Date,
      required: true,
    },
    total_questions: {
      type: Number,
      required: true,
    },
    number_of_attempts: {
      type: Number,
      default: 1,
    },
    check_correctness_instantly: {
      type: Boolean,
      default: false,
    },
    is_sequential: {
      type: Boolean,
      default: false,
    },
    result_on_submission: {
      type: Boolean,
      default: false,
    },
    questions: [
      {
        qsType: {
          type: String,
          required: true,
        },
        qsTimeLimit: {
          type: Number,
        },
        qsMandatory: {
          type: Boolean,
          default: true,
        },
        qsText: {
          type: String,
          maxlength: 256,
          required: true,
        },
        qsHint: {
          type: String,
          maxlength: 256,
          default: "No hints for this question",
        },
        qsImageUrl: {
          type: String,
          maxlength: 1024,
        },
        answer: {
          type: Number,
          required: true,
          default: 0,
        },
        options: [
          {
            optionText: {
              type: String,
              maxlength: 128,
            },
            optionUrl: {
              type: String,
              maxlength: 1024,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
