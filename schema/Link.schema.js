const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  image: String, // Base64 String
  email: String, // Store user's email
});

module.exports = mongoose.model("Link", LinkSchema);
