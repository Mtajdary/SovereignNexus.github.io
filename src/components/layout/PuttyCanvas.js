import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, Sparkles } from 'lucide-react';

export default function PuttyCanvas({ children }) {
  return (
    <div className="relative min-h-screen bg-[#fafafa] text-gray-900 selection:bg-emerald-300 font-sans overflow-x-hidden">
      {/* شبکه نقطه‌چین مهندسی Google Labs */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: 'radial-gradient(#9ca3af 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* کرسر اول: بالا سمت چپ تیتر اصلی (مشابه کرسر Amit) */}
      <motion.div
        animate={{ x: [0, 15, -10, 0], y: [0, -12, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-28 left-[10%] md:left-[22%] z-20 pointer-events-none flex items-center gap-1.5"
      >
        <MousePointer2 className="w-4 h-4 text-gray-900 fill-gray-900 -rotate-12" />
        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#facc15] text-gray-950 text-[11px] font-bold shadow-sm border border-black/10">
          <span>Mohammad</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        </div>
      </motion.div>

      {/* کرسر دوم: سمت راست پایین تیتر */}
      <motion.div
        animate={{ x: [0, -20, 10, 0], y: [0, 15, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-64 right-[8%] md:right-[20%] z-20 pointer-events-none flex items-center gap-1.5"
      >
        <MousePointer2 className="w-4 h-4 text-gray-900 fill-gray-900 -rotate-12" />
        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#38bdf8] text-gray-950 text-[11px] font-bold shadow-sm border border-black/10">
          <span>Vision Core</span>
        </div>
      </motion.div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
