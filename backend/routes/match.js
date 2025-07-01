const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

// JWT middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
}

// Match route
router.post("/", authenticateToken, (req, res) => {
  const userPreferences = req.body;
  const filePath = path.join(__dirname, "..", "data", "neighborhoods.json");

  try {
    const neighborhoods = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const scoredNeighborhoods = neighborhoods
      .map((n) => {
        let score = 0;
        let totalWeight = 0;
        for (const key in userPreferences) {
          const weight = userPreferences[key];
          score += (n[key] || 0) * weight;
          totalWeight += weight;
        }
        const normalizedScore = totalWeight > 0 ? score / totalWeight : 0;
        return { ...n, matchScore: normalizedScore.toFixed(2) };
      })
      .sort((a, b) => b.matchScore - a.matchScore);

    res.json(scoredNeighborhoods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
