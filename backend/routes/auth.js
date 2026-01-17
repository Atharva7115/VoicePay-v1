
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

/* ---------------- SET UPI PIN ---------------- */
router.post("/set-pin", async (req, res) => {
  try {
    const { userId, pin } = req.body;

    if (!userId || !pin) {
      return res.status(400).json({
        error: "userId and pin are required"
      });
    }

    if (pin.length !== 4) {
      return res.status(400).json({
        error: "PIN must be 4 digits"
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    const hashedPin = await bcrypt.hash(pin, 10);

    user.appPin = hashedPin;
    await user.save();

    res.json({
      success: true,
      message: "UPI PIN set successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to set PIN"
    });
  }
});

module.exports = router;
