const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const adminOnly = require("../middlewares/roleMiddleware");

router.get("/dashboard", protect, adminOnly, (req, res) => {
  res.json({
    message: "✅ Admin dashboard access granted",
    admin: req.user,
  });
});

module.exports = router;
