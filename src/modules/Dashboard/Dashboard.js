import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Activity, Shield, Cpu, Zap, ArrowUpRight } from 'lucide-react';

const LAB_DATA = [
  {
    id: 'l1',
    title: 'Neural Sync',
    faTitle: 'همگام‌سازی عصبی و امواج دوگوشی',
    color: 'bg-blue-500',
    glow: 'shadow-[0_0_15px_#3b82f6]',
    desc: 'پروتکل تحریک امواج مغزی آلفا و گاما (۴۰ هرتز) برای کاهش پراکندگی توجه و افزایش ۲ برابری عمق یادگیری عمیق.',
    metrics: ['فرکانس هدف: 40Hz', 'مدت استاندارد: ۹۰ دقیقه', 'اثر: کاهش نویز شناختی']
  },
  {
    id: 'l2',
    title: 'Strategic AI',
    faTitle: 'هوش استراتژیک و اصل ۸۰/۲۰',
    color: 'bg-emerald-500',
    glow: 'shadow-[0_0_15px_#10b981]',
    desc: 'ماتریس اولویت‌بندی محاسباتی مبتنی بر پارتو برای حذف وظایف کم‌ارزش و تمرکز ۱۰۰ درصدی روی تسک‌های اهرمی.',
    metrics: ['نسبت اهرم: 80/20', 'پایش تمرکز روزانه', 'ارزیابی تصمیمات استراتژیک']
  },
  {
    id: 'l3',
    title: 'Bio-Protocol',
    faTitle: 'پروتکل بیولوژیک و ریتم شبانه‌روزی',
    color: 'bg-rose-500',
    glow: 'shadow-[0_0_15px_#f43f5e]',
    desc: 'تنظیم چرخه آدنوزین و ترشح دوپامین با دریافت نور خورشید صبحگاهی، تاخیر ۹۰ دقیقه‌ای کافئین و حمام سرما.',
    metrics: ['تاخیر کافئین: ۹۰ دقیقه', 'بلوک تمرکز در پیک دما', 'بهینه‌سازی خواب REM']
  },
  {
    id: 'l4',
    title: 'Wealth Engine',
    faTitle: 'خلق دارایی و اهرم‌های تخصصی',
    color: 'bg-amber-500',
    glow: 'shadow-[0_0_15px_#f59e0b]',
    desc: 'معماری توسعه دارایی‌های مقیاس‌پذیر دیجیتال، برنامه‌نویسی نرم‌افزار بدون نیاز به نیروی کار انسانی و خلق ارزش پایدار.',
    metrics: ['اهرم: کد و رسانه', 'مقیاس‌پذیری نامحدود', 'بازدهی ترکیبی بلندمدت']
  }
];

const WEEK_DATA = [
  { day: 'شنبه', hours: 4.5, pct: 45 },
  { day: 'یکشنبه', hours: 6.0, pct: 60 },
  { day: 'دوشنبه', hours: 5.0, pct: 50 },
  { day: 'سه‌شنبه', hours: 7.5, pct: 75 },
  { day: 'چهارشنبه', hours: 6.5, pct: 65 },
  { day: 'پنج‌شنبه', hours: 8.5, pct: 85 },
  { day: 'جمعه', hours: 9.5, pct: 95 }
];

const Dashboard = () => {
  const [chartMode, setChartMode] = useState('wave'); // wave | bar
  const [selectedLab, setSelectedLab] = useState(null);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 text-right" dir="rtl">
      {/* Hero Header */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-gold/20 relative overflow-hidden text-center sm:text-right">
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
          <span className="text-[10px] tracking-widest text-gold font-mono">مرکز هدایت و فرماندهی نخبگان</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black mb-3">
          معماری <span className="gold-text">ذهن برتر</span>
        </h1>
        <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-xl mx-auto sm:mx-0">
          سیستم‌عامل جامع خودکنترلی، انضباط بیولوژیک و مهندسی تفکر استراتژیک. تمام تصمیمات، ارتقاءها و اهداف خود را در یک چارچوب حاکمیتی یکپارچه پایش کنید.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="glass p-4 sm:p-5 rounded-2xl border border-white/10 text-center">
          <span className="text-[10px] text-white/40 block mb-1">جلسات تمرکز ثبت‌شده</span>
          <span className="font-mono text-xl sm:text-2xl font-bold text-gold">۱۴</span>
          <span className="text-[10px] text-white/50 block mt-0.5">نشست</span>
        </div>

        <div className="glass p-4 sm:p-5 rounded-2xl border border-white/10 text-center">
          <span className="text-[10px] text-white/40 block mb-1">کل دقایق غرقگی</span>
          <span className="font-mono text-xl sm:text-2xl font-bold text-white">۳۵۰</span>
          <span className="text-[10px] text-white/50 block mt-0.5">دقیقه</span>
        </div>

        <div className="glass col-span-2 sm:col-span-1 p-4 sm:p-5 rounded-2xl border border-white/10 text-center flex flex-col justify-center">
          <span className="text-[10px] text-white/40 block mb-1">شاخص بهره‌وری</span>
          <span className="font-mono text-xl sm:text-2xl font-bold text-green-400" dir="ltr">+28.4%</span>
          <span className="text-[9px] font-mono text-white/30 uppercase mt-0.5">EFFICIENCY DELTA</span>
        </div>
      </div>

      {/* Chart Card */}
      <div className="glass p-5 sm:p-7 rounded-3xl border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>موتور آنالیز رشد عصبی</span>
              <span className="text-gold font-mono text-xs" dir="ltr">(Neural Velocity)</span>
            </h2>
            <p className="text-[11px] text-white/50 mt-1">پایش پیوسته ساعات تمرکز عمیق و شتاب پیشرفت شناختی هفتگی</p>
          </div>

          {/* Switcher */}
          <div className="flex items-center bg-black/60 p-1 rounded-xl border border-white/10 self-stretch sm:self-auto justify-center">
            <button
              onClick={() => setChartMode('wave')}
              className={`px-3.5 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
                chartMode === 'wave' ? 'bg-gold text-black font-bold shadow-[0_0_10px_rgba(212,175,55,0.4)]' : 'text-white/60'
              }`}
            >
              پیوسته (امواج)
            </button>
            <button
              onClick={() => setChartMode('bar')}
              className={`px-3.5 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
                chartMode === 'bar' ? 'bg-gold text-black font-bold shadow-[0_0_10px_rgba(212,175,55,0.4)]' : 'text-white/60'
              }`}
            >
              میله‌ای (ساعات)
            </button>
          </div>
        </div>

        {/* Chart Viewport */}
        <div className="pt-4">
          <div className="flex">
            {/* Y Axis Values */}
            <div className="flex flex-col justify-between text-[10px] font-mono text-white/30 pl-3 pb-6 select-none h-48">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            {/* Drawing Box */}
            <div className="flex-1 relative h-48 border-l border-b border-white/15">
              {/* Horizontal Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                <div className="border-b border-white w-full" />
                <div className="border-b border-white w-full" />
                <div className="border-b border-white w-full" />
                <div className="border-b border-white w-full" />
              </div>

              {chartMode === 'wave' ? (
                <div className="w-full h-full relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,110 Q 100,60 200,90 T 400,45 T 550,65 T 700,10 L 700,200 L 0,200 Z"
                      fill="url(#goldGradient)"
                    />
                    <path
                      d="M 0,110 Q 100,60 200,90 T 400,45 T 550,65 T 700,10"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="3.5"
                    />
                  </svg>
                </div>
              ) : (
                <div className="w-full h-full flex justify-around items-end px-2 pt-4">
                  {WEEK_DATA.map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                      <span className="text-[9px] font-mono text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.hours}h
                      </span>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${item.pct}%` }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="w-5 sm:w-8 bg-gradient-to-t from-gold/40 to-gold rounded-t-lg shadow-[0_0_12px_rgba(212,175,55,0.3)] hover:brightness-125 transition-all cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Weekday Axis (RTL standard) */}
          <div className="flex justify-around items-center text-[11px] font-mono text-white/50 pt-3 mr-7">
            {WEEK_DATA.map((item, i) => (
              <span key={i}>{item.day}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Sovereign Labs Grid */}
      <div className="space-y-3">
        <div className="text-right">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>آزمایشگاه‌های حاکمیتی</span>
            <span className="text-gold font-mono text-xs" dir="ltr">(Sovereign Labs)</span>
          </h3>
          <p className="text-[11px] text-white/50">برای مشاهده مستندات اجرایی، روی هر آزمایشگاه کلیک کنید</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LAB_DATA.map((lab) => (
            <div
              key={lab.id}
              onClick={() => setSelectedLab(lab)}
              className="glass p-4 rounded-2xl border border-white/10 hover:border-gold/40 transition-all cursor-pointer flex items-center justify-between group active:scale-95"
            >
              <div>
                <span className="text-[8px] font-mono tracking-widest text-white/30 block mb-0.5 uppercase">MOD-ACTIVE</span>
                <h4 className="font-bold text-sm text-white group-hover:text-gold transition-colors">{lab.title}</h4>
                <p className="text-[10px] text-white/50">{lab.faTitle}</p>
              </div>
              <div className={`w-4 h-4 rounded-full ${lab.color} ${lab.glow} animate-pulse`} />
            </div>
          ))}
        </div>
      </div>

      {/* Lab Modal Viewer */}
      <AnimatePresence>
        {selectedLab && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-6 sm:p-8 rounded-3xl max-w-lg w-full border border-gold/30 relative text-right space-y-4"
            >
              <button
                onClick={() => setSelectedLab(null)}
                className="absolute top-5 left-5 text-white/40 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className={`w-3.5 h-3.5 rounded-full ${selectedLab.color} ${selectedLab.glow}`} />
                <span className="text-[10px] font-mono text-gold tracking-widest uppercase">SOVEREIGN LAB PROTOCOL</span>
              </div>

              <h3 className="text-xl font-bold text-white">{selectedLab.title}</h3>
              <p className="text-xs text-white/70 leading-relaxed">{selectedLab.desc}</p>

              <div className="bg-black/50 p-4 rounded-xl border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-white/40 block">پارامترهای بهینه‌سازی:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedLab.metrics.map((m, idx) => (
                    <span key={idx} className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-gold font-mono">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedLab(null)}
                className="w-full py-3 bg-gold text-black font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:brightness-110 transition-all"
              >
                بستن و ادامه
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
