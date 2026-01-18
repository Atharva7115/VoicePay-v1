import { Mic, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function Home() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  const handleMicPress = () => {
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    setError(null);

    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN"; // Hindi + Hinglish
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsListening(true);
    recognition.start();

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      console.log("🎤 Spoken:", text);

      setIsListening(false);

      if (!text || text.trim().length === 0) {
        setError("कुछ समझ नहीं आया, फिर से बोलिए");
        return;
      }

      try {
        const res = await api.post("/intent/detect", {
          text,
          userId: "696b0c0a8a60a2445f35d05a"
        });

        console.log("🧠 Intent response:", res.data);

        // ✅ BALANCE FLOW
        if (res.data.intent === "BALANCE_CHECK") {
          navigate("/balance", { state: res.data });
          return;
        }

        // ✅ TRANSFER FLOW
        if (res.data.confirmationRequired) {
          navigate("/confirm", { state: res.data });
          return;
        }

        setError("कमांड समझ में नहीं आई");

      } catch (err) {
        console.error("Intent error:", err);
        setError("सर्वर से कनेक्ट नहीं हो पाया");
      }
    };

    recognition.onerror = (err) => {
      console.error("Speech error:", err);
      setIsListening(false);
      setError("आवाज़ पहचानने में समस्या आई");
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100 px-6 py-6 flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">VoiceUPI</h1>
          <p className="text-sm text-muted-foreground">
            बोलकर पैसा भेजें
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow">
          <Wallet className="h-4 w-4 text-emerald-600" />
          <span className="font-semibold">₹25,000</span>
        </div>
      </div>

      {/* Center */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <p className="text-lg text-muted-foreground mb-2">
          {isListening ? "सुन रहे हैं..." : "नमस्ते 👋"}
        </p>

        <h2 className="text-4xl font-bold mb-2">बोलिए</h2>

        <motion.button
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: isListening
              ? "0 0 50px rgba(16,185,129,0.9)"
              : "0 0 20px rgba(16,185,129,0.4)"
          }}
          className="h-40 w-40 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-xl"
          onClick={handleMicPress}
          disabled={isListening}
        >
          <Mic className="h-16 w-16" />
        </motion.button>

        <p className="mt-6 text-muted-foreground">
          {isListening ? "बोलिए..." : "टैप करके बोलें"}
        </p>

        {error && (
          <p className="mt-4 text-red-600 font-medium">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

