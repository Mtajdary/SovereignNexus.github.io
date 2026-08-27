import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { MousePointer2, Sparkles, Heart } from 'lucide-react';

export default function PuttyCanvas({ children, activeModule }) {
  const [likes, setLikes] = useState(0);
  const showCursors = activeModule === 'dashboard';

  // نوار پیشرفت اسکرول بالا
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-[#fcfdfd] text-slate-900 selection:bg-emerald-300 font-sans overflow-x-hidden">
      {/* نوار اسکرول نئونی شیشه‌ای در بالاترین لایه */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 origin-left z-50 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
        style={{ scaleX }}
      />

      {/* هاله‌های پس‌زمینه */}
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

      {/* کرسر اول با خاصیت فنری */}
      {showCursors && (
        <motion.div
          drag
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setLikes(l => l + 1)}
          className="absolute top-20 left-4 md:left-24 z-20 cursor-grab active:cursor-grabbing hidden sm:flex items-center gap-1 select-none"
        >
          <MousePointer2 className="w-3.5 h-3.5 text-slate-900 fill-slate-900 -rotate-12 drop-shadow-sm" />
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#facc15] text-slate-950 text-[10px] font-bold shadow-md border border-black/10">
            <span>Mohammad</span>
            {likes > 0 && <span className="text-red-600 flex items-center gap-0.5"><Heart className="w-2.5 h-2.5 fill-red-500" />{likes}</span>}
          </div>
        </motion.div>
      )}

      {/* کرسر دوم */}
      {showCursors && (
        <motion.div
          drag
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          className="absolute top-24 right-4 md:right-24 z-20 cursor-grab active:cursor-grabbing hidden sm:flex items-center gap-1 select-none"
        >
          <MousePointer2 className="w-3.5 h-3.5 text-slate-900 fill-slate-900 -rotate-12 drop-shadow-sm" />
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#38bdf8] text-slate-950 text-[10px] font-bold shadow-md border border-black/10">
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
