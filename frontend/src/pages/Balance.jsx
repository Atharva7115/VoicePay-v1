import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Balance() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const amount = state?.balance ?? 0;

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-b from-green-50 to-white px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-8 text-center"
      >
        <Wallet size={48} className="mx-auto text-green-600 mb-4" />

        <h2 className="text-xl font-bold mb-2">
          आपका बैलेंस
        </h2>

        <p className="text-3xl font-extrabold text-green-700 mb-4">
          ₹ {amount}
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-4 text-sm text-green-700 underline"
        >
          वापस जाएँ
        </button>
      </motion.div>
    </div>
  );
}

