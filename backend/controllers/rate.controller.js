const jwt = require("jsonwebtoken");
const { verifyToken } = require("../functions/authMiddleware");
const rate = require("../models/rate.model");
const recipe = require("../models/recipe.model");

const addRate = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const { data } = req.body;
      const userId = req.user;

      const recipeOne = await recipe.findById(data.recipeId);
      if (!recipeOne) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      const rateData = {
        user: userId,
        recipe: data.recipeId,
        value: data.value,
      };

      let existingRate = await rate.findOne({
        user: userId,
        recipe: data.recipeId,
      });
      if (existingRate) {
        existingRate.value = data.value;
        await existingRate.save();
        return res.status(200).json(existingRate);
      } else {
        const createdRate = await rate.create(rateData);
        recipeOne.rating.push(createdRate._id);
        await recipeOne.save();
        return res.status(200).json(createdRate);
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRate = async (req, res) => {
  try {
    const { user, id } = req.params;

    const decodedToken = jwt.verify(user, process.env.JWTPRIVATEKEY);
    const userId = decodedToken._id;

    const rateOne = await rate.findOne({
      user: userId,
      recipe: id,
    });

    if (rateOne) {
      return res.status(200).json(rateOne);
    } else {
      return res.status(204).send();
    }
  } catch {
    return res.status(500).json();
  }
};

module.exports = {
  addRate,
  getRate,
};
