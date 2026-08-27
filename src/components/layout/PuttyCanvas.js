import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, Sparkles, Heart } from 'lucide-react';

export default function PuttyCanvas({ children, activeModule }) {
  const [likes, setLikes] = useState(0);
  const showCursors = activeModule === 'dashboard';

  return (
    <div className="relative min-h-screen bg-[#fafafa] text-gray-900 selection:bg-emerald-300 font-sans overflow-x-hidden">
      <div 
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: 'radial-gradient(#9ca3af 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px'
        }}
      />

      {showCursors && (
        <motion.div
          drag
          dragConstraints={{ left: -10, right: 300, top: 0, bottom: 400 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setLikes(l => l + 1)}
          className="absolute top-20 left-4 md:left-24 z-20 cursor-grab active:cursor-grabbing hidden sm:flex items-center gap-1 select-none"
        >
          <MousePointer2 className="w-3.5 h-3.5 text-gray-900 fill-gray-900 -rotate-12" />
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#facc15] text-gray-950 text-[10px] font-bold shadow-xs border border-black/10">
            <span>Mohammad</span>
            {likes > 0 && <span className="text-red-600 flex items-center gap-0.5"><Heart className="w-2.5 h-2.5 fill-red-500" />{likes}</span>}
          </div>
        </motion.div>
      )}

      {showCursors && (
        <motion.div
          drag
          dragConstraints={{ left: -300, right: 10, top: 0, bottom: 400 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-24 right-4 md:right-24 z-20 cursor-grab active:cursor-grabbing hidden sm:flex items-center gap-1 select-none"
        >
          <MousePointer2 className="w-3.5 h-3.5 text-gray-900 fill-gray-900 -rotate-12" />
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#38bdf8] text-gray-950 text-[10px] font-bold shadow-xs border border-black/10">
            <span>Vision AI</span>
            <Sparkles className="w-2.5 h-2.5 text-blue-900" />
          </div>
        </motion.div>
      )}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
