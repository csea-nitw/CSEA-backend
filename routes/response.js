var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { saveResponses } = require("../controllers/response");

router.post("/response", [], saveResponses);

module.exports = router;
