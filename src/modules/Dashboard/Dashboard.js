import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Flame, HardHat, Eye, Lock, BookOpen, ArrowLeft, Zap, CheckCircle2 } from 'lucide-react';
import { useSovereign } from '../../context/SovereignContext';
import { liveSynth } from '../../core/audio/BinauralEngine';

const QUICK_ACTIONS = [
  { path: '/focus', title: 'شروع یک بازه تمرکز', desc: 'تایمر ۲۵ یا ۵۰ دقیقه‌ای کار عمیق با پخش صدای تمرکز', icon: Flame, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  { path: '/matrix', title: 'اولویت‌بندی کارهای امروز', desc: 'جداسازی ۲۰٪ کارهای اصلی از تسک‌های کم‌ارزش', icon: Target, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  { path: '/civil', title: 'محاسبات سریع کارگاهی', desc: 'بررسی درصد تراکم خاک، مقاومت بتن و شیب‌بندی', icon: HardHat, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  { path: '/vision', title: 'تحلیل عکس ترک بتن', desc: 'تشخیص فوری لبه‌ها و شدت ترک با پردازش تصویر', icon: Eye, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' }
];

const Dashboard = () => {
  const { coins } = useSovereign();

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* پیام خوش‌آمد و معرفی کوتاه */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-gold/20 relative overflow-hidden">
        <div className="max-w-2xl">
          <span className="text-gold text-xs font-mono font-bold block mb-2 tracking-wider">میز کار دیجیتال | نسخه شخصی</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            فضای کار روی <span className="gold-text">تمرکز، مهندسی و پروژه‌ها</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
            اینجا جعبه‌ابزار شخصی شماست؛ از تایمر کار عمیق و دسته‌بندی هوشمند تسک‌ها گرفته تا محاسبات سریع کارگاهی و بررسی عکس‌های سازه با هوش مصنوعی.
          </p>
        </div>
      </div>

      {/* دسترسی‌های سریع و کاربردی */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.path}
              to={action.path}
              onClick={() => liveSynth.playClickSfx()}
              className="glass p-5 rounded-2xl border border-white/10 hover:border-gold/30 transition-all flex items-start justify-between group"
            >
              <div className="flex items-start gap-3.5">
                <div className={`p-3 rounded-xl border ${action.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-gold transition-colors mb-1">
                    {action.title}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed">
                    {action.desc}
                  </p>
                </div>
              </div>
              <ArrowLeft className="w-4 h-4 text-white/20 group-hover:text-gold group-hover:-translate-x-1 transition-all mt-1" />
            </Link>
          );
        })}
      </div>

      {/* ۳ اصل راهنمای کار روزانه */}
      <div className="glass p-6 rounded-3xl border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-gold" />
          اصول ساده برای نتیجه بهتر:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-1">
            <span className="text-xs font-bold text-gold block">۱. فقط یک کار اصلی در روز</span>
            <p className="text-[11px] text-white/60 leading-relaxed">تسک با بالاترین اولویت را انتخاب کنید و تا تمام نشده سراغ کار دیگر نروید.</p>
          </div>
          <div className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-1">
            <span className="text-xs font-bold text-gold block">۲. دوره‌های تمرکز پیوسته</span>
            <p className="text-[11px] text-white/60 leading-relaxed">حداقل ۲ بازه ۴۵ دقیقه‌ای بدون نگاه کردن به گوشی یا چک کردن پیام‌ها کار کنید.</p>
          </div>
          <div className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-1">
            <span className="text-xs font-bold text-gold block">۳. ثبت تجربه و درس‌ها</span>
            <p className="text-[11px] text-white/60 leading-relaxed">در پایان روز چالش‌ها و نتایج را در بخش ژورنال کوتاه و ساده بنویسید.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
