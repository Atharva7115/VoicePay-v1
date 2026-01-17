const express = require("express");
const router = express.Router();
const PendingTransaction = require("../models/PendingTransaction");
const normalizeText = require("../utils/normalizeText");
const detectIntent = require("../utils/intent");
const { getPrimaryBalance } = require("../services/balanceService");

const { findReceiverAccount } = require("../services/receiverService");


router.post("/detect", async (req, res) => {
  try {
    const { text, userId } = req.body;

    if (!text || !userId) {
      return res.status(400).json({
        error: "text and userId are required"
      });
    }

    // 1️⃣ Normalize
    const normalizedText = normalizeText(text);

    // 2️⃣ Detect intent
    const intentData = detectIntent(normalizedText);

    // 3️⃣ BALANCE CHECK
    if (intentData.intent === "BALANCE_CHECK") {
      const balance = await getPrimaryBalance(userId);

      return res.json({
        intent: "BALANCE_CHECK",
        message: `Your account balance is ₹${balance}`,
        balance
      });
    }

    // 4️⃣ MONEY TRANSFER (validation only)
    if (intentData.intent === "MONEY_TRANSFER") {
  if (!intentData.amount || !intentData.receiver) {
    return res.status(400).json({
      error: "Amount or receiver missing"
    });
  }

  const receiverAccount = await findReceiverAccount(intentData.receiver);

  if (!receiverAccount) {
    return res.status(404).json({
      error: "Receiver account not found"
    });
  }

  // Create pending transaction
  const pendingTxn = await PendingTransaction.create({
    senderId: userId,
    receiverId: receiverAccount.userId,
    amount: intentData.amount
  });

  return res.json({
    confirmationRequired: true,
    transactionId: pendingTxn._id,
    amount: intentData.amount,
    receiver: {
      upiId: receiverAccount.upiId,
      bank: receiverAccount.bankName
    },
    message: `Do you want to send ₹${intentData.amount} to ${receiverAccount.upiId}?`
  });
}

    // 5️⃣ FINAL FALLBACK
    return res.json({
      intent: intentData.intent,
      message: "Unable to understand your request"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Intent processing failed"
    });
  }
});

module.exports = router;
