const extractReceiver = require("./extractReceiver");

function detectIntent(text) {
  // BALANCE
  if (
    text.includes("balance") ||
    text.includes("kitna") ||
    text.includes("कितना")
  ) {
    return { intent: "BALANCE_CHECK" };
  }

  // AMOUNT
  const amountMatch = text.match(/\d+/);

  // TRANSFER KEYWORDS (Hindi + English)
  const transferWords = [
    "bhej",
    "bhejo",
    "send",
    "transfer",
    "pay",
    "de",
    "do",
    "ko"
  ];

  const isTransfer = transferWords.some(word => text.includes(word));

  if (amountMatch && isTransfer) {
    const receiver = extractReceiver(text);

    if (!receiver) {
      return { intent: "UNKNOWN" };
    }

    return {
      intent: "MONEY_TRANSFER",
      amount: Number(amountMatch[0]),
      receiver
    };
  }

  return { intent: "UNKNOWN" };
}

module.exports = detectIntent;

