const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true ,unique:false},
  lastname: { type: String, required: true ,unique:false},
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String, default: "" },   // New field for username
  category: { type: String, default: "" },   // New field for selected category
});

module.exports = mongoose.model("User", userSchema);
