var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { saveResponses, getMyScore } = require("../controllers/response");

router.post("/response", [], saveResponses);

router.post("/score", [], getMyScore);

module.exports = router;
