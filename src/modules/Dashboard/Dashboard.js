import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, HardHat, Cpu, Eye } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-12 pb-20 flex flex-col items-center text-center">
      {/* نشان تگ بالای تیتر */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs font-semibold mb-6">
        <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
        <span>Sovereign Intelligence Architecture</span>
      </div>

      {/* تیتر اصلی فوق‌العاده بولد و مدرن مشابه PLAY WITH PUTTY */}
      <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-none mb-6">
        PRIME CROWN
      </h1>

      {/* توضیح با برچسب‌های رنگی دقیق */}
      <p className="text-sm md:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed mb-8">
        The unified command engine for{' '}
        <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold border border-emerald-200 text-xs md:text-sm">
          Infrastructure Engineering
        </span>{' '}
        &amp;{' '}
        <span className="inline-block px-2 py-0.5 rounded-md bg-sky-100 text-sky-900 font-bold border border-sky-200 text-xs md:text-sm">
          Computer Vision AI
        </span>
      </p>

      {/* دکمه کپسولی سبز فسفری مشابه دکمه Join the Waitlist */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 w-full max-w-xs sm:max-w-none">
        <motion.button 
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-sm shadow-[0_4px_16px_rgba(34,197,94,0.35)] transition-all"
        >
          ورود به اتاق فرمان
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-bold text-sm shadow-sm transition-all"
        >
          مشاهده پرونده معمار
        </motion.button>
      </div>

      {/* کارت‌های ۳گانه با چیدمان کاملاً ریسپانسیو و متوازن */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full text-right" dir="rtl">
        <div className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <HardHat className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-sm">نظارت زیرساخت و راه‌سازی</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            مدیریت میدانی عملیات خاکی، تراکم ژئوتکنیک و تطبیق استانداردها با مستندسازی هوشمند.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-sm">پایش هوشمند سلامت سازه</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            تشخیص خودکار ترک بتن و استخراج داده با شبکه‌های عصبی عمیق PyTorch.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-sm">سامانه‌های مستقل وب و PWA</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            اجرای پایدار در تمام پلتفرم‌ها با عملکرد آفلاین و معماری سبک.
          </p>
        </div>
      </div>
    </div>
  );
}
