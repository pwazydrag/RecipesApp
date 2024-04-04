const express = require("express");
const Comment = require("../models/comment.model");
const router = express.Router();
const { addComment } = require("../controllers/comment.controller");

router.post("/add", addComment);

module.exports = router;
