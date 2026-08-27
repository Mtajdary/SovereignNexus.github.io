import React from 'react';
import { motion } from 'framer-motion';
import { HardHat, Cpu, Eye, ArrowLeft, Sparkles, Activity, Calculator, FileText, CheckCircle2 } from 'lucide-react';

export default function Dashboard({ onNavigate }) {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-8 pb-20 text-center" dir="rtl">
      {/* بج بالا */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-300 text-emerald-900 text-xs font-bold mb-6 shadow-xs backdrop-blur-md"
      >
        <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
        <span>پلتفرم تخصصی مهندسی عمران، بینایی ماشین و هوش مصنوعی</span>
      </motion.div>

      {/* عنوان فوق‌العاده بزرگ با فونت وزیرمتن */}
      <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-5">
        خلق سیستم‌های پایدار؛ <br className="hidden sm:inline" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600">
          از بتن تا الگوریتم‌های هوشمند
        </span>
      </h1>

      {/* متن معرفی منسجم */}
      <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
        سلام، من <strong className="text-slate-900 font-bold">محمد تاجداری</strong> هستم. فعالیت‌های من بر تقاطع نظارت مقیم بر پروژه‌های زیرساخت و راه‌سازی، پژوهش‌های بینایی ماشین در پایش سلامت سازه (SHM) و معماری نرم‌افزارهای خودگردان تمرکز دارد.
      </p>

      {/* دکمه‌های کپسولی شکیل با افکت جهش */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14 w-full max-w-xs sm:max-w-none mx-auto">
        <motion.button 
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onNavigate('projects')}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-xs sm:text-sm shadow-[0_8px_20px_rgba(34,197,94,0.35)] transition-all flex items-center justify-center gap-2"
        >
          <span>مشاهده پروژه‌ها و مقالات فنی</span>
          <ArrowLeft className="w-4 h-4" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onNavigate('profile')}
          className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300/80 text-slate-800 font-bold text-xs sm:text-sm shadow-xs transition-all"
        >
          سوابق تحصیلی و کارنامه معمار
        </motion.button>
      </div>

      {/* کارت‌های ۳ گانه با استایل شیشه‌ای و آیکون‌های درخشان */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-right">
        <motion.div 
          whileHover={{ y: -6 }}
          onClick={() => onNavigate('civil-tools')}
          className="p-6 rounded-3xl glass-panel hover:border-amber-400/80 transition-all cursor-pointer space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl glass-icon border border-amber-200/60 flex items-center justify-center text-amber-600 shadow-sm">
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
          className="p-6 rounded-3xl glass-panel hover:border-sky-400/80 transition-all cursor-pointer space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl glass-icon border border-sky-200/60 flex items-center justify-center text-sky-600 shadow-sm">
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
          className="p-6 rounded-3xl glass-panel hover:border-emerald-400/80 transition-all cursor-pointer space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl glass-icon border border-emerald-200/60 flex items-center justify-center text-emerald-600 shadow-sm">
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
