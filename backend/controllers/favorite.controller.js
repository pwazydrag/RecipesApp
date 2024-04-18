const jwt = require("jsonwebtoken");
const { verifyToken } = require("../functions/authMiddleware");
const favorite = require("../models/favorite.model");
const recipe = require("../models/recipe.model");

const changeFavorite = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const { data } = req.body;
      const userId = req.user;

      const recipeOne = await recipe.findById(data.recipeId);
      if (!recipeOne) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      const favoriteData = {
        user: userId,
        recipe: data.recipeId,
      };

      let existingFavorite = await favorite.findOne(favoriteData);
      if (existingFavorite) {
        await favorite.findByIdAndDelete(existingFavorite._id);
        recipeOne.likes.pull(existingFavorite._id);
        await recipeOne.save();
        return res.status(200).json({ message: "Removed succesfully" });
      } else {
        const createdFavorite = await favorite.create(favoriteData);
        recipeOne.likes.push(createdFavorite._id);
        await recipeOne.save();
        return res.status(200).json(createdFavorite);
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.query;

    const decodedToken = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const userId = decodedToken._id;

    const favoriteOne = await favorite.findOne({
      user: userId,
      recipe: id,
    });

    if (favoriteOne) {
      return res.status(200).json("exist");
    } else {
      return res.status(204).send();
    }
  } catch {
    return res.status(500).json();
  }
};

module.exports = {
  changeFavorite,
  getFavorite,
};
