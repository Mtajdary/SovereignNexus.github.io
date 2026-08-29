import React from 'react';
import { motion } from 'framer-motion';
import { useSovereign } from '../../context/SovereignContext';

const DynamicBackground = () => {
  const { theme } = useSovereign();
  const isLight = theme === 'light';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-colors duration-700">
      {/* 1. پالت رنگی پس‌زمینه پایه */}
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          isLight
            ? 'bg-gradient-to-b from-[#f8f7f2] via-[#f1efe7] to-[#e8e5da]'
            : 'bg-gradient-to-b from-[#030303] via-[#080808] to-[#000000]'
        }`}
      />

      {/* 2. شبکه ساختاریافته آزمایشگاهی (Labs Blueprint Grid) */}
      <div
        className={`absolute inset-0 opacity-[0.035] ${
          isLight ? 'invert opacity-[0.06]' : ''
        }`}
        style={{
          backgroundImage: `radial-gradient(rgba(212, 175, 55, 0.8) 1px, transparent 1px), radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}
      />

      {/* 3. گوی اول Google Labs (طلایی متحرک و تپنده) */}
      <motion.div
        animate={{
          x: [0, 80, -60, 0],
          y: [0, -100, 70, 0],
          scale: [1, 1.25, 0.9, 1],
          rotate: [0, 90, 180, 360]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute -top-24 -right-20 w-96 h-96 rounded-full blur-[100px] opacity-40 transition-colors duration-700 ${
          isLight ? 'bg-amber-300/60' : 'bg-amber-500/20'
        }`}
      />

      {/* 4. گوی دوم Google Labs (بنفش/نیلی کوانتومی شناور) */}
      <motion.div
        animate={{
          x: [0, -90, 80, 0],
          y: [0, 110, -50, 0],
          scale: [1, 1.3, 0.85, 1],
          rotate: [360, 270, 90, 0]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute top-1/3 -left-28 w-[28rem] h-[28rem] rounded-full blur-[120px] opacity-35 transition-colors duration-700 ${
          isLight ? 'bg-orange-200/60' : 'bg-indigo-600/20'
        }`}
      />

      {/* 5. گوی سوم Google Labs (زمردی / سبز هوش مصنوعی) */}
      <motion.div
        animate={{
          x: [0, 70, -80, 0],
          y: [0, -60, 90, 0],
          scale: [0.9, 1.2, 1, 0.9]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute -bottom-20 right-1/4 w-80 h-80 rounded-full blur-[95px] opacity-30 transition-colors duration-700 ${
          isLight ? 'bg-emerald-200/50' : 'bg-emerald-500/15'
        }`}
      />

      {/* 6. شکل‌های هندسی شناور آزمایشگاهی (Labs Floating Geometry) */}
      <motion.div
        animate={{
          y: [0, -25, 0],
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute top-1/4 right-[12%] w-12 h-12 rounded-2xl border transition-colors duration-700 ${
          isLight
            ? 'border-amber-600/15 bg-amber-500/5 shadow-[0_0_15px_rgba(212,175,55,0.1)]'
            : 'border-gold/20 bg-gold/5 shadow-[0_0_20px_rgba(212,175,55,0.1)]'
        }`}
      />

      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [0, -60, 0]
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute bottom-1/3 left-[8%] w-16 h-16 rounded-full border border-dashed transition-colors duration-700 ${
          isLight ? 'border-amber-700/15' : 'border-white/10'
        }`}
      />

      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute top-2/3 right-[8%] w-4 h-4 rounded-full ${
          isLight ? 'bg-amber-500/40' : 'bg-gold/40'
        }`}
      />
    </div>
  );
};

export default DynamicBackground;
