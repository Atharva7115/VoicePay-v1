function extractReceiver(text) {
  // 1️⃣ UPI ID (highest priority)
  const upiMatch = text.match(/\b[a-z0-9._-]+@[a-z]+\b/i);
  if (upiMatch) {
    return { type: "UPI", value: upiMatch[0] };
  }

  // 2️⃣ Phone number
  const phoneMatch = text.match(/\b\d{10}\b/);
  if (phoneMatch) {
    return { type: "PHONE", value: phoneMatch[0] };
  }

  // 3️⃣ Hindi / English name before "को / ko / to"
  const nameMatch = text.match(
  /([\u0900-\u097F]+|[a-zA-Z]+)\s*(ko|to|ke|for)/i
);


  if (nameMatch) {
    return {
      type: "CONTACT",
      value: nameMatch[1]
    };
  }

  return null;
}

module.exports = extractReceiver;

