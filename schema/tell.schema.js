const mongoose = require("mongoose");

const tellSchema = new mongoose.Schema({
  category: {
    type: String,
    default: ""
  },
  username: {
    type: String,
    default: ""
  },
});

module.exports = mongoose.model("Tell", tellSchema);
