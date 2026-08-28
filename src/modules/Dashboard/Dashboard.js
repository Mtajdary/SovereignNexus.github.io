import React from 'react';
import AnalyticsEngine from './AnalyticsEngine';
import SovereignLabs from './SovereignLabs';
import { useSovereign } from '../../context/SovereignContext';
import { Target, Zap, Clock, TrendingUp, Sparkles, ArrowLeft } from 'lucide-react';

const Dashboard = () => {
  const { coins, rank, focusStats } = useSovereign();

  return (
    <div className="max-w-6xl mx-auto px-6 text-right space-y-12">
      {/* Hero Banner with Modern Layout */}
      <section className="relative w-full overflow-hidden rounded-[40px] border border-gold/20 shadow-2xl glass p-10 md:p-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 blur-[130px] pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-6 justify-start">
            <span className="h-[1px] w-12 bg-gold"></span>
            <span className="text-gold text-[10px] tracking-[0.4em] font-bold uppercase">مرکز هدایت و فرماندهی نخبگان</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl mb-6 text-white leading-tight font-bold">
            معماریِ <span className="gold-text">ذهن برتر</span>
          </h1>

          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-2xl font-light">
            سیستم‌عامل جامع خودکنترلی، انضباط بیولوژیک و مهندسی تفکر استراتژیک. تمام تصمیمات، ارتقاءها و اهداف خود را در یک چارچوب حاکمیتی یکپارچه پایش کنید.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <span className="text-[9px] text-white/40 block mb-1">جلسات تمرکز ثبت‌شده</span>
              <span className="text-2xl font-bold text-gold">{focusStats.sessions} نشست</span>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <span className="text-[9px] text-white/40 block mb-1">کل دقایق غرقگی</span>
              <span className="text-2xl font-bold text-white">{focusStats.totalMinutes} دقیقه</span>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl col-span-2 sm:col-span-1">
              <span className="text-[9px] text-white/40 block mb-1">شاخص بهره‌وری</span>
              <span className="text-2xl font-bold text-green-400">+28.4%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics & Labs Engine */}
      <AnalyticsEngine />
      <SovereignLabs />
    </div>
  );
};

export default Dashboard;
