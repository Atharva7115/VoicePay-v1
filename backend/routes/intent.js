const express = require("express");
const router = express.Router();

console.log("✅ intent route file loaded");
const PendingTransaction = require("../models/PendingTransaction");
const Account = require("../models/Account");

const normalizeText = require("../utils/normalizeText");
const detectIntent = require("../utils/intent");
const { getPrimaryBalance } = require("../services/balanceService");

/* =====================================================
   INTENT DETECTION ROUTE
   ===================================================== */
router.post("/detect", async (req, res) => {
  try {
    const { text, userId } = req.body;

    if (!text || !userId) {
      return res.status(400).json({
        error: "text and userId are required"
      });
    }

    // 1️⃣ Normalize text (Hindi + English safe)
    const normalizedText = normalizeText(text);

    // 2️⃣ Detect intent
    const intentData = detectIntent(normalizedText);

    /* ---------------- BALANCE CHECK ---------------- */
    if (intentData.intent === "BALANCE_CHECK") {
      const balance = await getPrimaryBalance(userId);

      return res.json({
        intent: "BALANCE_CHECK",
        message: `आपका बैलेंस ₹${balance} है`,
        balance
      });
    }

    /* ---------------- MONEY TRANSFER ---------------- */
    if (intentData.intent === "MONEY_TRANSFER") {
      if (!intentData.amount || !intentData.receiver) {
        return res.status(400).json({
          error: "Amount or receiver missing"
        });
      }

      // 🔒 TEMP DEMO RECEIVER MAP (Hindi + English)
      const receiverMap = {
        "rahul": "rahul@sbi",
        "राहुल": "rahul@sbi"
      };

      const receiverKey = intentData.receiver.value.toLowerCase();

      if (!receiverMap[receiverKey]) {
        return res.status(404).json({
          error: "Receiver not found"
        });
      }

      const receiverAccount = await Account.findOne({
        upiId: receiverMap[receiverKey]
      });

      if (!receiverAccount) {
        return res.status(404).json({
          error: "Receiver account not found"
        });
      }

      // ✅ Create pending transaction
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
          name: intentData.receiver,
          upiId: receiverAccount.upiId
        },
        message: `₹${intentData.amount} भेजें ${intentData.receiver} को?`
      });
    }
console.log("✅ Intent routes loaded");
    /* ---------------- FALLBACK ---------------- */
    return res.json({
      intent: "UNKNOWN",
      message: "समझ नहीं पाया, कृपया फिर से बोलें"
    });

  } catch (err) {
    console.error("INTENT ERROR:", err);
    res.status(500).json({
      error: "Intent processing failed"
    });
  }
});

module.exports = router;
