const Account = require("../models/Account");
const User = require("../models/User");

async function findReceiverAccount(receiver) {
  if (!receiver) return null;

  const type = receiver.type.toLowerCase();

  // CASE 1: UPI ID
  if (type === "upi") {
    return await Account.findOne({ upiId: receiver.value });
  }

  // CASE 2: PHONE NUMBER
  if (type === "phone") {
    const user = await User.findOne({ phone: receiver.value });
    if (!user) return null;

    return await Account.findOne({
      userId: user._id,
      isPrimary: true
    });
  }

  // CASE 3: CONTACT NAME (Hackathon-safe)
  if (type === "contact" || type === "name") {
    const user = await User.findOne({
      name: new RegExp(`^${receiver.value}$`, "i")
    });
    if (!user) return null;

    return await Account.findOne({
      userId: user._id,
      isPrimary: true
    });
  }

  return null;
}

module.exports = { findReceiverAccount };
