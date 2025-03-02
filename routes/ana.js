const express = require("express");
const router = express.Router();
const Url = require("../schema/Url.schema"); // Import your schema

// router.post("/ana", async (req, res) => {
//   try {
//     const { email, app, type } = req.body;

//     // Get User-Agent from request headers

//     // Detect Device
//     const detectOS = (userAgent) => {
//         if (/windows/i.test(userAgent)) return "Windows";
//         if (/macintosh|mac os x/i.test(userAgent)) return "Mac";
//         if (/linux/i.test(userAgent)) return "Linux";
//         if (/android/i.test(userAgent)) return "Android";
//         if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS";
//         return "Other"; // For unknown OS
//       };
      
//       // Example usage inside your API
//       const userAgent = req.headers["user-agent"];
//       const device = detectOS(userAgent);
      
//     // Find existing user entry or create new
//     let urlEntry = await Url.findOne({ email });

//     if (!urlEntry) {
//       urlEntry = new Url({ email });
//     }

//     // Update total clicks
//     urlEntry.clicks += 1;

//     // Update redirection logs
//     urlEntry.redirectionLogs.push({ userAgent, device, app });

//     // Update App Clicks
//     urlEntry.appClicks.set(app, (urlEntry.appClicks.get(app) || 0) + 1);

//     // Update Device Clicks
//     urlEntry.deviceClicks.set(device, (urlEntry.deviceClicks.get(device) || 0) + 1);

//     // Update Type Clicks (link/shop)
//     urlEntry.typeClicks.set(type, (urlEntry.typeClicks.get(type) || 0) + 1);

//     // Save the data
//     await urlEntry.save();

//     res.status(200).json({ message: "Click recorded successfully" });
//   } catch (error) {
//     console.error("Error saving click:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });




// router.post("/ana", async (req, res) => {
//   try {
//     const { email, app, type, url } = req.body;

//     if (!email || !app || !type || !url) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Detect Device from User-Agent
//     const detectOS = (userAgent) => {
//       if (/windows/i.test(userAgent)) return "Windows";
//       if (/macintosh|mac os x/i.test(userAgent)) return "Mac";
//       if (/linux/i.test(userAgent)) return "Linux";
//       if (/android/i.test(userAgent)) return "Android";
//       if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS";
//       return "Other"; // For unknown OS
//     };

//     const userAgent = req.headers["user-agent"] || "Unknown";
//     const device = detectOS(userAgent);

//     // Find existing user entry or create new
//     let urlEntry = await Url.findOne({ email });

//     if (!urlEntry) {
//       urlEntry = new Url({ email });
//     }

//     // Ensure Maps are initialized
//     if (!urlEntry.appClicks) urlEntry.appClicks = new Map();
//     if (!urlEntry.deviceClicks) urlEntry.deviceClicks = new Map();
//     if (!urlEntry.typeClicks) urlEntry.typeClicks = new Map();

//     // Ensure typeClicks[type] exists and is a Map
//     if (!urlEntry.typeClicks.has(type)) {
//       urlEntry.typeClicks.set(type, new Map());
//     }

//     // Get the specific typeClicks map (e.g., link clicks)
//     const typeClicksMap = urlEntry.typeClicks.get(type);

//     // Update click count for the specific URL under the type
//     const safeUrl = url.replace(/\./g, "_"); // Replace all dots with underscores
//     typeClicksMap.set(safeUrl, (typeClicksMap.get(safeUrl) || 0) + 1);
//     urlEntry.typeClicks.set(type, typeClicksMap);
    

//     // Update total clicks
//     urlEntry.clicks = (urlEntry.clicks || 0) + 1;

//     // Update redirection logs
//     urlEntry.redirectionLogs.push({ userAgent, device, app, url });

//     // Update App Clicks
//     urlEntry.appClicks.set(app, (urlEntry.appClicks.get(app) || 0) + 1);

//     // Update Device Clicks
//     urlEntry.deviceClicks.set(device, (urlEntry.deviceClicks.get(device) || 0) + 1);

//     // Save the data
//     await urlEntry.save();

//     res.status(200).json({ message: "Click recorded successfully", data: urlEntry });
//   } catch (error) {
//     console.error("Error saving click:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// router.post("/ana", async (req, res) => {now
//   try {
//     const { email, app, type, url } = req.body;

//     console.log("Incoming request data:", req.body);

//     if (!email || !app || !type || !url) {
//       console.error("Missing required fields", { email, app, type, url });
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const userAgent = req.headers["user-agent"];
//     const detectOS = (userAgent) => {
//       if (/windows/i.test(userAgent)) return "Windows";
//       if (/macintosh|mac os x/i.test(userAgent)) return "Mac";
//       if (/linux/i.test(userAgent)) return "Linux";
//       if (/android/i.test(userAgent)) return "Android";
//       if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS";
//       return "Other";
//     };
//     const device = detectOS(userAgent);

//     console.log("Detected device:", device);

//     let urlEntry = await Url.findOne({ email });
//     if (!urlEntry) {
//       console.log("No existing entry found, creating new entry for:", email);
//       urlEntry = new Url({ email });
//     }

//     urlEntry.clicks += 1;
//     urlEntry.redirectionLogs.push({ userAgent, device, app, url });

//     // ✅ Update App Clicks
//     urlEntry.appClicks.set(app, (urlEntry.appClicks.get(app) || 0) + 1);

//     // ✅ Update Device Clicks
//     urlEntry.deviceClicks.set(device, (urlEntry.deviceClicks.get(device) || 0) + 1);

//     // ✅ Update Type Clicks
//     urlEntry.typeClicks.set(type, (urlEntry.typeClicks.get(type) || 0) + 1);

//     // ✅ Fix: Store URLs as object properties instead of Map keys
//     const currentCount = urlEntry.urlCount.get(url) || 0;
//     urlEntry.urlCount.set(url, currentCount + 1);
    

//     await urlEntry.save();
//     console.log("Click recorded successfully for:", email);
//     res.status(200).json({ message: "Click recorded successfully" });
//   } catch (error) {
//     console.error("❌ Error saving click:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });
router.post("/ana", async (req, res) => {
  try {
    const { email, app, type, url } = req.body;

    console.log("Incoming request data:", req.body);

    if (!email || !app || !type || !url) {
      console.error("Missing required fields", { email, app, type, url });
      return res.status(400).json({ message: "Missing required fields" });
    }

    const userAgent = req.headers["user-agent"];
    const detectOS = (userAgent) => {
      if (/windows/i.test(userAgent)) return "Windows";
      if (/macintosh|mac os x/i.test(userAgent)) return "Mac";
      if (/linux/i.test(userAgent)) return "Linux";
      if (/android/i.test(userAgent)) return "Android";
      if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS";
      return "Other";
    };
    const device = detectOS(userAgent);

    console.log("Detected device:", device);

    let urlEntry = await Url.findOne({ email });
    if (!urlEntry) {
      console.log("No existing entry found, creating new entry for:", email);
      urlEntry = new Url({ email });
    }

    urlEntry.clicks += 1;

    // ✅ Get Indian Standard Time (IST)
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST = UTC + 5:30
    const istTime = new Date(now.getTime() + istOffset).toISOString(); // Convert to ISO format

    // ✅ Store Timestamps in Redirection Logs
    urlEntry.redirectionLogs.push({
      userAgent,
      device,
      app,
      url,
      timestamp: istTime, // ✅ Indian Timestamp
    });

    // ✅ Update App Clicks
    urlEntry.appClicks.set(app, (urlEntry.appClicks.get(app) || 0) + 1);

    // ✅ Update Device Clicks
    urlEntry.deviceClicks.set(device, (urlEntry.deviceClicks.get(device) || 0) + 1);

    // ✅ Update Type Clicks
    urlEntry.typeClicks.set(type, (urlEntry.typeClicks.get(type) || 0) + 1);

    // ✅ Fix: Store URLs as object properties instead of Map keys
    const currentCount = urlEntry.urlCount.get(url) || 0;
    urlEntry.urlCount.set(url, currentCount + 1);

    await urlEntry.save();
    console.log("Click recorded successfully for:", email);
    res.status(200).json({ message: "Click recorded successfully" });

  } catch (error) {
    console.error("❌ Error saving click:", error);
    res.status(500).json({ message: "Server error" });
  }
});





router.post("/get-connected", async (req, res) => {
  try {
    const { email } = req.body; // Get user email from request

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find existing user entry or create new
    let urlEntry = await Url.findOne({ email });

    if (!urlEntry) {
      urlEntry = new Url({ email });
    }

    // ✅ Increment "Get Connected" count
    urlEntry.getConnectedCount += 1;

    // Save to database
    await urlEntry.save();

    res.status(200).json({ message: "Get Connected click recorded successfully" });
  } catch (error) {
    console.error("Error saving Get Connected click:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/analytics/:email", async (req, res) => {
  try {
    const { email } = req.params; // Get email from request parameters

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const userAnalytics = await Url.findOne({ email });

    if (!userAnalytics) {
      return res.status(404).json({ message: "No data found for this email" });
    }

    res.status(200).json(userAnalytics);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// router.get("/clicks-over-time/:email", async (req, res) => {
//   try {
//     const { email } = req.params;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const clicksByMonth = await Url.aggregate([
//       { $match: { email } }, // ✅ Filter by email
//       { $unwind: "$redirectionLogs" },
//       {
//         $group: {
//           _id: { $dateToString: { format: "%d-%m", date: "$redirectionLogs.timestamp" } },
//           count: { $sum: 1 },
//         },
//       },
//       { $sort: { "_id": 1 } },
//     ]);

//     res.status(200).json(clicksByMonth);
//   } catch (error) {
//     console.error("Error fetching clicks:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.get("/clicks-over-time/:email", async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const clicksByMonth = await Url.aggregate([
      { $match: { email } }, // ✅ Filter by email
      { $unwind: "$redirectionLogs" },
      {
        $group: {
          _id: { $dateToString: { format: "%d-%m", date: "$redirectionLogs.timestamp" } },
          count: { $sum: 1 }, // ✅ Count redirection logs
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    // ✅ Fetch getConnectedCount separately
    const userData = await Url.findOne({ email }, { getConnectedCount: 1 });

    const totalClicksByMonth = clicksByMonth.map((item) => ({
      month: item._id,
      totalClicks: item.count + (userData?.getConnectedCount || 0), // ✅ Add getConnectedCount to count
    }));

    res.status(200).json(totalClicksByMonth);
  } catch (error) {
    console.error("Error fetching clicks:", error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;