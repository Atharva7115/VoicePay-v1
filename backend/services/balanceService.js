const Account = require("../models/Account");

async function getPrimaryBalance(userId) {
  const account = await Account.findOne({
    userId,
    isPrimary: true
  });

  if (!account) {
    throw new Error("Primary account not found");
  }

  return account.balance;
}

module.exports = { getPrimaryBalance };
