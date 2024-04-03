const category = require("../models/category.model");

const getCategories = async (req, res) => {
  try {
    const categories = await category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategories,
};
