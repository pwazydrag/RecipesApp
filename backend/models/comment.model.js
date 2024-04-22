const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = Schema({
  comment: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  commentDate: {
    type: Date,
    required: true,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
