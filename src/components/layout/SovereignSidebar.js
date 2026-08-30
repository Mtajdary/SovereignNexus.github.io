import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Target, HardHat, Eye, Lock, Flame, 
  BookOpen, User, X, ChevronLeft 
} from 'lucide-react';
import { liveSynth } from '../../core/audio/BinauralEngine';

export const NAV_ITEMS = [
  { path: '/', label: 'فرماندهی', desc: 'داشبورد و پایش عصبی', icon: LayoutDashboard },
  { path: '/matrix', label: 'ماتریس', desc: 'تفکر اهرمی ۸۰/۲۰', icon: Target },
  { path: '/civil', label: 'عمران', desc: 'محاسبات خاک، بتن و احجام', icon: HardHat },
  { path: '/vision', label: 'بینایی AI', desc: 'تحلیل ماتریس ترک‌های سازه', icon: Eye },
  { path: '/vault', label: 'گاوصندوق', desc: 'اسناد و یادداشت‌های AES-GCM', icon: Lock },
  { path: '/focus', label: 'تمرکز', desc: 'چرخه‌های اولترادین و غرقگی', icon: Flame },
  { path: '/journal', label: 'ژورنال', desc: 'ثبت بصیرت‌های روزانه', icon: BookOpen },
  { path: '/profile', label: 'معمار', desc: 'پروفایل و خروجی پشتیبان', icon: User }
];

export const SovereignSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* لایه پشت صحنه برای بستن با کلیک بیرون در دسکتاپ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="hidden md:block fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
          />

          {/* بدنه سایدبار متحرک از سمت راست در دسکتاپ */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 240 }}
            className="hidden md:flex fixed top-0 right-0 bottom-0 z-50 w-64 glass border-l border-gold/25 flex-col justify-between p-5 shadow-[0_0_40px_rgba(0,0,0,0.7)] text-right"
            dir="rtl"
          >
            <div className="space-y-4">
              {/* هدر سایدبار با دکمه بستن */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center">
                    <span className="brand-title text-gold font-black text-xs">PC</span>
                  </div>
                  <span className="brand-title text-xs tracking-widest font-black gold-text uppercase">
                    SYSTEM MENU
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                  title="بستن منو"
                  aria-label="بستن منو"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* لیست لینک‌های ماژول‌ها */}
              <nav className="space-y-1.5">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        liveSynth.playClickSfx();
                        onClose();
                      }}
                      className={`flex items-center justify-between p-2.5 rounded-xl transition-all group ${
                        isActive
                          ? 'bg-gold text-black font-bold shadow-[0_0_12px_rgba(212,175,55,0.35)]'
                          : 'glass border-white/5 text-white/70 hover:text-white hover:border-gold/30'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded-lg ${isActive ? 'bg-black/15 text-black' : 'text-gold'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className={`text-xs block ${isActive ? 'text-black font-black' : 'font-bold text-white'}`}>
                            {item.label}
                          </span>
                          <span className={`text-[9px] block ${isActive ? 'text-black/70' : 'text-white/40'}`}>
                            {item.desc}
                          </span>
                        </div>
                      </div>
                      <ChevronLeft className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-white/20 group-hover:-translate-x-0.5 transition-transform'}`} />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* فوتر سایدبار */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span className="text-emerald-400">● ONLINE</span>
              <span>PRIME CROWN © 2026</span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
