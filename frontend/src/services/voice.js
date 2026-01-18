  import api from "./api";

  export async function detectIntent(audioBlob) {
    const formData = new FormData();
    formData.append("audio", audioBlob);

    // 🎤 Speech → Text
    const speechRes = await api.post("/speech", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const text = speechRes.data.text;
    console.log("📝 Transcribed:", text);

    if (!text || text.trim() === "") {
      throw new Error("Empty transcription");
    }

    // 🧠 Intent Detection
    const intentRes = await api.post("/intent/detect", {
      
      text,
      userId: "696b0c0a8a60a2445f35d05a", // ✅ REAL USER ID
    });

    return intentRes.data;
  }
