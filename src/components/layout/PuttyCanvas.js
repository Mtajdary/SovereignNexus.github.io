import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';

export default function PuttyCanvas({ children }) {
  return (
    <div className="relative min-h-screen bg-[#fafafa] text-gray-900 selection:bg-emerald-300 font-sans overflow-x-hidden">
      {/* شبکه نقطه‌چین مهندسی */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: 'radial-gradient(#9ca3af 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* کرسر اول: بالا سمت چپ در فضای کاملاً آزاد */}
      <motion.div
        animate={{ x: [0, 8, -6, 0], y: [0, -8, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-4 md:left-16 z-20 pointer-events-none flex items-center gap-1.5"
      >
        <MousePointer2 className="w-3.5 h-3.5 text-gray-900 fill-gray-900 -rotate-12" />
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#facc15] text-gray-950 text-[10px] font-bold shadow-sm border border-black/10">
          <span>Mohammad</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </motion.div>

      {/* کرسر دوم: بالا سمت راست در فضای خالی */}
      <motion.div
        animate={{ x: [0, -10, 6, 0], y: [0, 8, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-24 right-4 md:right-16 z-20 pointer-events-none flex items-center gap-1.5"
      >
        <MousePointer2 className="w-3.5 h-3.5 text-gray-900 fill-gray-900 -rotate-12" />
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#38bdf8] text-gray-950 text-[10px] font-bold shadow-sm border border-black/10">
          <span>Vision AI</span>
        </div>
      </motion.div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
