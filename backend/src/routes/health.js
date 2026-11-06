const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const DB_STATES = ["disconnected", "connected", "connecting", "disconnecting"];

// GET /api/health
router.get("/", (req, res) => {
  const dbState = DB_STATES[mongoose.connection.readyState] || "unknown";
  const dbOk = dbState === "connected";

  res.status(dbOk ? 200 : 503).json({
    status: dbOk ? "ok" : "degraded",
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    database: dbState,
  });
});

module.exports = router;
