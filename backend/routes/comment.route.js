const express = require("express");
const Comment = require("../models/comment.model");
const router = express.Router();
const {
  addComment,
  getComments,
} = require("../controllers/comment.controller");

router.post("/", addComment);
router.get("/:id", getComments);

module.exports = router;
