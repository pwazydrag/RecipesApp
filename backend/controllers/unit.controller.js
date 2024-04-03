const unit = require("../models/unit.model");

const getUnits = async (req, res) => {
  try {
    const units = await unit.find({});
    res.status(200).json(units);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUnits,
};
