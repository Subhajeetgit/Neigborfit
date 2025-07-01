const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const connectDB = require("./db");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("NeighborFit backend is running.");
});

// Public route - Get all neighborhoods
app.get("/api/neighborhoods", (req, res) => {
  const filePath = path.join(__dirname, "data", "neighborhoods.json");
  console.log("Trying to read file:", filePath);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading neighborhoods file:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    const neighborhoods = JSON.parse(data);
    res.json(neighborhoods);
  });
});

// Import and mount auth routes (signup, login)
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

// Import and mount match route
const matchRoutes = require("./routes/match");
app.use("/api/match", matchRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
