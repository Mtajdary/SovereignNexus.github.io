import React from 'react';
import { motion } from 'framer-motion';
import { HardHat, Cpu, Eye, ArrowLeft, Sparkles } from 'lucide-react';

export default function Dashboard({ onNavigate }) {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-10 pb-20 text-center" dir="rtl">
      {/* نشان بالای صفحه */}
      <motion.div 
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold mb-6 shadow-xs"
      >
        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
        <span>پلتفرم تخصصی مهندسی عمران، بینایی ماشین و هوش مصنوعی</span>
      </motion.div>

      {/* عنوان اصلی با فونت شارپ شبنم */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.3] mb-6">
        خلق سیستم‌های پایدار؛ <br className="hidden sm:inline" />
        <span className="text-emerald-600 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600">
          از بتن تا الگوریتم‌های هوشمند
        </span>
      </h1>

      {/* متن معرفی با خوانایی بالا */}
      <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
        سلام، من <strong className="text-slate-900 font-bold">محمد تاجداری</strong> هستم. فعالیت‌های من بر پیوند{' '}
        <span className="font-bold text-slate-800">نظارت مقیم بر پروژه‌های زیرساخت و راه‌سازی</span> با{' '}
        <span className="font-bold text-slate-800">مدل‌سازی بینایی ماشین در پایش سلامت سازه (SHM)</span> و توسعه نرم‌افزارهای مهندسی تمرکز دارد.
      </p>

      {/* دکمه‌های اصلی مدرن */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16 w-full max-w-xs sm:max-w-none mx-auto">
        <button 
          onClick={() => onNavigate('projects')}
          className="btn-emerald-pro w-full sm:w-auto px-8 py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2"
        >
          <span>مشاهده پروژه‌ها و مقالات فنی</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button 
          onClick={() => onNavigate('profile')}
          className="btn-white-pro w-full sm:w-auto px-7 py-3.5 text-xs sm:text-sm"
        >
          سوابق تحصیلی و تجارب
        </button>
      </div>

      {/* کارت‌های ۳ گانه با ظاهر چشم‌نواز و تراز */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-right">
        <div 
          onClick={() => onNavigate('civil-tools')}
          className="pro-card p-6 cursor-pointer space-y-3.5"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700">
            <HardHat className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">نظارت و مدیریت پروژه‌های عمرانی</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            هدایت میدانی عملیات خاکی، تراکم ژئوتکنیک بستر و روسازی معابر منطبق بر مشخصات نشریه ۱۰۱.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('ai-lab')}
          className="pro-card p-6 cursor-pointer space-y-3.5"
        >
          <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200/60 flex items-center justify-center text-sky-700">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">هوش مصنوعی و پردازش تصویر (SHM)</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            تشخیص خودکار و طبقه‌بندی ترک‌های بتن با شبکه‌های عصبی عمیق در پایتورچ با دقت ۹۸.۴٪.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('projects')}
          className="pro-card p-6 cursor-pointer space-y-3.5"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-700">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">توسعه وب‌اپلیکیشن و PWA</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            سامانه مهندسی همراه ناظر با کشینگ کامل آفلاین جهت استفاده در محیط‌های بدون اینترنت کارگاهی.
          </p>
        </div>
      </div>
    </div>
  );
}
