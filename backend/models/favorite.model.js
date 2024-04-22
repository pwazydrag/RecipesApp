const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoriteSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: "Recipe",
    required: true,
  },
});

const Favorite = mongoose.model("Favorite", FavoriteSchema);

module.exports = Favorite;
