import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Target, HardHat, Eye, Lock, Flame, 
  BookOpen, User, ChevronRight, ChevronLeft, ShieldCheck, Activity 
} from 'lucide-react';
import { liveSynth } from '../../core/audio/BinauralEngine';

export const NAV_ITEMS = [
  { path: '/', label: 'فرماندهی', desc: 'داشبورد و پایش عصبی', icon: LayoutDashboard },
  { path: '/matrix', label: 'ماتریس ۸۰/۲۰', desc: 'تفکر اهرمی و اولویت‌بندی', icon: Target },
  { path: '/civil', label: 'عمران', desc: 'محاسبات خاک، بتن و احجام', icon: HardHat },
  { path: '/vision', label: 'بینایی AI', desc: 'تحلیل ماتریس ترک‌های سازه', icon: Eye },
  { path: '/vault', label: 'گاوصندوق', desc: 'اسناد و یادداشت‌های AES-GCM', icon: Lock },
  { path: '/focus', label: 'تمرکز عمیق', desc: 'چرخه‌های اولترادین و غرقگی', icon: Flame },
  { path: '/journal', label: 'ژورنال', desc: 'ثبت بصیرت‌های روزانه', icon: BookOpen },
  { path: '/profile', label: 'معمار', desc: 'پروفایل و خروجی پشتیبان', icon: User }
];

export const SovereignSidebar = ({ isMobileOpen, onCloseMobile }) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLinkClick = () => {
    liveSynth.playClickSfx();
    if (onCloseMobile) onCloseMobile();
  };

  const sidebarContent = (isMobile = false) => (
    <div className="h-full flex flex-col justify-between py-5 px-3 text-right" dir="rtl">
      {/* بخش بالا: لوگوی سیستم و وضعیت */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2 pb-3 border-b border-white/10">
          <Link
            to="/"
            onClick={handleLinkClick}
            className="flex items-center gap-2 cursor-pointer overflow-hidden"
          >
            <div className="w-8 h-8 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center shrink-0">
              <span className="brand-title text-gold font-black text-sm">PC</span>
            </div>
            {(isExpanded || isMobile) && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="brand-title text-sm tracking-widest font-black gold-text uppercase whitespace-nowrap"
              >
                PRIME CROWN
              </motion.span>
            )}
          </Link>

          {!isMobile && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-lg text-white/40 hover:text-gold hover:bg-white/5 transition-colors hidden md:block"
              title={isExpanded ? 'جمع کردن سایدبار' : 'باز کردن سایدبار'}
            >
              {isExpanded ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* لیست آیتم‌های ناوبری به سبک IDE */}
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleLinkClick}
                className={`relative flex items-center gap-3 p-2.5 rounded-2xl transition-all group ${
                  isActive
                    ? 'bg-gold text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.35)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                title={!isExpanded && !isMobile ? item.label : undefined}
              >
                {/* نشانگر خط طلایی سمت راست برای آیتم فعال */}
                {isActive && (
                  <motion.div
                    layoutId="activeSideIndicator"
                    className="absolute right-0 top-2 bottom-2 w-1 rounded-l-full bg-gold-dark"
                  />
                )}

                <div className={`p-1.5 rounded-xl shrink-0 ${isActive ? 'bg-black/15 text-black' : 'text-gold group-hover:scale-110 transition-transform'}`}>
                  <Icon className="w-5 h-5" />
                </div>

                {(isExpanded || isMobile) && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    <span className={`text-xs block ${isActive ? 'text-black font-black' : 'font-bold text-white'}`}>
                      {item.label}
                    </span>
                    <span className={`text-[10px] block truncate max-w-[140px] ${isActive ? 'text-black/75 font-medium' : 'text-white/40'}`}>
                      {item.desc}
                    </span>
                  </motion.div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* بخش پایین: نشانگر وضعیت هسته سامانه */}
      <div className="pt-4 border-t border-white/10 px-2 space-y-1">
        <div className="flex items-center gap-2 text-[10px] font-mono text-white/40">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" />
          {(isExpanded || isMobile) && (
            <span className="truncate">SYS: ONLINE</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ۱. سایدبار دسکتاپ (ثابت در سمت راست صفحه) */}
      <aside
        className={`hidden md:block fixed top-0 right-0 bottom-0 z-40 glass border-l border-gold/20 transition-all duration-300 ${
          isExpanded ? 'w-60' : 'w-20'
        }`}
      >
        {sidebarContent(false)}
      </aside>

      {/* ۲. سایدبار کشویی موبایل */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 glass border-l border-gold/25 md:hidden shadow-[0_0_40px_rgba(0,0,0,0.8)]"
            >
              {sidebarContent(true)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
