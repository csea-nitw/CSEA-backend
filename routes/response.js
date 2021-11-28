var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const {
  saveResponses,
  getMyScore,
  setResponseId,
} = require("../controllers/response");

router.param("userX", setResponseId);

router.post("/response", [], saveResponses);

router.get("/score/:userX", [], getMyScore);

module.exports = router;
