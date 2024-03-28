const user = require("../models/user.model");
const bcrypt = require("bcrypt");

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
    const checkUsername = await user.findOne({ username: userData.username });
    const checkEmail = await user.findOne({ email: userData.email });
    if (checkUsername || checkEmail) {
      res.status(403).json("exist");
    } else {
      res.status(200).json("notexist");
      await user.insertMany([userData]);
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
      res.status(200).json("exist");
      //generujemy token i przechowujemy go
    } else {
      res.status(401).json("notexist");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
