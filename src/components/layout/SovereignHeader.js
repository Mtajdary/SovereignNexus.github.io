import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, Volume2, VolumeX, Sun, Moon, LayoutDashboard, Lock, Flame, BookOpen, User, HardHat, Eye, Target } from 'lucide-react';
import { useSovereign } from '../../context/SovereignContext';
import { liveSynth } from '../../core/audio/BinauralEngine';

const NAV_ITEMS = [
  { path: '/', label: 'فرماندهی', icon: LayoutDashboard },
  { path: '/matrix', label: 'ماتریس', icon: Target },
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
  const [hoveredTab, setHoveredTab] = useState(null);

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
      {/* 1. هدر مینیمال و خلوت بالای صفحه */}
      <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-gold/15 px-4 sm:px-8 py-3 flex justify-between items-center transition-all">
        {/* نشان برند */}
        <Link
          to="/"
          onClick={() => liveSynth.playClickSfx()}
          className="flex items-center cursor-pointer"
        >
          <span className="brand-title text-base sm:text-xl tracking-[0.25em] font-bold gold-text uppercase">
            PRIME CROWN
          </span>
        </Link>

        {/* جعبه ابزارهای کنترلی */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* دکمه تم روز / شب */}
          <button
            onClick={handleThemeToggle}
            className="p-2 sm:p-2.5 rounded-xl glass border border-gold/20 text-gold hover:border-gold/50 transition-all active:scale-95 shadow-sm"
            title={theme === 'dark' ? 'تغییر به حالت روز' : 'تغییر به حالت شب'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-amber-600" />
            )}
          </button>

          {/* کلید سنتز امواج صوتی */}
          <button
            onClick={handleSoundToggle}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl border text-[11px] font-mono transition-all flex items-center gap-2 active:scale-95 ${
              isAudioPlaying
                ? 'border-gold bg-gold/15 text-gold shadow-[0_0_12px_rgba(212,175,55,0.35)]'
                : 'glass border-white/10 text-white/50 hover:text-white'
            }`}
            title="تولید زنده امواج مغزی (Web Audio DSP)"
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4 text-gold animate-bounce" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline font-bold">{isAudioPlaying ? soundMode : 'امواج مغزی'}</span>
          </button>

          {/* کیف سکه‌های حاکمیتی */}
          <div className="flex items-center gap-2 glass border border-gold/30 px-3 py-1.5 sm:py-2 rounded-xl shadow-sm">
            <Wallet className="w-4 h-4 text-gold" />
            <span className="font-mono text-xs sm:text-sm font-black gold-text">{coins.toLocaleString()} SC</span>
          </div>
        </div>
      </header>

      {/* 2. داک کپسولی شناور پایین (macOS / iPad Floating Dock) */}
      <div className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 px-2 w-full max-w-fit">
        <nav className="glass rounded-2xl sm:rounded-full px-2 sm:px-4 py-2 flex items-center justify-center gap-1 sm:gap-2 shadow-[0_15px_40px_rgba(0,0,0,0.45)] border border-gold/30 backdrop-blur-2xl">
          {NAV_ITEMS.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.path;
            const isHovered = hoveredTab === tab.path;

            return (
              <Link
                key={tab.path}
                to={tab.path}
                onMouseEnter={() => setHoveredTab(tab.path)}
                onMouseLeave={() => setHoveredTab(null)}
                onClick={() => liveSynth.playClickSfx()}
                className="relative group outline-none"
              >
                <motion.div
                  whileHover={{ scale: 1.12, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className={`flex flex-col items-center justify-center px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl transition-all ${
                    isActive
                      ? 'bg-gold text-black shadow-[0_0_16px_rgba(212,175,55,0.45)] font-bold'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 mb-0.5 ${isActive ? 'text-black' : 'text-gold'}`} />
                  <span className={`text-[9px] sm:text-[10px] tracking-tight whitespace-nowrap ${isActive ? 'text-black font-black' : 'font-medium'}`}>
                    {tab.label}
                  </span>
                </motion.div>

                {/* نشانگر فعال بودن (نقطه درخشان در زیر آیکون) */}
                {isActive && (
                  <motion.div
                    layoutId="activeDockIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_6px_#D4AF37]"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default SovereignHeader;
