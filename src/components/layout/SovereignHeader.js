import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Wallet, Volume2, VolumeX, Sun, Moon, 
  LayoutDashboard, Lock, Flame, BookOpen, User, 
  HardHat, Eye, Target 
} from 'lucide-react';
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
      {/* ۱. هدر بالای صفحه */}
      <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-gold/15 px-3 sm:px-6 md:px-8 py-2.5 flex justify-between items-center transition-colors">
        {/* راست: لوگوی سیستم */}
        <Link
          to="/"
          onClick={() => liveSynth.playClickSfx()}
          className="flex items-center cursor-pointer shrink-0"
        >
          <span className="brand-title text-base sm:text-lg tracking-[0.2em] font-black gold-text uppercase">
            PRIME CROWN
          </span>
        </Link>

        {/* مرکز: منوی دسکتاپ (در دسکتاپ تمیز و متوازن / در موبایل ۱۰۰٪ مخفی) */}
        <nav className="hidden md:flex items-center gap-1 glass p-1 rounded-2xl border border-white/10">
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
                    ? 'text-black bg-gold font-bold shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-gold'}`} />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* چپ: دکمه‌های کنترل */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
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

          <button
            onClick={handleSoundToggle}
            className={`p-2 sm:px-2.5 sm:py-1.5 rounded-xl border text-[10px] font-mono transition-all flex items-center gap-1.5 active:scale-95 ${
              isAudioPlaying
                ? 'border-gold bg-gold/10 text-gold shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                : 'glass border-white/10 text-white/40 hover:text-white'
            }`}
            title="امواج مغزی"
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4 text-gold animate-bounce" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline font-medium">{isAudioPlaying ? soundMode : 'امواج'}</span>
          </button>

          <div className="flex items-center gap-1.5 glass border border-gold/20 px-2.5 py-1.5 rounded-xl">
            <Wallet className="w-3.5 h-3.5 text-gold" />
            <span className="font-mono text-xs font-bold gold-text">{coins.toLocaleString()} SC</span>
          </div>
        </div>
      </header>

      {/* ۲. نوار پایینی موبایل: پرسرعت، سبک و بدون لگ */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t border-gold/20 px-1.5 py-1 flex items-center justify-between overflow-x-auto no-scrollbar gap-1 shadow-[0_-8px_20px_rgba(0,0,0,0.25)]">
        {NAV_ITEMS.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              onClick={() => liveSynth.playClickSfx()}
              className={`flex flex-col items-center justify-center py-1 px-2.5 min-w-[58px] shrink-0 rounded-xl transition-all ${
                isActive
                  ? 'text-gold font-black bg-gold/10 border border-gold/30'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]' : 'text-white/50'}`} />
              <span className="text-[10px] tracking-tight whitespace-nowrap">{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default SovereignHeader;
