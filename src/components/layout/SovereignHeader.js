import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, Menu, X, Home, Calculator, Eye, Activity, 
  HardHat, FileText, Gauge, BookOpen, User, Send, BookMarked, Sparkles
} from 'lucide-react';

export default function SovereignHeader({ currentModule, onModuleChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'صفحه اصلی', icon: Home, badge: 'پورتفولیو' },
    { id: 'civil-tools', label: 'محاسبات ژئوتکنیک و بتن', icon: Calculator, badge: 'ابزار مهندسی' },
    { id: 'structural-sim', label: 'شبیه‌ساز تنش سازه', icon: Activity, badge: 'تحلیلی' },
    { id: 'ai-lab', label: 'بینایی ماشین و پایش ترک', icon: Eye, badge: 'هوش مصنوعی' },
    { id: 'site-command', label: 'پایش شرایط کارگاه', icon: HardHat, badge: 'مدیریت میدانی' },
    { id: 'daily-report', label: 'گزارش‌ساز روزانه', icon: FileText, badge: 'مستندسازی' },
    { id: 'performance', label: 'پایش عملکرد سیستم', icon: Gauge, badge: 'تله‌متری' },
    { id: 'knowledge', label: 'پایگاه دانش و نشریه ۱۰۱', icon: BookOpen, badge: 'استانداردها' },
    { id: 'projects', label: 'پروژه‌ها و مقالات', icon: BookMarked, badge: 'سوابق فنی' },
    { id: 'profile', label: 'درباره من و مهارت‌ها', icon: User, badge: 'رزومه' },
    { id: 'contact', label: 'تماس و استعلام پروژه', icon: Send, badge: 'ارتباط مستقیم' },
  ];

  const handleSelect = (id) => {
    onModuleChange(id);
    setIsOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 glass-panel border-b border-white/60 px-4 sm:px-8 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3" dir="rtl">
          {/* لوگو و عنوان هویت مهندسی */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer shrink-0 group"
            onClick={() => handleSelect('dashboard')}
          >
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Crown className="w-4 h-4" />
            </div>
            <div className="flex flex-col text-right">
              <span className="font-black text-sm tracking-tight text-slate-900">
                محمد تاجداری
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                Civil &amp; AI Engineering
              </span>
            </div>
          </div>

          {/* ناوبری دسکتاپ (دکمه‌های کپسولی شیشه‌ای) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-200/60 p-1.5 rounded-full border border-white/80 shadow-inner">
            {navItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = currentModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm scale-105'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/70'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* دکمه منوی همبرگری برای موبایل و باز کردن کل ابزارها */}
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-md hover:bg-black transition-all"
          >
            <Menu className="w-4 h-4 text-emerald-400" />
            <span>فهرست کل ابزارها</span>
          </button>
        </div>
      </header>

      {/* منوی کشویی ساندویچی تمام‌صفحه و بلور شده */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* لایه تیره پشت منو */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm"
            />

            {/* منوی کشویی از راست */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm z-50 bg-white/95 backdrop-blur-2xl border-l border-white/80 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto text-right font-sans"
              dir="rtl"
            >
              <div className="space-y-6">
                {/* هدر کشو */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                      <Crown className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-slate-900">سامانه فرماندهی مهندسی</h3>
                      <span className="text-[10px] text-slate-400 font-mono">PRIME CROWN SYSTEM</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* لیست تمام ماژول‌ها و ابزارها */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 px-2 block uppercase font-mono">
                    ALL PLATFORM MODULES (10+ SUITES)
                  </span>

                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentModule === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item.id)}
                        className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                          isActive
                            ? 'bg-slate-900 text-white shadow-md'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl ${
                            isActive ? 'bg-white/10 text-emerald-400' : 'bg-slate-100 text-slate-600'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-xs">{item.label}</span>
                        </div>

                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {item.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* فوتر منوی کشویی */}
              <div className="pt-6 border-t border-slate-100 text-center">
                <span className="text-[10px] text-slate-400 font-mono">
                  PRIME CROWN &bull; ARCHITECT MOHAMMAD TAJDARI
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
