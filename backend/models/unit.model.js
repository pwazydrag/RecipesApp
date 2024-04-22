const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnitSchema = Schema({
  name: {
    type: String,
    required: true,
  },
});

const Unit = mongoose.model("Unit", UnitSchema);

module.exports = Unit;
