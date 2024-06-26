const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = require("../models/user.model");
const recipe = require("../models/recipe.model");
const favorite = require("../models/favorite.model");

const registerUser = async (req, res) => {
  const { data } = req.body;

  const hash = await bcrypt.hash(data.password, 10);

  const userData = {
    username: data.username,
    email: data.email,
    password: hash,
    registration: new Date(),
  };

  try {
    const checkUser = await user.findOne({ username: userData.username });
    const checkEmail = await user.findOne({ email: userData.email });
    if (checkUser || checkEmail) {
      res.status(403).json("exist");
    } else {
      await user.insertMany([userData]);
      const newUser = await user.findOne({ username: userData.username });
      const token = newUser.generateAuthToken();
      res.status(200).json(token);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { data } = req.body;

  try {
    const checkUser = await user.findOne({
      username: data.username,
    });

    const result = await bcrypt.compare(data.password, checkUser.password);

    if (result) {
      const token = checkUser.generateAuthToken();
      res.status(200).json(token);
    } else {
      res.status(401).json("notexist");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.query;

    let decodedToken;
    if (token !== "") {
      decodedToken = jwt.verify(token, process.env.JWTPRIVATEKEY);
    }
    const userId = id || decodedToken?._id;

    const userOne = await user.findOne(
      {
        _id: userId,
      },
      { _id: 1, username: 1, email: 1, registration: 1 }
    );

    if (!userOne) {
      return res.status(404).json({ message: "User not found" });
    }

    const recipes = await recipe
      .find({ author: userId })
      .select("rating title img")
      .populate("rating", "value");

    if (userId === decodedToken?._id) {
      res
        .status(200)
        .json({ user: userOne, check: true, userRecipes: recipes });
    } else {
      res
        .status(200)
        .json({ user: userOne, check: false, userRecipes: recipes });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserFavorites = async (req, res) => {
  try {
    const { token } = req.query;
    const decodedToken = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const userId = decodedToken._id;

    const favorites = await favorite.find({ user: userId }).select("recipe");
    const favoriteRecipeIds = favorites.map((fav) => fav.recipe);

    const favoriteRecipes = await recipe
      .find({
        _id: { $in: favoriteRecipeIds },
      })
      .select("rating title img")
      .populate("rating", "value");

    res.status(200).json(favoriteRecipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getUserFavorites,
};
