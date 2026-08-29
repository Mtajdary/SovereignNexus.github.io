import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Wallet, Volume2, VolumeX, Sun, Moon, Download } from 'lucide-react';
import { useSovereign } from '../../context/SovereignContext';
import { liveSynth } from '../../core/audio/BinauralEngine';
import { NAV_ITEMS } from './SovereignSidebar';

// لوگوی اصیل و همگون تاج طلایی
const SovereignCrownLogo = () => (
  <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 100 100" className="w-7 h-7 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
      <defs>
        <linearGradient id="headerGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="80%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
      </defs>
      
      {/* فرم هندسی و لوکس تاج */}
      <path 
        d="M20 70 L28 42 L42 56 L50 28 L58 56 L72 42 L80 70 Z" 
        fill="url(#headerGoldGrad)" 
        stroke="#FFF"
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />
      
      {/* پایه تاج */}
      <rect x="20" y="73" width="60" height="6" rx="3" fill="url(#headerGoldGrad)" />

      {/* جرقه ۴‌پر بر فراز قله تاج */}
      <path 
        d="M50 16 C50 20 48 22 44 22 C48 22 50 24 50 28 C50 24 52 22 56 22 C52 22 50 20 50 16 Z" 
        fill="#FFFFFF" 
      />
    </svg>
    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse opacity-80" />
  </div>
);

const SovereignHeader = ({ onToggleSidebar }) => {
  const location = useLocation();
  const { coins, theme, toggleTheme, isAudioPlaying, toggleAudio, soundMode } = useSovereign();
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setDeferredPrompt(null);
  };

  const handleSoundToggle = () => {
    liveSynth.playClickSfx();
    if (isAudioPlaying) {
      liveSynth.stop();
      toggleAudio();
    } else {
      liveSynth.start('focus');
      toggleAudio();
    }
  };

  const handleThemeToggle = () => {
    liveSynth.playClickSfx();
    toggleTheme();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-gold/15 px-3 sm:px-6 py-2.5 flex justify-between items-center transition-all">
        {/* راست: لوگو و نام برند */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              liveSynth.playClickSfx();
              onToggleSidebar();
            }}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass border border-gold/30 text-gold hover:bg-gold/10 transition-all active:scale-95"
            title="منو"
          >
            <Menu className="w-4 h-4" />
            <span className="text-xs font-bold font-mono">منو</span>
          </button>

          <Link
            to="/"
            onClick={() => liveSynth.playClickSfx()}
            className="flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <SovereignCrownLogo />
            <span className="brand-title text-base sm:text-lg tracking-[0.2em] font-black gold-text uppercase">
              PRIME CROWN
            </span>
          </Link>
        </div>

        {/* چپ: دکمه‌ها و وضعیت‌ها */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="py-1.5 px-2.5 rounded-xl bg-gold text-black font-bold text-xs flex items-center gap-1 shadow-[0_0_10px_rgba(212,175,55,0.4)] animate-pulse"
              title="نصب وب‌اپلیکیشن"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">نصب اپ</span>
            </button>
          )}

          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-xl glass border border-gold/20 text-gold hover:border-gold/40 transition-all active:scale-95"
            title={theme === 'dark' ? 'حالت روز' : 'حالت شب'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-amber-600" />}
          </button>

          <button
            onClick={handleSoundToggle}
            className={`p-2 sm:px-2.5 sm:py-1.5 rounded-xl border text-[10px] font-mono transition-all flex items-center gap-1.5 ${
              isAudioPlaying ? 'border-gold bg-gold/10 text-gold' : 'glass border-white/10 text-white/40'
            }`}
            title="صدای آرامش‌بخش تمرکز"
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4 text-gold animate-bounce" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline font-medium">صدای تمرکز</span>
          </button>

          <div className="flex items-center gap-1.5 glass border border-gold/20 px-2.5 py-1.5 rounded-xl">
            <Wallet className="w-3.5 h-3.5 text-gold" />
            <span className="font-mono text-xs font-bold gold-text">{coins.toLocaleString()} SC</span>
          </div>
        </div>
      </header>

      {/* نوار پایینی موبایل */}
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
