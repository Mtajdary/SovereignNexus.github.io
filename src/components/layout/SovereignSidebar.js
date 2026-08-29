import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Target, HardHat, Eye, Lock, Flame, 
  BookOpen, User 
} from 'lucide-react';
import { liveSynth } from '../../core/audio/BinauralEngine';

export const NAV_ITEMS = [
  { path: '/', label: 'فرماندهی', icon: LayoutDashboard },
  { path: '/matrix', label: 'ماتریس', icon: Target },
  { path: '/civil', label: 'عمران', icon: HardHat },
  { path: '/vision', label: 'بینایی AI', icon: Eye },
  { path: '/vault', label: 'گاوصندوق', icon: Lock },
  { path: '/focus', label: 'تمرکز', icon: Flame },
  { path: '/journal', label: 'ژورنال', icon: BookOpen },
  { path: '/profile', label: 'معمار', icon: User }
];

export const SovereignSidebar = () => {
  const location = useLocation();

  return (
    // مخفی در موبایل (hidden) و ظاهر شدن فقط در دسکتاپ (md:flex)
    <aside className="hidden md:flex fixed top-0 right-0 bottom-0 z-40 w-16 md:w-20 glass border-l border-gold/20 flex-col items-center py-5 justify-between select-none">
      {/* نشان لوگو */}
      <Link
        to="/"
        onClick={() => liveSynth.playClickSfx()}
        className="w-10 h-10 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center hover:scale-105 transition-transform"
        title="PRIME CROWN"
      >
        <span className="brand-title text-gold font-black text-xs">PC</span>
      </Link>

      {/* لیست آیکون‌های عمودی */}
      <nav className="flex flex-col items-center gap-2.5 my-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => liveSynth.playClickSfx()}
              className={`p-2.5 rounded-2xl transition-all flex items-center justify-center ${
                isActive
                  ? 'bg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              title={item.label}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-black' : 'text-gold'}`} />
            </Link>
          );
        })}
      </nav>

      {/* وضعیت سیستم */}
      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" title="SYS: ONLINE" />
    </aside>
  );
};
