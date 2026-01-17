const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const User = require("../models/User");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

/**
 * 🔐 ENROLL VOICE
 * Saves voice fingerprint to user profile
 */
router.post("/enroll/:userId", upload.single("audio"), async (req, res) => {
    console.log("FILE:", req.file);
  const audioPath = req.file.path;

  exec(`python voice/mfccEmbedding.py ${audioPath}`, async (err, stdout) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Voice embedding failed" });
    }

    const embedding = stdout.trim().split(",").map(Number);

    await User.findByIdAndUpdate(req.params.userId, {
      voiceprint: embedding,
      isVoiceEnrolled: true
    });

    res.json({
      success: true,
      message: "Voice enrolled successfully"
    });
  });
});

/**
 * 🔓 VERIFY VOICE
 * Compares new voice sample with stored fingerprint
 */
router.post("/verify/:userId", upload.single("audio"), async (req, res) => {
  const audioPath = req.file.path;
  const user = await User.findById(req.params.userId);

  if (!user || !user.voiceprint.length) {
    return res.status(400).json({ error: "Voice not enrolled" });
  }

  exec(`python voice/mfccEmbedding.py ${audioPath}`, (err, stdout) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Voice verification failed" });
    }

    const newEmbedding = stdout.trim().split(",").map(Number);
    const storedEmbedding = user.voiceprint;

    // 🔢 Cosine similarity
    let dot = 0, mag1 = 0, mag2 = 0;

    for (let i = 0; i < newEmbedding.length; i++) {
      dot += newEmbedding[i] * storedEmbedding[i];
      mag1 += newEmbedding[i] ** 2;
      mag2 += storedEmbedding[i] ** 2;
    }

    const similarity = dot / (Math.sqrt(mag1) * Math.sqrt(mag2));

    res.json({
      success: true,
      similarity,
      verified: similarity > 0.75
    });
  });
});

module.exports = router;
