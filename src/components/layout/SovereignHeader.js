import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Wallet, Volume2, VolumeX, Sun, Moon, Download } from 'lucide-react';
import { useSovereign } from '../../context/SovereignContext';
import { liveSynth } from '../../core/audio/BinauralEngine';
import { NAV_ITEMS } from './SovereignSidebar';

// نشان اختصاصی الماس منشوری و درخشان PRIME CROWN
const DiamondCrownEmblem = () => (
  <div className="relative w-8 h-8 flex items-center justify-center shrink-0 group">
    <svg viewBox="0 0 100 100" className="w-8 h-8 overflow-visible filter drop-shadow-[0_0_12px_rgba(245,158,11,0.65)]">
      <defs>
        {/* گرادیان الماس طلایی مرکزی */}
        <linearGradient id="diamondGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="20%" stopColor="#FEF08A" />
          <stop offset="55%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        {/* گرادیان بال کریستالی چپ (یاقوت کبود و فیروزه‌ای) */}
        <linearGradient id="sapphireFacet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="30%" stopColor="#38BDF8" />
          <stop offset="70%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>

        {/* گرادیان بال کریستالی راست (زمرد درخشان) */}
        <linearGradient id="emeraldFacet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="30%" stopColor="#34D399" />
          <stop offset="70%" stopColor="#059669" />
          <stop offset="100%" stopColor="#064E3B" />
        </linearGradient>

        {/* گرادیان پایه الماسی */}
        <linearGradient id="diamondBase" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>

        {/* بازتاب شیشه‌ای صیقلی */}
        <linearGradient id="glassShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* ۱. پایه و کمربند الماسی تاج */}
      <polygon points="18,74 50,86 82,74 50,78" fill="url(#diamondBase)" />

      {/* ۲. بال چپ - برش‌های چندوجهی یاقوت کبود */}
      <polygon points="18,40 36,60 18,74 10,54" fill="url(#sapphireFacet)" />
      <polygon points="18,40 50,48 36,60" fill="#1D4ED8" />
      <polygon points="18,40 28,52 18,74" fill="url(#glassShine)" opacity="0.6" />

      {/* ۳. بال راست - برش‌های چندوجهی زمرد */}
      <polygon points="82,40 90,54 82,74 64,60" fill="url(#emeraldFacet)" />
      <polygon points="82,40 64,60 50,48" fill="#047857" />
      <polygon points="82,40 72,52 82,74" fill="url(#glassShine)" opacity="0.6" />

      {/* ۴. قله مرکزی - الماس طلایی شاهانه */}
      <polygon points="50,14 36,60 50,78 64,60" fill="url(#diamondGold)" />
      {/* وجه بازتاب نور الماس مرکزی */}
      <polygon points="50,14 50,78 36,60" fill="#FFFFFF" opacity="0.4" />
      <polygon points="50,14 42,42 50,56" fill="url(#glassShine)" opacity="0.75" />

      {/* ۵. جرقه ۴‌پر بر فراز الماس */}
      <path 
        d="M50 6 C50 10 47 13 43 13 C47 13 50 16 50 20 C50 16 53 13 57 13 C53 13 50 10 50 6 Z" 
        fill="#FFFFFF" 
        className="animate-pulse"
      />
      <circle cx="50" cy="13" r="1.5" fill="#FEF08A" />
    </svg>
    {/* هاله چشمک‌زن الماسی */}
    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-300 animate-ping opacity-75 pointer-events-none" />
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
        {/* راست: نشان الماس منشوری + عنوان برند */}
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
            className="flex items-center gap-2 cursor-pointer shrink-0"
          >
            <DiamondCrownEmblem />
            <span className="brand-title text-base sm:text-lg tracking-[0.18em] font-black gold-text uppercase whitespace-nowrap">
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
