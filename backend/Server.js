const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const recipeRoute = require("./routes/recipe.route");
const userRoute = require("./routes/user.route");
const categoryRoute = require("./routes/category.route");
const unitRoute = require("./routes/unit.route");
const commentRoute = require("./routes/comment.route");
const rateRoute = require("./routes/rate.route");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/recipes", recipeRoute);
app.use("/api/users", userRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/units", unitRoute);
app.use("/api/comments", commentRoute);
app.use("/api/rates", rateRoute);

// Main Route
app.get("/", (req, res) => {
  res.send("Hello from Node API Server");
});

// Connecting to the database and starting the server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Connection failed:", err);
  });
