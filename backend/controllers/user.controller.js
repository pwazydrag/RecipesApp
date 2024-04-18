const jwt = require("jsonwebtoken");
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

    const decodedToken = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const userId = id || decodedToken._id;

    const userOne = await user.findOne(
      {
        _id: userId,
      },
      { _id: 1, username: 1, email: 1, registration: 1 }
    );

    if (!userOne) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userId === decodedToken._id) {
      res.status(200).json({ user: userOne, check: true });
    } else {
      res.status(200).json({ user: userOne, check: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
