const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      default: "User"
    },

    bank: {
      type: String,
      required: true
    },

    // MFCC voice embedding (20 numbers)
    voiceprint: {
      type: [Number],
      default: []
    },

    // App-level PIN (NOT UPI PIN)
    appPin: {
      type: String,
      default: null
    },

    isVoiceEnrolled: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
