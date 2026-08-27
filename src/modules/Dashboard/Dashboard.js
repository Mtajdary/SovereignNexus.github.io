import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, HardHat, Cpu, Eye, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-16 pb-20 flex flex-col items-center text-center">
      {/* برچسب آزمایشی بالای تیتر */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-semibold mb-6 shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
        <span>Sovereign Intelligence Architecture</span>
      </motion.div>

      {/* عنوان اصلی بزرگ مشابه سبک PLAY WITH PUTTY */}
      <motion.h1 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-5xl md:text-8xl font-black text-gray-900 tracking-tight leading-none mb-6 uppercase"
      >
        PRIME <span className="underline decoration-emerald-400 decoration-wavy decoration-2">CROWN</span>
      </motion.h1>

      {/* زیرعنوان تعاملی */}
      <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
        The unified command engine for <span className="px-2 py-0.5 rounded-md bg-emerald-300/60 font-bold text-gray-900">Infrastructure Engineering</span> & <span className="px-2 py-0.5 rounded-md bg-cyan-300/60 font-bold text-gray-900">Computer Vision AI</span>
      </p>

      {/* دکمه‌های کپسولی اکشن با افکت جهش */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-gray-950 font-black text-sm tracking-wide shadow-[0_8px_20px_rgba(52,211,153,0.35)] transition-all flex items-center gap-2"
        >
          <span>ورود به اتاق فرمان</span>
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-7 py-3.5 rounded-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-bold text-sm shadow-sm transition-all"
        >
          مشاهده سوابق و پرونده معمار
        </motion.button>
      </div>

      {/* کارت‌های تعاملی ویژگی‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-right">
        <motion.div 
          whileHover={{ y: -6 }}
          className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.04)] space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
            <HardHat className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">نظارت زیرساخت و راه‌سازی</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            مدیریت میدانی عملیات خاکی، تراکم ژئوتکنیک و تطبیق استانداردها با مستندسازی هوشمند.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -6 }}
          className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.04)] space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-600">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">پایش هوشمند سلامت سازه</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            تشخیص خودکار ترک بتن و استخراج داده با شبکه‌های عصبی PyTorch.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -6 }}
          className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.04)] space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">سامانه‌های مستقل وب و PWA</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            اجرای بدون مکث در تمام پلتفرم‌ها با کش آفلاین و هماهنگی بلادرنگ.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
