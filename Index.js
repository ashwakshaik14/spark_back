const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const linkRoute = require("./routes/link");
const anaRoute = require("./routes/ana"); // Import the ana route
const linkDataRoutes = require("./routes/linkdata");




dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Check if MONGO_URI is set in environment variables
if (!process.env.MONGO_URI) {
  console.error("MongoDB URI is missing in the environment variables.");
  process.exit(1); // Exit the app if MongoDB URI is not found
}

// CORS Setup (Allow specific origins)
const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware for parsing JSON and URL-encoded bodies
app.use(express.json());
app.set('trust proxy', true);
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the app if MongoDB connection fails
  });

// Routes
app.use("/api/user", userRoute);
app.use("/api/link", linkRoute);
app.use("/api/linkdata", linkDataRoutes);
app.use("/api", anaRoute); // Use the ana route


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
