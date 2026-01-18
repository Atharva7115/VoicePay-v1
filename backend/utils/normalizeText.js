function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[?!.]/g, "")
    // balance
    .replace("बैलेंस", "balance")
    .replace("बलेज", "balance")
    // money
    .replace("रुपये", "")
    .replace("रुपया", "")
    // transfer verbs
    .replace("भेजो", "bhejo")
    .replace("भेज", "bhej")
    .replace("दो", "do")
    .replace("दे", "de")
    .replace("को", " ko ");
}

module.exports = normalizeText;

