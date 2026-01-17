const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

/**
 *  SPEECH → TEXT
 * Accepts audio and returns transcribed text
 */
router.post("/", upload.single("audio"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Audio file is required" });
  }

  const audioPath = req.file.path;

  exec(`python voice/whisperTranscribe.py ${audioPath}`, (err, stdout) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Whisper transcription failed" });
    }

    const text = stdout.trim();

    res.json({
      success: true,
      text
    });
  });
});

module.exports = router;
