// src/pages/EnterPin.jsx
import { useState } from "react";
import { motion } from "framer-motion";

export default function EnterPin({ onSubmit }) {
  const [pin, setPin] = useState("");

  const handlePress = (num) => {
    if (pin.length < 4) setPin(pin + num);
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100 flex flex-col items-center justify-center px-6">
      
      <h2 className="text-2xl font-bold mb-6">UPI PIN डालें</h2>

      {/* PIN DOTS */}
      <div className="flex gap-4 mb-8">
        {[0,1,2,3].map(i => (
          <div
            key={i}
            className={`h-4 w-4 rounded-full ${
              pin.length > i ? "bg-emerald-500" : "bg-emerald-200"
            }`}
          />
        ))}
      </div>

      {/* KEYPAD */}
      <div className="grid grid-cols-3 gap-4">
        {[1,2,3,4,5,6,7,8,9].map(n => (
          <button
            key={n}
            onClick={() => handlePress(n)}
            className="h-16 w-16 rounded-full bg-white shadow text-xl font-bold"
          >
            {n}
          </button>
        ))}

        <button onClick={handleDelete} className="h-16 w-16 rounded-full bg-white shadow">
          ⌫
        </button>

        <button
          onClick={() => handlePress(0)}
          className="h-16 w-16 rounded-full bg-white shadow text-xl font-bold"
        >
          0
        </button>

        <button
          onClick={() => onSubmit(pin)}
          disabled={pin.length !== 4}
          className="h-16 w-16 rounded-full bg-emerald-500 text-white shadow text-lg"
        >
          ✓
        </button>
      </div>
    </div>
  );
}
