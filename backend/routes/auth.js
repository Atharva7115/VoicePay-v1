const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Account = require("../models/Account");

router.post("/test-create", async (req, res) => {
  const user = await User.create({
    phone: "9999999999",
    bank: "SBI"
  });

  const account = await Account.create({
    userId: user._id,
    bankName: "SBI",
    accountNumber: "1234567890",
    upiId: "user@sbi",
    balance: 8500
  });

  res.json({ user, account });
});

module.exports = router;
