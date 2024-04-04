const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const verifyToken = async (req, res, next) => {
  // Check if JWT token exists in the request header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. Missing JWT token." });
  }

  // Extract the JWT token
  const token = authHeader.split(" ")[1];

  try {
    // Decode the JWT token to get the user ID
    const decodedToken = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const userId = decodedToken._id;

    const user = await User.findById(userId).exec();
    if (!user) {
      return res
        .status(401)
        .json({ message: "Access denied. Invalid JWT token." });
    }

    // If user exists, pass control to the next middleware or request handler
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Access denied. Invalid JWT token." });
  }
};

module.exports = {
  verifyToken,
};
