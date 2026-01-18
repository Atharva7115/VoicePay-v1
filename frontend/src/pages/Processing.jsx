import { motion } from "framer-motion";

export default function Processing({ onStop }) {
  return (
    <div className="min-h-screen bg-[#fdfaf5] flex flex-col items-center justify-center">

      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        सुन रहे हैं...
      </h2>

      {/* Wave */}
      <div className="flex gap-2 mb-8">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="w-3 h-8 bg-green-500 rounded-full animate-pulse" />
        ))}
      </div>

      {/* Mic */}
      <button
        onClick={onStop}
        className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center text-white text-4xl shadow-xl"
      >
        🎤
      </button>

      <p className="mt-6 text-gray-600">
        बंद करने के लिए टैप करें
      </p>

      {/* Close */}
      <button className="absolute top-6 right-6 text-2xl">✕</button>
    </div>
  );
}
