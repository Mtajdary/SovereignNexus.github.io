import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, Volume2, VolumeX, Sun, Moon, LayoutDashboard, Lock, Flame, BookOpen, User, HardHat, Eye, Target } from 'lucide-react';
import { useSovereign } from '../../context/SovereignContext';
import { liveSynth } from '../../core/audio/BinauralEngine';

const NAV_ITEMS = [
  { path: '/', label: 'فرماندهی', icon: LayoutDashboard },
  { path: '/matrix', label: 'ماتریس ۸۰/۲۰', icon: Target },
  { path: '/civil', label: 'عمران', icon: HardHat },
  { path: '/vision', label: 'بینایی AI', icon: Eye },
  { path: '/vault', label: 'گاوصندوق', icon: Lock },
  { path: '/focus', label: 'تمرکز', icon: Flame },
  { path: '/journal', label: 'ژورنال', icon: BookOpen },
  { path: '/profile', label: 'معمار', icon: User }
];

const SovereignHeader = () => {
  const location = useLocation();
  const { coins, theme, toggleTheme, isAudioPlaying, toggleAudio, soundMode } = useSovereign();

  const handleSoundToggle = () => {
    liveSynth.playClickSfx();
    if (isAudioPlaying) {
      liveSynth.stop();
      toggleAudio();
    } else {
      liveSynth.start('gamma');
      toggleAudio();
    }
  };

  const handleThemeToggle = () => {
    liveSynth.playClickSfx();
    toggleTheme();
  };

  return (
    <>
      {/* 1. هدر اصلی (مخصوص دسکتاپ و موبایل) */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-gold/15 px-4 sm:px-6 lg:px-10 py-3 flex justify-between items-center transition-all">
        {/* برند و لوگو */}
        <Link
          to="/"
          onClick={() => liveSynth.playClickSfx()}
          className="flex items-center cursor-pointer shrink-0"
        >
          <span className="brand-title text-base sm:text-lg tracking-[0.2em] font-bold gold-text uppercase">
            PRIME CROWN
          </span>
        </Link>

        {/* 2. منوی افقی دسکتاپ (کاملاً فعال در رایانه / مخفی در موبایل) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_ITEMS.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                onClick={() => liveSynth.playClickSfx()}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-black bg-gold font-bold shadow-[0_0_12px_rgba(212,175,55,0.4)] scale-105'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-gold'}`} />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* دکمه‌های کنترلی سمت چپ */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* دکمه تغییر تم روز / شب */}
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-xl glass border border-gold/20 text-gold hover:border-gold/40 transition-all active:scale-95"
            title={theme === 'dark' ? 'تغییر به حالت روز' : 'تغییر به حالت شب'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-amber-600" />
            )}
          </button>

          {/* کلید فرکانس‌های مغزی */}
          <button
            onClick={handleSoundToggle}
            className={`p-2 sm:px-2.5 sm:py-1.5 rounded-xl border text-[10px] font-mono transition-all flex items-center gap-1.5 active:scale-95 ${
              isAudioPlaying
                ? 'border-gold bg-gold/10 text-gold shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                : 'glass border-white/10 text-white/40 hover:text-white'
            }`}
            title="تولید زنده امواج مغزی (Binaural Beats DSP)"
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4 text-gold animate-bounce" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{isAudioPlaying ? soundMode : 'امواج'}</span>
          </button>

          {/* سکه‌های حاکمیتی */}
          <div className="flex items-center gap-1.5 glass border border-gold/20 px-2.5 py-1.5 rounded-xl">
            <Wallet className="w-3.5 h-3.5 text-gold" />
            <span className="font-mono text-xs font-bold gold-text">{coins.toLocaleString()} SC</span>
          </div>
        </div>
      </header>

      {/* 3. منوی شناور پایین (صرفاً در موبایل فعال است و در دسکتاپ 100% مخفی می‌شود: md:hidden) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t border-white/10 px-2 py-1.5 flex items-center justify-between overflow-x-auto no-scrollbar gap-1">
        {NAV_ITEMS.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              onClick={() => liveSynth.playClickSfx()}
              className={`flex flex-col items-center justify-center py-1 px-2.5 min-w-[56px] shrink-0 transition-all ${
                isActive ? 'text-gold font-bold scale-105' : 'text-white/40 hover:text-white/70'
              }`}
            >
              <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]' : 'text-white/40'}`} />
              <span className="text-[9px] tracking-tight whitespace-nowrap">{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default SovereignHeader;
