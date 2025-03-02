const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt=require("bcrypt")
const User=require('../schema/user.schema');
const LinkData = require("../schema/LinkData.schema"); // ✅ Add missing model
const Link = require("../schema/Link.schema"); // ✅ Add missing model
const Url=require("../schema/Url.schema")
const Tell = require("../schema/tell.schema");
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();

// Validation Schema
const registerSchema = Joi.object({
  firstname: Joi.string().min(3).max(25).required(),
  lastname: Joi.string().min(3).max(25).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(30).required(),
  ConfirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

// Registration Route
router.post("/register", async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { firstname,lastname, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstname,lastname, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/tell", async (req, res) => {
  const { email, username, category } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email }, // Find user by email
      { username, category }, // Update these fields
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Profile updated", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// Login route
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(400).json({ message: "Wrong username or password" });
//     }
//     const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
//     res.status(200).json({ token });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
router.post("/login", async (req, res) => {
  const { emailOrUsername, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Wrong username or password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, process.env.JWT_SECRET);
    res.status(200).json({ token, username: user.username, email: user.email });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get("/details", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      username: user.username,
      category: user.category
    });
  } catch (err) {
    console.error("Error verifying token or fetching user:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.put("/update", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { firstname, lastname, email, password } = req.body;

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if email is already in use
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Save old email before updating
    const oldEmail = user.email;

    // Update only allowed fields
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;

    // If password is provided, hash it before updating
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    // ✅ Update email in other collections
    if (email && email !== oldEmail) {
      const updatedUser = await User.updateMany({ email: oldEmail }, { $set: { email } });
      const updatedLinkData = await LinkData.updateMany({ email: oldEmail }, { $set: { email } });
      const updatedLink = await Link.updateMany({ email: oldEmail }, { $set: { email } });
      const updatedUrl=await Url.updateMany({email:oldEmail},{ $set: { email } });

      console.log(`User updated: ${updatedUser.modifiedCount}`);
      console.log(`LinkData updated: ${updatedLinkData.modifiedCount}`);
      console.log(`Link updated: ${updatedLink.modifiedCount}`);
      console.log(`Url updated: ${updatedUrl.modifiedCount}`);

    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    console.error("Error updating user:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});




module.exports = router;
