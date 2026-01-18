// src/pages/Success.jsx
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import successAnim from "../assets/success.json";

export default function Success({ amount, balance }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100 flex flex-col items-center justify-center px-6">
      
      <Lottie
        animationData={successAnim}
        loop={false}
        className="h-56"
      />

      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="text-3xl font-bold text-emerald-600 mt-4"
      >
        भुगतान सफल 🎉
      </motion.h1>

      <p className="text-muted-foreground mt-2">
        ₹{amount} सफलतापूर्वक भेजा गया
      </p>

      <div className="bg-white rounded-2xl shadow px-6 py-4 mt-6">
        <p className="text-muted-foreground text-sm">नया बैलेंस</p>
        <p className="text-2xl font-bold">₹{balance}</p>
      </div>

      <button
        onClick={() => window.location.href = "/"}
        className="mt-10 px-8 py-4 rounded-2xl bg-emerald-500 text-white font-semibold shadow-lg"
      >
        होम पर जाएँ
      </button>
    </div>
  );
}
