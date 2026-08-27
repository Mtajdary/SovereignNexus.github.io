import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, Sparkles, Heart } from 'lucide-react';

export default function PuttyCanvas({ children, activeModule }) {
  const [likes, setLikes] = useState(0);
  const showCursors = activeModule === 'dashboard';

  return (
    <div className="relative min-h-screen bg-[#fcfdfd] text-slate-900 selection:bg-emerald-300 font-sans overflow-x-hidden">
      {/* هاله‌های گرادیانی بسیار نرم و شناور در پس‌زمینه (Ambient Aura Blobs) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-sky-200/35 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-blue-200/25 rounded-full blur-3xl" />
      </div>

      {/* شبکه نقطه‌چین مهندسی */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-35 z-0"
        style={{
          backgroundImage: 'radial-gradient(#94a3b8 1.1px, transparent 1.1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* کرسر اول: محمد */}
      {showCursors && (
        <motion.div
          drag
          dragConstraints={{ left: -10, right: 300, top: 0, bottom: 400 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setLikes(l => l + 1)}
          className="absolute top-20 left-4 md:left-24 z-20 cursor-grab active:cursor-grabbing hidden sm:flex items-center gap-1 select-none"
        >
          <MousePointer2 className="w-3.5 h-3.5 text-slate-900 fill-slate-900 -rotate-12" />
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#facc15] text-slate-950 text-[10px] font-bold shadow-xs border border-black/10">
            <span>Mohammad</span>
            {likes > 0 && <span className="text-red-600 flex items-center gap-0.5"><Heart className="w-2.5 h-2.5 fill-red-500" />{likes}</span>}
          </div>
        </motion.div>
      )}

      {/* کرسر دوم: هوش مصنوعی */}
      {showCursors && (
        <motion.div
          drag
          dragConstraints={{ left: -300, right: 10, top: 0, bottom: 400 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-24 right-4 md:right-24 z-20 cursor-grab active:cursor-grabbing hidden sm:flex items-center gap-1 select-none"
        >
          <MousePointer2 className="w-3.5 h-3.5 text-slate-900 fill-slate-900 -rotate-12" />
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#38bdf8] text-slate-950 text-[10px] font-bold shadow-xs border border-black/10">
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
