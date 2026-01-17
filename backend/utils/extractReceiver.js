function extractReceiver(normalizedText) {
  // UPI ID
  const upiMatch = normalizedText.match(/\b[a-z0-9._-]+@[a-z]+\b/i);
  if (upiMatch) {
    return { type: "UPI", value: upiMatch[0] };
  }

  // Phone number
  const phoneMatch = normalizedText.match(/\b\d{10}\b/);
  if (phoneMatch) {
    return { type: "PHONE", value: phoneMatch[0] };
  }

  // Name before "ko / to / ke / for"
  const nameMatch = normalizedText.match(/(\w+)\s+(ko|to|ke|for)\b/i);
  if (nameMatch) {
    return { type: "CONTACT", value: nameMatch[1] };
  }

  return null;
}

module.exports = extractReceiver;

