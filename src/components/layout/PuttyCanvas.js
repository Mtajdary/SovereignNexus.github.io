import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, Sparkles, HardHat, Cpu, Eye } from 'lucide-react';

const floatingCursors = [
  { id: 1, name: 'Mohammad (Architect)', color: 'bg-emerald-400 text-black', icon: HardHat, x: ['15%', '22%', '18%'], y: ['20%', '28%', '22%'], duration: 6 },
  { id: 2, name: 'AI Vision Bot', color: 'bg-cyan-400 text-black', icon: Eye, x: ['80%', '72%', '78%'], y: ['15%', '24%', '18%'], duration: 8 },
  { id: 3, name: 'Prime Core', color: 'bg-amber-400 text-black', icon: Cpu, x: ['75%', '85%', '70%'], y: ['65%', '75%', '60%'], duration: 7 },
];

export default function PuttyCanvas({ children }) {
  return (
    <div className="relative min-h-screen bg-[#fafafa] text-gray-900 overflow-x-hidden selection:bg-emerald-300">
      {/* شبکه نقطه‌چین مهندسی مشابه Google Labs */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(#d1d5db 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* کرسرها و شکلک‌های زنده چندنفره و تعاملی شناور */}
      {floatingCursors.map((cursor) => {
        const Icon = cursor.icon;
        return (
          <motion.div
            key={cursor.id}
            animate={{ x: cursor.x, y: cursor.y }}
            transition={{ duration: cursor.duration, repeat: Infinity, ease: 'easeInOut' }}
            className="fixed pointer-events-none z-30 hidden md:flex items-center gap-1.5"
          >
            <MousePointer2 className="w-5 h-5 text-gray-900 drop-shadow-sm fill-gray-900" />
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md ${cursor.color}`}>
              <Icon className="w-3 h-3" />
              <span>{cursor.name}</span>
            </div>
          </motion.div>
        );
      })}

      {/* کانتینر اصلی */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
