const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    bankName: {
      type: String,
      required: true
    },

    accountNumber: {
      type: String,
      required: true
    },

    upiId: {
      type: String,
      required: true
    },

    balance: {
      type: Number,
      default: 10000
    },

    isPrimary: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", AccountSchema);
