import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const QuantitySelector = ({ value, onChange, min = 1, max = 99 }) => {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="flex items-center bg-brand-gray-dark border border-brand-gray-light rounded-2xl p-1 w-fit group">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleDecrement}
        className="p-3 text-brand-white/40 hover:text-brand-neon hover:bg-brand-gray-light rounded-xl transition-all disabled:opacity-20"
        disabled={value <= min}
      >
        <Minus size={18} />
      </motion.button>
      
      <div className="w-12 text-center">
        <span className="text-lg font-black text-brand-white font-brand">{value}</span>
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleIncrement}
        className="p-3 text-brand-white/40 hover:text-brand-neon hover:bg-brand-gray-light rounded-xl transition-all disabled:opacity-20"
        disabled={value >= max}
      >
        <Plus size={18} />
      </motion.button>
    </div>
  );
};

export default QuantitySelector;
