const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("../models/comment.model");

const RecipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    //type: Schema.Types.ObjectId,
    //ref: users,
  },
  category: {
    type: String,
    required: true,
    //type: Schema.Types.ObjectId,
    //ref: categories, mongoose dodaje s do nazwy modelu category->categorys jak bedzie tu jakis blad to dlatego
  },
  preparationTime: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: [String], //jeżeli składniki będą w innej kolekcji to zmienić tu typ trzeba
    required: true,
  },
  preparation: {
    type: [String],
    required: true,
  },
  rating: {
    type: [Number],
    required: true,
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: "Comment",
  },
  //zdjecie
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
