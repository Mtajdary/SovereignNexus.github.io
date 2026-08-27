import React from 'react';
import { motion } from 'framer-motion';
import { HardHat, Cpu, Eye, ArrowLeft, Sparkles } from 'lucide-react';

export default function Dashboard({ onNavigate }) {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-8 pb-20 text-center" dir="rtl">
      {/* بج تعاملی سربرگ */}
      <motion.div 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-300/80 text-emerald-950 text-xs font-bold mb-6 shadow-xs backdrop-blur-md cursor-default"
      >
        <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
        <span>پلتفرم تخصصی مهندسی عمران، بینایی ماشین و هوش مصنوعی</span>
      </motion.div>

      {/* عنوان اصلی */}
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

      {/* متن معرفی */}
      <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
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

      {/* دکمه‌های کپسولی Clay با فیزیک جهش */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full max-w-xs sm:max-w-none mx-auto">
        <motion.button 
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onNavigate('projects')}
          className="clay-btn-emerald w-full sm:w-auto px-8 py-3.5 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
        >
          <span>مشاهده پروژه‌ها و مقالات فنی</span>
          <ArrowLeft className="w-4 h-4" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onNavigate('profile')}
          className="clay-btn-white w-full sm:w-auto px-7 py-3.5 text-slate-800 font-bold text-xs sm:text-sm"
        >
          سوابق تحصیلی و کارنامه معمار
        </motion.button>
      </div>

      {/* کارت‌های سه‌گانه Claymorphic با انیمیشن لمسی */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-right">
        <motion.div 
          whileHover={{ y: -6, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('civil-tools')}
          className="clay-card p-6 cursor-pointer space-y-4"
        >
          <div className="clay-icon-amber w-14 h-14 flex items-center justify-center text-amber-800">
            <HardHat className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">نظارت و مدیریت پروژه‌های عمرانی</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            هدایت میدانی عملیات خاکی، تراکم ژئوتکنیک بستر و روسازی معابر منطبق بر مشخصات نشریه ۱۰۱.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -6, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('ai-lab')}
          className="clay-card p-6 cursor-pointer space-y-4"
        >
          <div className="clay-icon-sky w-14 h-14 flex items-center justify-center text-sky-800">
            <Eye className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">هوش مصنوعی و پردازش تصویر (SHM)</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            تشخیص خودکار و طبقه‌بندی ترک‌های بتن با شبکه‌های عصبی عمیق در پایتورچ با دقت بالای ۹۸٪.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -6, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('projects')}
          className="clay-card p-6 cursor-pointer space-y-4"
        >
          <div className="clay-icon-emerald w-14 h-14 flex items-center justify-center text-emerald-800">
            <Cpu className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">توسعه وب‌اپلیکیشن و سامانه PWA</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            سامانه مهندسی همراه ناظر با کشینگ کامل آفلاین جهت استفاده در محیط‌های بدون آنتن‌دهی کارگاهی.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
