// const mongoose = require("mongoose");

// const LinkDataSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   title: { type: String },
//   bio: { type: String },
//   bgColor: { type: String, default: "#2d221b" },
//   fontFamily: { type: String, default: "Arial" },
//   fontColor: { type: String, default: "#000000" },
//   layout: { type: String, default: "stack" },
//   bgColor2: { type: String, default: "#ffffff" },
//   bgColor3: { type: String, default: "#D9D9D9" },
//   cards: [
//     {
//       selectedApp: { type: String, required: true },
//       link: { type: String, required: true },
//       type: { type: String, enum: ["link", "shop"], required: true },
//       title: { type: String ,unique:true},
//     },
//   ],
// });

// const LinkData = mongoose.model("LinkData", LinkDataSchema);
// module.exports = LinkData;










const mongoose = require("mongoose");

const LinkDataSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  title: { type: String },
  bio: { type: String },
  bgColor: { type: String, default: "#2d221b" },
  fontFamily: { type: String, default: "Arial" },
  fontColor: { type: String, default: "#000000" },
  layout: { type: String, default: "stack" },
  bgColor2: { type: String, default: "#ffffff" },
  bgColor3: { type: String, default: "#D9D9D9" },
  selectedButtonStyle: { type: String, default: "" }, // Added field
  buttonColor: { type: String, default: "#ffffff" }, // Added field
  buttonFontColor: { type: String, default: "#888888" }, // Added field
  cards: [
    {
      selectedApp: { type: String, required: true },
      link: { type: String, required: true },
      type: { type: String, enum: ["link", "shop"], required: true },
      title: { type: String, unique: true },
    },
  ],
});

const LinkData = mongoose.model("LinkData", LinkDataSchema);
module.exports = LinkData;
