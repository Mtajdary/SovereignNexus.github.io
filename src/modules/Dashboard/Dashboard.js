import React from 'react';
import { motion } from 'framer-motion';
import { HardHat, Cpu, Eye, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';

export default function Dashboard({ onNavigate }) {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-10 pb-20 text-center" dir="rtl">
      {/* نشان تگ بالای تیتر */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold mb-6">
        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
        <span>پلتفرم تخصصی مهندسی عمران، هوش مصنوعی و نرم‌افزار</span>
      </div>

      {/* عنوان اصلی بزرگ */}
      <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-4">
        خلق سیستم‌های پایدار؛ از بتن تا الگوریتم
      </h1>

      {/* بیوگرافی منسجم و گویا */}
      <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
        سلام، من <strong className="text-gray-900 font-bold">محمد تاجداری</strong> هستم. فعالیت من در تقاطع مهندسی عمران (نظارت پروژه‌های زیرساخت و راه‌سازی)، پژوهش در بینایی ماشین و هوش مصنوعی (پایش سلامت سازه) و معماری وب‌اپلیکیشن‌های کاربردی تمرکز دارد.
      </p>

      {/* دکمه‌های کپسولی */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14 w-full max-w-xs sm:max-w-none mx-auto">
        <motion.button 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onNavigate('projects')}
          className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-xs sm:text-sm shadow-[0_4px_16px_rgba(34,197,94,0.3)] transition-all flex items-center justify-center gap-2"
        >
          <span>مشاهده پروژه‌ها و مقالات فنی</span>
          <ArrowLeft className="w-4 h-4" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onNavigate('profile')}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-bold text-xs sm:text-sm shadow-xs transition-all"
        >
          سوابق تحصیلی و تخصصی
        </motion.button>
      </div>

      {/* ۳ ستون مهارتی واضح و شفاف */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-right">
        <div 
          onClick={() => onNavigate('profile')}
          className="p-5 rounded-3xl bg-white border border-gray-200 shadow-xs hover:border-amber-400 transition-all cursor-pointer space-y-2.5"
        >
          <div className="w-9 h-9 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
            <HardHat className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-gray-900 text-sm">نظارت و مدیریت پروژه‌های عمرانی</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            نظارت مقیم بر عملیات خاکی، آماده‌سازی بستر، تراکم خاک و اجرای استانداردهای راه‌سازی.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('projects')}
          className="p-5 rounded-3xl bg-white border border-gray-200 shadow-xs hover:border-sky-400 transition-all cursor-pointer space-y-2.5"
        >
          <div className="w-9 h-9 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
            <Eye className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-gray-900 text-sm">هوش مصنوعی و پردازش تصویر (SHM)</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            تشخیص خودکار و طبقه‌بندی ترک‌های بتن با شبکه‌های عصبی عمیق در پایتورچ.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('projects')}
          className="p-5 rounded-3xl bg-white border border-gray-200 shadow-xs hover:border-emerald-400 transition-all cursor-pointer space-y-2.5"
        >
          <div className="w-9 h-9 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <Cpu className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-gray-900 text-sm">توسعه وب‌اپلیکیشن و PWA</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            توسعه سیستم‌های مهندسی نظیر همراه ناظر با قابلیت اجرای روان آفلاین در محیط‌های کارگاهی.
          </p>
        </div>
      </div>
    </div>
  );
}
