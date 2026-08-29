import React from 'react';
import { motion } from 'framer-motion';

export const SovereignCard = ({ children, className = '', glow = false, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      onClick={onClick}
      className={`glass rounded-3xl p-6 transition-all relative overflow-hidden ${
        glow ? 'gold-glow border-gold/40' : 'border-white/10 hover:border-gold/30'
      } ${className}`}
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-60" />
      {children}
    </motion.div>
  );
};
