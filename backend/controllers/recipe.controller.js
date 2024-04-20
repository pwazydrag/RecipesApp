const { verifyToken } = require("../functions/authMiddleware");
const recipe = require("../models/recipe.model");
const comment = require("../models/comment.model");
const user = require("../models/user.model");
const category = require("../models/category.model");
const rate = require("../models/rate.model");
const ingredient = require("../models/ingredient.model");
const unit = require("../models/unit.model");
const favorite = require("../models/favorite.model");

const getRecipes = async (req, res) => {
  try {
    const recipes = await recipe.find({}).populate("rating", "value");
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
        const createdIngredient = await newIngredient.save();
        ingredientIds.push(createdIngredient._id);
      }

      await ingredient.updateMany(
        { _id: { $in: ingredientIds } },
        { recipe: createdRecipe._id }
      );

      await recipe.findByIdAndUpdate(createdRecipe._id, {
        ingredients: ingredientIds,
      });
      res.status(200).json(createdRecipe);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const { id } = req.params;
      const { data } = req.body;

      const userId = req.user;
      const { ingredients } = data;
      const categoryId = await category.findOne({ name: data.category });

      const dataToUpdate = {
        title: data.title,
        category: categoryId._id,
        preparationTime: data.preparationTime,
        preparation: data.preparation.map(({ step }) => step),
        img: data.img,
      };

      const recipeToUpdate = await recipe.findOneAndUpdate(
        { _id: id, author: userId },
        dataToUpdate,
        { new: true }
      );

      if (!recipeToUpdate) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      if (ingredients) {
        await ingredient.deleteMany({
          _id: { $in: recipeToUpdate.ingredients },
        });
      }

      const ingredientIds = [];
      for (const ingredientData of data.ingredients) {
        const unitId = await unit.findOne({ name: ingredientData.unit });
        const newIngredient = new ingredient({
          name: ingredientData.name,
          amount: ingredientData.amount,
          unit: unitId._id,
          recipe: recipeToUpdate._id,
        });
        const createdIngredient = await newIngredient.save();
        ingredientIds.push(createdIngredient._id);
      }

      await ingredient.updateMany(
        { _id: { $in: ingredientIds } },
        { recipe: recipeToUpdate._id }
      );

      await recipe.findByIdAndUpdate(recipeToUpdate._id, {
        ingredients: ingredientIds,
      });
      res.status(200).json(recipeToUpdate);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const { id } = req.params;
      const userId = req.user;

      const recipeToDelete = await recipe.findOne({
        _id: id,
        author: userId,
      });

      if (!recipeToDelete) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      await Promise.all([
        ingredient.deleteMany({ _id: { $in: recipeToDelete.ingredients } }),
        comment.deleteMany({ _id: { $in: recipeToDelete.comments } }),
        rate.deleteMany({ _id: { $in: recipeToDelete.rating } }),
        favorite.deleteMany({ _id: { $in: recipeToDelete.likes } }),
      ]);

      await recipe.deleteOne({ _id: id, author: userId });

      res
        .status(200)
        .json({ message: "Recipe and related data deleted successfully." });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchRecipes = async (req, res) => {
  try {
    const { data } = req.body;

    const searchIngredients = data.ingredients
      .map((ingredient) => ingredient.name)
      .filter((name) => name.trim().length > 0);

    const allFieldsEmpty =
      data.title === "" &&
      data.category === "" &&
      data.minTime === 0 &&
      data.maxTime === 0 &&
      searchIngredients.length === 0;

    const minTime = parseInt(data.minTime, 10);
    const maxTime = parseInt(data.maxTime, 10);

    if (allFieldsEmpty || minTime > maxTime) {
      return res.status(200).json([]);
    }

    let categoryId;
    if (data.category) {
      const categoryOne = await category.findOne({ name: data.category });
      if (categoryOne) {
        categoryId = categoryOne._id;
      }
    }
    const query = {};
    if (data.title !== "") {
      query.title = { $regex: data.title, $options: "i" };
    }

    if (minTime || maxTime) {
      query.preparationTime = {};
      if (minTime) query.preparationTime.$gte = minTime;
      if (maxTime) query.preparationTime.$lte = maxTime;
    }

    if (categoryId) {
      query.category = categoryId;
    }

    const recipes = await recipe
      .find(query)
      .populate("category")
      .populate("ingredients");

    const filteredRecipes = recipes.filter((recipe) =>
      searchIngredients.every((searchIngredient) =>
        recipe.ingredients.some((ingredient) =>
          new RegExp(searchIngredient, "i").test(ingredient.name)
        )
      )
    );

    res.status(200).json(filteredRecipes);
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
  searchRecipes,
};
