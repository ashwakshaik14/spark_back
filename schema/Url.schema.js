// const mongoose = require("mongoose");

// const UrlSchema = new mongoose.Schema({
//   email: { type: String, required: true }, // Store user's email
//   clicks: { type: Number, default: 0 }, // Total clicks count
//   getConnectedCount: { type: Number, default: 0 }, // ✅ New field for "Get Connected" clicks
//   redirectionLogs: [
//     {
//       timestamp: { type: Date, default: Date.now },
//       userAgent: String,
//       device: String,
//       app: String, // Store app name
//     },
//   ],
//   appClicks: { type: Map, of: Number, default: {} }, // { amazon: 5, instagram: 3 }
//   deviceClicks: { type: Map, of: Number, default: {} }, // { Android: 10, Windows: 2 }
//   typeClicks: { type: Map, of: Number, default: {} }, // { link: 12, shop: 8 }
// });

// const Url = mongoose.model("Url", UrlSchema);

// module.exports = Url;







// const mongoose = require("mongoose");

// const UrlSchema = new mongoose.Schema({
//   email: { type: String, required: true }, // Store user's email
//   clicks: { type: Number, default: 0 }, // Total clicks count
//   getConnectedCount: { type: Number, default: 0 }, // ✅ New field for "Get Connected" clicks
//   redirectionLogs: [
//     {
//       timestamp: { type: Date, default: Date.now },
//       userAgent: String,
//       device: String,
//       app: String, // Store app name
//       url: String, // ✅ Store the exact URL clicked
//     },
//   ],
//   appClicks: { type: Map, of: Number, default: {} }, // { amazon: 5, instagram: 3 }
//   deviceClicks: { type: Map, of: Number, default: {} }, // { Android: 10, Windows: 2 }
//   typeClicks: { 
//     type: Map, 
//     of: Map, // ✅ Change typeClicks to track each URL separately
//     default: {} 
//   }, // { link: { "https://example.com": 5, "https://google.com": 3 } }
// });

// const Url = mongoose.model("Url", UrlSchema);

// module.exports = Url;


















const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  email: { type: String, required: true }, // Store user's email
  clicks: { type: Number, default: 0 }, // Total clicks count
  getConnectedCount: { type: Number, default: 0 }, // ✅ New field for "Get Connected" clicks
  redirectionLogs: [
    {
      timestamp: { type: Date, default: Date.now },
      userAgent: String,
      device: String,
      app: String, // Store app name
      url: String, // ✅ Store the exact URL clicked
    },
  ],
  appClicks: { type: Map, of: Number, default: {} }, // { amazon: 5, instagram: 3 }
  deviceClicks: { type: Map, of: Number, default: {} }, // { Android: 10, Windows: 2 }
  typeClicks: { type: Map, of: Number, default: {} }, // { link: 12, shop: 8 }

  // ✅ Store URL and its count directly
  urlCount: { type: Map, of: Number, default: {} }, // { "https://example.com": 5, "https://google.com": 3 }
});

const Url = mongoose.model("Url", UrlSchema);

module.exports = Url;
