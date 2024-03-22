const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RateSchema = mongoose.Schema({
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
  value: {
    type: Number,
    required: true,
  },
});

const Rate = mongoose.model("Rate", RateSchema);

module.exports = Rate;
