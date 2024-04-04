const jwt = require("jsonwebtoken");
const { verifyToken } = require("../functions/authMiddleware");
const recipe = require("../models/recipe.model");
const comment = require("../models/comment.model");
const user = require("../models/user.model");
const category = require("../models/category.model");
const rate = require("../models/rate.model");
const ingredient = require("../models/ingredient.model");
const unit = require("../models/unit.model");

const getRecipes = async (req, res) => {
  try {
    const recipes = await recipe.find({});
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeOne = await recipe
      .findById(id)
      .populate({
        path: "comments",
        populate: { path: "author", select: "username" },
      })
      .populate("author", "username")
      .populate("category")
      .populate("rating", "user value")
      .populate({
        path: "ingredients",
        populate: { path: "unit" },
      });

    res.status(200).json(recipeOne);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createRecipe = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const { data } = req.body;
      const userId = req.user;
      const categoryId = await category.findOne({ name: data.category });

      const recipeData = {
        title: data.title,
        category: categoryId._id,
        preparationTime: data.preparationTime,
        preparation: data.preparation.map(({ step }) => step),
        rating: [],
        comments: [],
        author: userId,
        likes: [],
        date: new Date(),
        img: data.img,
      };

      let createdRecipe;
      try {
        createdRecipe = await recipe.create(recipeData);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }

      const ingredientIds = [];
      for (const ingredientData of data.ingredients) {
        const unitId = await unit.findOne({ name: ingredientData.unit });
        const newIngredient = new ingredient({
          name: ingredientData.name,
          amount: ingredientData.amount,
          unit: unitId._id,
          recipe: createdRecipe._id,
        });
        try {
          const createdIngredient = await newIngredient.save();
          ingredientIds.push(createdIngredient._id);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      }

      await ingredient.updateMany(
        { _id: { $in: ingredientIds } },
        { recipe: createdRecipe._id }
      );

      try {
        await recipe.findByIdAndUpdate(createdRecipe._id, {
          ingredients: ingredientIds,
        });
        res.status(200).json(createdRecipe);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const recipeOne = await recipe.findByIdAndUpdate(id, req.body);

    if (!recipeOne) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const updatedRecipe = await recipe.findById(id);
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const recipeOne = await recipe.findByIdAndDelete(id);

    if (!recipeOne) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
