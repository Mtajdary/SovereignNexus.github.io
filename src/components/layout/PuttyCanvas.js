import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { MousePointer2, Sparkles, HardHat } from 'lucide-react';

export default function PuttyCanvas({ children }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-[#fafbfc] text-slate-900 selection:bg-emerald-300 font-sans overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-slate-900 origin-left z-50"
        style={{ scaleX }}
      />

      <div 
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* نشانگر ۱: Civil QC Engine */}
      <motion.div
        drag
        dragElastic={0.2}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-16 left-6 md:left-28 z-20 cursor-grab active:cursor-grabbing flex items-center gap-1 select-none"
      >
        <MousePointer2 className="w-3.5 h-3.5 text-slate-900 fill-slate-900 -rotate-12 drop-shadow-xs" />
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#fde047] text-slate-950 text-[10px] font-bold shadow-xs border border-black/10">
          <HardHat className="w-3 h-3 text-amber-900" />
          <span>Civil QC Lab</span>
        </div>
      </motion.div>

      {/* نشانگر ۲: Vision AI Engine */}
      <motion.div
        drag
        dragElastic={0.2}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-24 right-6 md:right-32 z-20 cursor-grab active:cursor-grabbing flex items-center gap-1 select-none"
      >
        <MousePointer2 className="w-3.5 h-3.5 text-slate-900 fill-slate-900 -rotate-12 drop-shadow-xs" />
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#38bdf8] text-slate-950 text-[10px] font-bold shadow-xs border border-black/10">
          <span>Vision Core</span>
          <Sparkles className="w-2.5 h-2.5 text-blue-900" />
        </div>
      </motion.div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
