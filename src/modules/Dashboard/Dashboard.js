import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, ShieldCheck, Flame, Cpu, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
  const [chartMode, setChartMode] = useState('wave'); // wave | bar
  const days = ['شنبه', '۱ش', '۲ش', '۳ش', '۴ش', '۵ش', 'جمعه'];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 text-right" dir="rtl">
      {/* Hero Welcome Box */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-gold/20 text-center sm:text-right relative overflow-hidden">
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
          <span className="text-[10px] tracking-widest text-gold/80 font-mono">مرکز هدایت و فرماندهی نخبگان</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black mb-3">
          معماری <span className="gold-text">ذهن برتر</span>
        </h1>
        <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-xl mx-auto sm:mx-0">
          سیستم‌عامل جامع خودکنترلی، انضباط بیولوژیک و مهندسی تفکر استراتژیک. تمام تصمیمات، ارتقاءها و اهداف خود را در یک چارچوب حاکمیتی یکپارچه پایش کنید.
        </p>
      </div>

      {/* Primary Metrics */}
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

      {/* Chart Section */}
      <div className="glass p-5 sm:p-7 rounded-3xl border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>موتور آنالیز رشد عصبی</span>
              <span className="text-gold font-mono text-xs" dir="ltr">(Neural Velocity)</span>
            </h2>
            <p className="text-[11px] text-white/50 mt-1">پایش پیوسته ساعات تمرکز عمیق و شتاب پیشرفت شناختی هفتگی</p>
          </div>

          {/* Toggle Button */}
          <div className="flex items-center bg-black/50 p-1 rounded-xl border border-white/10 self-stretch sm:self-auto justify-center">
            <button
              onClick={() => setChartMode('wave')}
              className={`px-3 py-1.5 rounded-lg text-[10px] transition-all ${
                chartMode === 'wave' ? 'bg-gold text-black font-bold' : 'text-white/60'
              }`}
            >
              پیوسته (امواج)
            </button>
            <button
              onClick={() => setChartMode('bar')}
              className={`px-3 py-1.5 rounded-lg text-[10px] transition-all ${
                chartMode === 'bar' ? 'bg-gold text-black font-bold' : 'text-white/60'
              }`}
            >
              میله‌ای (ساعات)
            </button>
          </div>
        </div>

        {/* Dynamic Canvas / SVG Wave */}
        <div className="pt-4 pb-2">
          <div className="h-44 w-full relative flex items-end">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,140 Q 100,90 200,120 T 400,60 T 600,80 T 700,30 L 700,200 L 0,200 Z"
                fill="url(#goldGradient)"
              />
              <path
                d="M 0,140 Q 100,90 200,120 T 400,60 T 600,80 T 700,30"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="3"
              />
            </svg>
          </div>

          {/* Weekday Labels */}
          <div className="flex justify-between items-center text-[10px] font-mono text-white/40 pt-3 border-t border-white/10 px-2">
            {days.map((d, i) => (
              <span key={i}>{d}</span>
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
          <p className="text-[11px] text-white/50">ابزارهای آزمایشی و محاسباتی ارتقای توانمندی ذهنی و اجرایی</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { id: 'l1', title: 'Neural Sync', desc: 'همگام‌سازی عصبی و امواج دوگوشی', color: 'bg-blue-500' },
            { id: 'l2', title: 'Strategic AI', desc: 'هوش استراتژیک و اصل ۸۰/۲۰', color: 'bg-emerald-500' },
            { id: 'l3', title: 'Bio-Protocol', desc: 'پروتکل بیولوژیک و ریتم شبانه‌روزی', color: 'bg-rose-500' },
            { id: 'l4', title: 'Wealth Engine', desc: 'خلق دارایی و اهرم‌های تخصصی', color: 'bg-amber-500' }
          ].map((lab) => (
            <div key={lab.id} className="glass p-4 rounded-2xl border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[8px] font-mono tracking-widest text-white/30 block mb-0.5 uppercase">MOD-ACTIVE</span>
                <h4 className="font-bold text-sm text-white">{lab.title}</h4>
                <p className="text-[10px] text-white/50">{lab.desc}</p>
              </div>
              <div className={`w-3.5 h-3.5 rounded-full ${lab.color} shadow-[0_0_10px_currentColor]`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
