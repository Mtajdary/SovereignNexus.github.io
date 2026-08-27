import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, Sparkles, Heart } from 'lucide-react';

export default function PuttyCanvas({ children }) {
  const [likes, setLikes] = useState(0);

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

      {/* کرسر اول: محمد (معمار) */}
      <motion.div
        drag
        dragConstraints={{ left: -10, right: 260, top: 0, bottom: 450 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setLikes(l => l + 1)}
        className="absolute top-16 left-3 sm:left-16 z-30 cursor-grab active:cursor-grabbing flex items-center gap-1 select-none"
      >
        <MousePointer2 className="w-3.5 h-3.5 text-gray-900 fill-gray-900 -rotate-12" />
        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#facc15] text-gray-950 text-[10px] font-bold shadow-xs border border-black/10">
          <span>Mohammad</span>
          {likes > 0 && <span className="text-red-600 flex items-center gap-0.5"><Heart className="w-2.5 h-2.5 fill-red-500" />{likes}</span>}
        </div>
      </motion.div>

      {/* کرسر دوم: هوش مصنوعی */}
      <motion.div
        drag
        dragConstraints={{ left: -260, right: 10, top: 0, bottom: 450 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-16 right-3 sm:right-16 z-30 cursor-grab active:cursor-grabbing flex items-center gap-1 select-none"
      >
        <MousePointer2 className="w-3.5 h-3.5 text-gray-900 fill-gray-900 -rotate-12" />
        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#38bdf8] text-gray-950 text-[10px] font-bold shadow-xs border border-black/10">
          <span>Vision AI</span>
          <Sparkles className="w-2.5 h-2.5 text-blue-900" />
        </div>
      </motion.div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
