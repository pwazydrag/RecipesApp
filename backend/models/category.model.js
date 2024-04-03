const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema, "categories");

module.exports = Category;
