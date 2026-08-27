import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, Sparkles, Heart } from 'lucide-react';

export default function PuttyCanvas({ children }) {
  const [mohammadClicks, setMohammadClicks] = useState(0);
  const [visionClicks, setVisionClicks] = useState(0);

  return (
    <div className="relative min-h-screen bg-[#fafafa] text-gray-900 selection:bg-emerald-300 font-sans overflow-x-hidden">
      {/* شبکه نقطه‌چین Google Labs */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: 'radial-gradient(#9ca3af 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* کرسر اول: محمد (معمار) - با قابلیت لمس، کشیدن و واکنش انیمیشنی */}
      <motion.div
        drag
        dragConstraints={{ left: -30, right: 300, top: -20, bottom: 400 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setMohammadClicks(c => c + 1)}
        className="absolute top-20 left-4 md:left-20 z-30 cursor-grab active:cursor-grabbing flex items-center gap-1.5 select-none"
      >
        <MousePointer2 className="w-4 h-4 text-gray-900 fill-gray-900 -rotate-12 drop-shadow-sm" />
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#facc15] text-gray-950 text-xs font-black shadow-md border border-black/10 hover:shadow-lg transition-shadow">
          <span>Mohammad</span>
          {mohammadClicks > 0 ? (
            <span className="flex items-center text-[10px] text-red-600 font-mono">
              <Heart className="w-3 h-3 fill-red-500 inline" /> {mohammadClicks}
            </span>
          ) : (
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          )}
        </div>
      </motion.div>

      {/* کرسر دوم: هوش مصنوعی - تعاملی و دارای قابلیت کشیدن */}
      <motion.div
        drag
        dragConstraints={{ left: -250, right: 40, top: -20, bottom: 400 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setVisionClicks(c => c + 1)}
        className="absolute top-24 right-4 md:right-20 z-30 cursor-grab active:cursor-grabbing flex items-center gap-1.5 select-none"
      >
        <MousePointer2 className="w-4 h-4 text-gray-900 fill-gray-900 -rotate-12 drop-shadow-sm" />
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#38bdf8] text-gray-950 text-xs font-black shadow-md border border-black/10 hover:shadow-lg transition-shadow">
          <span>Vision AI</span>
          <Sparkles className="w-3 h-3 text-blue-800 animate-spin" />
        </div>
      </motion.div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
