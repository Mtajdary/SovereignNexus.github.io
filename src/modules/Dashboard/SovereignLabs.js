import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, HeartPulse, Coins, X, Check, Sparkles } from 'lucide-react';
import { useSovereign } from '../../context/SovereignContext';

const tools = [
  {
    id: 'neural',
    name: 'Neural Sync',
    color: '#3B82F6',
    title: 'همگام‌سازی عصبی و امواج دوگوشی',
    desc: 'تنظیم فرکانس مغزی روی باند آلفا (۱۰ هرتز) برای کاهش حواس‌پرتی و دستیابی به حالت غرقگی شناختی.'
  },
  {
    id: 'ai',
    name: 'Strategic AI',
    color: '#10B981',
    title: 'هوش استراتژیک و اصل ۸۰/۲۰',
    desc: 'ماتریس تصمیم‌گیری مبتنی بر ۲۰٪ اقدامات حیاتی که ۸۰٪ از دستاوردهای مهندسی و مالی را خلق می‌کنند.'
  },
  {
    id: 'bio',
    name: 'Bio-Protocol',
    color: '#EC4899',
    title: 'پروتکل بیولوژیک و ریتم شبانه‌روزی',
    desc: 'زمان‌بندی اوج ترشح کورتیزول و دوپامین متناسب با کار عمیق مهندسی و مدیریت ساخت.'
  },
  {
    id: 'wealth',
    name: 'Wealth Engine',
    color: '#F59E0B',
    title: 'موتور انباشت سرمایه و مهارت‌های اهرمی',
    desc: 'محاسبه‌گر تبدیل تخصص‌های فنی و کامپیوتری به دارایی‌های با قابلیت رشد نمایی.'
  },
];

const SovereignLabs = () => {
  const [activeTool, setActiveTool] = useState(null);
  const { toggleAudio, soundMode } = useSovereign();

  return (
    <div className="glass p-8 md:p-12 rounded-[36px] border border-white/10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="font-serif text-2xl text-white font-bold">آزمایشگاه‌های حاکمیتی (Sovereign Labs)</h3>
          <p className="text-xs text-white/50 mt-1">ابزارهای آزمایشی و محاسباتی ارتقای توانمندی ذهنی و اجرایی</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((t) => (
          <motion.div
            key={t.id}
            whileHover={{ scale: 1.03, y: -4 }}
            onClick={() => setActiveTool(t)}
            className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-gold/30 cursor-pointer flex flex-col justify-between transition-all group"
          >
            <div className="flex items-center justify-between mb-6">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${t.color}15`, borderColor: t.color }}
              >
                <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: t.color }} />
              </div>
              <span className="text-[9px] font-mono text-white/40 tracking-wider uppercase">MOD-ACTIVE</span>
            </div>

            <div>
              <h4 className="font-bold text-base text-white group-hover:text-gold transition-colors mb-2">{t.name}</h4>
              <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">{t.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tool Details Modal */}
      <AnimatePresence>
        {activeTool && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-8 md:p-10 rounded-[36px] max-w-lg w-full border border-gold/30 relative text-right"
            >
              <button
                onClick={() => setActiveTool(null)}
                className="absolute top-6 left-6 text-white/40 hover:text-white focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                aria-label="بستن"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: activeTool.color }} />
                <h3 className="font-serif text-2xl text-white font-bold">{activeTool.title}</h3>
              </div>

              <p className="text-sm text-white/80 leading-loose mb-8">{activeTool.desc}</p>

              {activeTool.id === 'neural' && (
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 mb-6">
                  <span className="text-xs text-gold block mb-2 font-bold">پخش فرکانس همگام‌سازی عصبی:</span>
                  <button
                    onClick={() => toggleAudio('ALPHA')}
                    className="w-full py-3 bg-gold text-black font-bold text-xs rounded-xl gold-glow"
                  >
                    فعال‌سازی امواج آلفا ۱۰ هرتز
                  </button>
                </div>
              )}

              <button
                onClick={() => setActiveTool(null)}
                className="w-full py-3 border border-white/20 text-white text-xs font-bold rounded-xl hover:bg-white/10 transition-colors"
              >
                بستن پنجره
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SovereignLabs;
