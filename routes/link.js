const express = require("express");
const multer = require("multer");
const Link = require("../schema/Link.schema");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Configure Multer for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
      const imgBase64 = req.file.buffer.toString("base64");
      const { email } = req.body; // Get email from request body
  
      if (!email) {
        return res.status(400).json({ error: "User email is required" });
      }
  
      const newLink = new Link({ image: imgBase64, email }); // Save image + email
      await newLink.save();
  
      res.json({ imageUrl: `data:image/png;base64,${imgBase64}`, email });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: "Error uploading image" });
    }
  });
  
// Fetch All Uploaded Images
// Fetch image by email
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const link = await Link.findOne({ email });

    if (!link) {
      return res.status(404).json({ error: "No image found for this email" });
    }

    res.json({ image: link.image });
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ error: "Error fetching image" });
  }
});

// DELETE image by email
router.delete("/:email", async (req, res) => {
  try {
    const { email } = req.params;

    console.log("Received request to delete image for email:", email); // Debugging log

    // Check if an image exists for the email
    const link = await Link.findOne({ email });

    if (!link) {
      console.error("No image found for email:", email); // Debugging log
      return res.status(404).json({ error: "No image found for this email" });
    }

    // Delete the image entry from the database
    await Link.deleteOne({ email });

    res.json({ message: "Image deleted successfully from database" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Error deleting image" });
  }
});

module.exports = router;
