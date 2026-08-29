import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Wallet, Volume2, VolumeX, Sun, Moon, Download } from 'lucide-react';
import { useSovereign } from '../../context/SovereignContext';
import { liveSynth } from '../../core/audio/BinauralEngine';
import { NAV_ITEMS } from './SovereignSidebar';

// کامپوننت اختصاصی لوگوی تاج نئونی PRIME CROWN
const PrismaticCrownLogo = () => (
  <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 100 100" className="w-8 h-8 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]">
      <defs>
        <linearGradient id="hdrLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="hdrCenter" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="hdrRight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>

      {/* بال چپ (آبی) */}
      <polygon points="18,42 36,60 18,74 12,56" fill="url(#hdrLeft)" />
      <polygon points="18,42 50,48 36,60" fill="#2563EB" opacity="0.75" />

      {/* بال راست (سبز زمردی) */}
      <polygon points="82,42 88,56 82,74 64,60" fill="url(#hdrRight)" />
      <polygon points="82,42 64,60 50,48" fill="#059669" opacity="0.75" />

      {/* پایه تاج */}
      <path d="M18 74 Q 50 84 82 74 L80 77 Q 50 87 20 77 Z" fill="#F59E0B" opacity="0.9" />

      {/* قله مرکزی طلایی درخشان */}
      <polygon points="50,20 36,60 50,76 64,60" fill="url(#hdrCenter)" />
      <polygon points="50,20 50,76 36,60" fill="#FFF" opacity="0.35" />

      {/* جرقه ۴‌پر بر فراز تاج */}
      <path d="M50 12 C50 16 47 19 43 19 C47 19 50 22 50 26 C50 22 53 19 57 19 C53 19 50 16 50 12 Z" fill="#FFFFFF" />
    </svg>
    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse opacity-85" />
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
            <PrismaticCrownLogo />
            <span className="brand-title text-sm sm:text-lg tracking-[0.18em] font-black gold-text uppercase whitespace-nowrap">
              PRIME CROWN
            </span>
          </Link>
        </div>

        {/* چپ: دکمه‌های کنترل */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="p-2 rounded-xl bg-gold/20 border border-gold text-gold hover:bg-gold hover:text-black transition-all active:scale-95 flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.3)]"
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
              isAudioPlaying ? 'border-gold bg-gold/10 text-gold' : 'glass border-white/10 text-white/40'
            }`}
            title="صدای تمرکز"
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
