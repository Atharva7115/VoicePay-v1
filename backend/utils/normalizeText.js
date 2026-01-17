function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[?!.]/g, "")
    .replace("बलेज", "balance")
    .replace("बैलेंस", "balance")
    .replace("पैसे", "paisa")
    .replace("पैसा", "paisa")
    .replace("रुपये", "paisa")
    .replace("रुपया", "paisa");
}

module.exports = normalizeText;
