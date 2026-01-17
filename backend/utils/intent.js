function extractIntent(text) {
  const t = text.toLowerCase();

  // balance intent
  if (
    t.includes("balance") ||
    t.includes("paisa") ||
    t.includes("money") ||
    t.includes("kitne")
  ) {
    return { intent: "BALANCE_CHECK" };
  }

  // transfer intent
  const amountMatch = t.match(/\d+/);

  if (
    amountMatch &&
    (t.includes("send") ||
     t.includes("bhej") ||
     t.includes("transfer") ||
     t.includes("pay"))
  ) {
    return {
      intent: "MONEY_TRANSFER",
      amount: Number(amountMatch[0])
    };
  }

  return { intent: "UNKNOWN" };
}

module.exports = extractIntent;
