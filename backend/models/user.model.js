const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  reqigstration: {
    type: Date,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;