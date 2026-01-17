const mongoose = require("mongoose");

const pendingTransactionSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
  type: String,
  enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"],
  default: "PENDING"
}

}, { timestamps: true });

module.exports = mongoose.model("PendingTransaction", pendingTransactionSchema);
