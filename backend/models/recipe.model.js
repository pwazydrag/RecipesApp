const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  preparationTime: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ingredient",
      required: true,
    },
  ],
  preparation: {
    type: [String],
    required: true,
  },
  rating: [
    {
      type: Schema.Types.ObjectId,
      ref: "Rate",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
  img: {
    type: String,
    required: true,
  },
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
