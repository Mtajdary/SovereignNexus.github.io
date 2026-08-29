import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Wallet, Volume2, VolumeX, Sun, Moon, Download } from 'lucide-react';
import { useSovereign } from '../../context/SovereignContext';
import { liveSynth } from '../../core/audio/BinauralEngine';
import { NAV_ITEMS } from './SovereignSidebar';

// نشان وکتور اختصاصی Sovereign Apex Crown
const SovereignCrownEmblem = () => (
  <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 100 100" className="w-7 h-7 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)] overflow-visible">
      <defs>
        <linearGradient id="hdrCrownGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF"/>
          <stop offset="30%" stopColor="#FEF08A"/>
          <stop offset="70%" stopColor="#F59E0B"/>
          <stop offset="100%" stopColor="#78350F"/>
        </linearGradient>
      </defs>

      {/* پره چپ و راست تاج */}
      <path d="M22 36 L36 68 L50 78 L38 50 Z" fill="url(#hdrCrownGold)" opacity="0.9"/>
      <path d="M78 36 L64 68 L50 78 L62 50 Z" fill="url(#hdrCrownGold)" opacity="0.9"/>
      {/* قله اصلی تاج */}
      <path d="M50 18 L60 50 L50 78 L40 50 Z" fill="url(#hdrCrownGold)"/>
      <path d="M50 18 L40 50 L50 78 Z" fill="#FFF" opacity="0.3"/>
      {/* پایه منحنی تاج */}
      <path d="M30 72 Q50 84 70 72 L66 77 Q50 89 34 77 Z" fill="url(#hdrCrownGold)"/>

      {/* هسته الماس هوش مصنوعی */}
      <circle cx="50" cy="50" r="10" fill="#FEF08A" opacity="0.4"/>
      <path d="M50 42 C50 47 46 50 41 50 C46 50 50 53 50 58 C50 53 54 50 59 50 C54 50 50 47 50 42 Z" fill="#FFF"/>

      {/* نگین‌های سه‌گانه راس‌ها */}
      <circle cx="50" cy="18" r="1.8" fill="#FFF"/>
      <circle cx="22" cy="36" r="1.4" fill="#FFF"/>
      <circle cx="78" cy="36" r="1.4" fill="#FFF"/>
    </svg>
    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse opacity-90" />
  </div>
);

const SovereignHeader = ({ onToggleSidebar }) => {
  const location = useLocation();
  const { coins, theme, toggleTheme, isAudioPlaying, toggleAudio } = useSovereign();
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
        {/* راست: آیکون تاج شاهانه + نام برند */}
        <div className="flex items-center gap-2">
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
            className="flex items-center gap-2 cursor-pointer shrink-0"
          >
            <SovereignCrownEmblem />
            <span className="brand-title text-sm sm:text-base md:text-lg tracking-[0.16em] font-black gold-text uppercase whitespace-nowrap">
              PRIME CROWN
            </span>
          </Link>
        </div>

        {/* چپ: دکمه‌های کنترل */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="p-2 rounded-xl bg-gold/15 border border-gold/40 text-gold hover:bg-gold hover:text-black transition-all active:scale-95 flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.25)]"
              title="نصب اپلیکیشن"
            >
              <Download className="w-4 h-4" />
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
              isAudioPlaying ? 'border-gold bg-gold/10 text-gold shadow-[0_0_10px_rgba(212,175,55,0.3)]' : 'glass border-white/10 text-white/40'
            }`}
            title="صدای تمرکز"
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4 text-gold animate-bounce" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline font-medium">تمرکز</span>
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
