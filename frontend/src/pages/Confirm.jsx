// src/pages/Confirm.jsx
import { motion } from "framer-motion";
import { ArrowRight, XCircle } from "lucide-react";

export default function Confirm({ amount, receiver, onConfirm, onCancel }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100 flex flex-col justify-center px-6">
      
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-3xl shadow-xl p-8"
      >
        <p className="text-center text-muted-foreground mb-2">
          क्या आप भेजना चाहते हैं?
        </p>

        <h1 className="text-center text-4xl font-bold text-emerald-600 mb-4">
          ₹{amount}
        </h1>

        <div className="text-center mb-6">
          <p className="text-muted-foreground">प्राप्तकर्ता</p>
          <p className="text-xl font-semibold">{receiver}</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border border-red-200 text-red-600 font-semibold"
          >
            <XCircle /> नहीं
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-emerald-500 text-white font-semibold shadow-lg"
          >
            हाँ <ArrowRight />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
