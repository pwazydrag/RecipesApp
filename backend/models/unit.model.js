const mongoose = require("mongoose");

const UnitSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Unit = mongoose.model("Unit", UnitSchema);

module.exports = Unit;
