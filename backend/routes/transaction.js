const express = require("express");
const bcrypt = require("bcryptjs");

const PendingTransaction = require("../models/PendingTransaction");
const User = require("../models/User");
const Account = require("../models/Account");

const router = express.Router();

/* =====================================================
   1️⃣ CONFIRM TRANSACTION (YES / NO)
   ===================================================== */
router.post("/confirm", async (req, res) => {
  try {
    const { transactionId, confirm } = req.body;

    if (!transactionId || confirm === undefined) {
      return res.status(400).json({
        error: "transactionId and confirm are required"
      });
    }

    const txn = await PendingTransaction.findById(transactionId);

    if (!txn || txn.status !== "PENDING") {
      return res.status(400).json({
        error: "Invalid or expired transaction"
      });
    }

    if (!confirm) {
      txn.status = "CANCELLED";
      await txn.save();

      return res.json({
        success: true,
        message: "Transaction cancelled"
      });
    }

    txn.status = "CONFIRMED";
    await txn.save();

    return res.json({
      success: true,
      message: "Transaction confirmed. Proceed to PIN verification",
      transactionId: txn._id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Confirmation failed"
    });
  }
});

/* =====================================================
   2️⃣ SET UPI PIN (ONE-TIME / OPTIONAL)
   ===================================================== */
router.post("/set-pin", async (req, res) => {
  try {
    const { userId, pin } = req.body;

    if (!userId || !pin) {
      return res.status(400).json({
        error: "userId and pin are required"
      });
    }

    if (String(pin).length !== 4) {
      return res.status(400).json({
        error: "PIN must be 4 digits"
      });
    }

    const hashedPin = await bcrypt.hash(String(pin), 10);

    await User.findByIdAndUpdate(userId, {
      appPin: hashedPin
    });

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

/* =====================================================
   3️⃣ EXECUTE TRANSACTION (FINAL MONEY MOVEMENT)
   ===================================================== */
router.post("/execute", async (req, res) => {
  try {
    const { transactionId, pin } = req.body;

    if (!transactionId || !pin) {
      return res.status(400).json({
        error: "transactionId and pin are required"
      });
    }

    const txn = await PendingTransaction.findById(transactionId);

    if (!txn || txn.status !== "CONFIRMED") {
      return res.status(400).json({
        error: "Transaction not confirmed"
      });
    }

    const sender = await User.findById(txn.senderId);

    // 🔐 IMPORTANT: PIN existence + type check
    if (!sender || !sender.appPin || typeof sender.appPin !== "string") {
      return res.status(400).json({
        error: "UPI PIN not set for this user"
      });
    }

    const senderAccount = await Account.findOne({
      userId: sender._id,
      isPrimary: true
    });

    const receiverAccount = await Account.findOne({
      userId: txn.receiverId,
      isPrimary: true
    });

    if (!senderAccount || !receiverAccount) {
      return res.status(404).json({
        error: "Account not found"
      });
    }

    const pinMatch = await bcrypt.compare(String(pin), sender.appPin);

    if (!pinMatch) {
      return res.status(401).json({
        error: "Invalid PIN"
      });
    }

    if (senderAccount.balance < txn.amount) {
      return res.status(400).json({
        error: "Insufficient balance"
      });
    }

    // 💰 FINAL MONEY MOVEMENT
    senderAccount.balance -= txn.amount;
    receiverAccount.balance += txn.amount;

    await senderAccount.save();
    await receiverAccount.save();

    txn.status = "COMPLETED";
    await txn.save();

    res.json({
      success: true,
      message: `₹${txn.amount} transferred successfully`,
      balance: senderAccount.balance
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Transaction execution failed"
    });
  }
});

module.exports = router;

