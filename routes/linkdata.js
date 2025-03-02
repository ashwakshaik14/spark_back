const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const LinkData = require("../schema/LinkData.schema"); // Match exact filename


router.post("/save-data", async (req, res) => {
  try {
    const { email, ...updateFields } = req.body; // Extract email and the rest of the fields

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const updatedData = await LinkData.findOneAndUpdate(
      { email }, // Find by email
      { $set: updateFields }, // Update only the provided fields
      { upsert: true, new: true } // Create new if not found, return updated doc
    );

    res.json({ success: true, message: "Data saved successfully!", data: updatedData });
  } catch (error) {
    console.error("❌ Error saving data:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});




router.get("/user/:email", async (req, res) => {
    try {
      const { email } = req.params;
      const userData = await LinkData.findOne({ email });
  
      if (!userData) {
        return res.status(404).json({ message: "No data found for this user" });
      }
  
      res.json(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // router.delete("/delete-card/:email/:cardId", async (req, res) => {
  //   try {
  //     const { email, cardId } = req.params;
  
  //     const updatedData = await LinkData.findOneAndUpdate(
  //       { email },
  //       { $pull: { cards: { _id: cardId } } }, // Pull card by its ID
  //       { new: true }
  //     );
  
  //     if (!updatedData) {
  //       return res.status(404).json({ success: false, message: "User or card not found" });
  //     }
  
  //     res.json({ success: true, message: "Card deleted successfully!", data: updatedData });
  //   } catch (error) {
  //     console.error("❌ Error deleting card:", error.message);
  //     res.status(500).json({ success: false, message: "Server error" });
  //   }
  // });


router.delete("/delete-card/:email/:cardId", async (req, res) => {
  try {
    const { email, cardId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      return res.status(400).json({ success: false, message: "Invalid card ID" });
    }

    const updatedData = await LinkData.findOneAndUpdate(
      { email },
      { $pull: { cards: { _id: new mongoose.Types.ObjectId(cardId) } } }, // Convert _id to ObjectId
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ success: false, message: "User or card not found" });
    }

    res.json({ success: true, message: "Card deleted successfully!", data: updatedData });
  } catch (error) {
    console.error("❌ Error deleting card:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

  
  
  


module.exports = router;
