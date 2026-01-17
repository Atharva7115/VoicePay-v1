const extractReceiver = require("./extractReceiver");

function detectIntent(normalizedText) {
  // BALANCE
  if (
    normalizedText.includes("balance") ||
    normalizedText.includes("kitna") ||
    normalizedText.includes("kitne")
  ) {
    return { intent: "BALANCE_CHECK" };
  }

  // TRANSFER
  const amountMatch = normalizedText.match(/\d+/);

  if (
    amountMatch &&
    (
      normalizedText.includes("send") ||
      normalizedText.includes("bhej") ||
      normalizedText.includes("transfer") ||
      normalizedText.includes("pay")
    )
  ) {
    return {
      intent: "MONEY_TRANSFER",
      amount: Number(amountMatch[0]),
      receiver: extractReceiver(normalizedText)
    };
  }

  return { intent: "UNKNOWN" };
}

module.exports = detectIntent;
