import React from 'react';
import { motion } from 'framer-motion';
import { HardHat, Cpu, Eye, ArrowLeft, Sparkles } from 'lucide-react';

export default function Dashboard({ onNavigate }) {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-10 pb-20 text-center" dir="rtl">
      {/* بج تعاملی سربرگ */}
      <motion.div 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-300/80 text-emerald-950 text-xs font-bold mb-6 shadow-xs backdrop-blur-md"
      >
        <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
        <span>پلتفرم تخصصی مهندسی عمران، بینایی ماشین و هوش مصنوعی</span>
      </motion.div>

      {/* عنوان فوق‌العاده بزرگ و چشم‌نواز */}
      <motion.h1 
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6"
      >
        خلق سیستم‌های پایدار؛ <br className="hidden sm:inline" />
        <span className="relative inline-block mt-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600">
            از بتن تا الگوریتم‌های هوشمند
          </span>
          <svg className="absolute -bottom-2 right-0 left-0 w-full h-2 text-emerald-400 opacity-70" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0 10 Q 25 20, 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="4" />
          </svg>
        </span>
      </motion.h1>

      {/* متن معرفی با کپسول‌های تأکیدی تمیز */}
      <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
        سلام، من <strong className="text-slate-900 font-bold">محمد تاجداری</strong> هستم. فعالیت‌های من بر تلفیق{' '}
        <span className="inline-block px-2.5 py-0.5 rounded-lg bg-amber-100/70 text-amber-900 font-bold border border-amber-200/80 text-xs sm:text-sm">
          نظارت زیرساخت و راه‌سازی
        </span>{' '}
        با{' '}
        <span className="inline-block px-2.5 py-0.5 rounded-lg bg-sky-100/70 text-sky-900 font-bold border border-sky-200/80 text-xs sm:text-sm">
          بینایی ماشین و پایش سازه
        </span>{' '}
        و سامانه‌های خودگردان تمرکز دارد.
      </p>

      {/* دکمه‌های کپسولی شکیل */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16 w-full max-w-xs sm:max-w-none mx-auto">
        <motion.button 
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onNavigate('projects')}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-xs sm:text-sm shadow-[0_8px_24px_rgba(34,197,94,0.35)] transition-all flex items-center justify-center gap-2"
        >
          <span>مشاهده پروژه‌ها و مقالات فنی</span>
          <ArrowLeft className="w-4 h-4" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onNavigate('profile')}
          className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs sm:text-sm shadow-xs transition-all"
        >
          سوابق تحصیلی و کارنامه معمار
        </motion.button>
      </div>

      {/* کارت‌های سه‌گانه */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-right">
        <motion.div 
          whileHover={{ y: -6 }}
          onClick={() => onNavigate('civil-tools')}
          className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xs hover:border-amber-400/80 transition-all cursor-pointer space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shadow-xs">
            <HardHat className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">نظارت و مدیریت پروژه‌های عمرانی</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            هدایت میدانی عملیات خاکی، تراکم ژئوتکنیک بستر و روسازی معابر منطبق بر مشخصات نشریه ۱۰۱.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -6 }}
          onClick={() => onNavigate('ai-lab')}
          className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xs hover:border-sky-400/80 transition-all cursor-pointer space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 shadow-xs">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">هوش مصنوعی و پردازش تصویر (SHM)</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            تشخیص خودکار و طبقه‌بندی ترک‌های بتن با شبکه‌های عصبی عمیق در پایتورچ با دقت بالای ۹۸٪.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -6 }}
          onClick={() => onNavigate('projects')}
          className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-xs hover:border-emerald-400/80 transition-all cursor-pointer space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shadow-xs">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">توسعه وب‌اپلیکیشن و سامانه PWA</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            سامانه مهندسی همراه ناظر با کشینگ کامل آفلاین جهت استفاده در محیط‌های بدون آنتن‌دهی کارگاهی.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
