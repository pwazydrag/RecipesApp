const { verifyToken } = require("../functions/authMiddleware");
const comment = require("../models/comment.model");
const recipe = require("../models/recipe.model");

const getComments = async (req, res) => {
  try {
    const comments = await comment.find({}).populate("author", "username");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const { data } = req.body;
      const userId = req.user;
      const commentData = {
        comment: data.comment,
        likes: 0,
        commentDate: new Date(),
        author: userId,
      };

      const recipeOne = await recipe.findById(data.recipeId);
      if (!recipeOne) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      const createdComment = await comment.create(commentData);
      recipeOne.comments.push(createdComment._id);
      await recipeOne.save();

      res.status(200).json(createdComment);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addComment,
  getComments,
};
