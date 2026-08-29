import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Wallet, Volume2, VolumeX, Sun, Moon } from 'lucide-react';
import { useSovereign } from '../../context/SovereignContext';
import { liveSynth } from '../../core/audio/BinauralEngine';
import { NAV_ITEMS } from './SovereignSidebar';

// کامپوننت اختصاصی لوگوی ۴‌پر Google Labs
const GoogleLabsLogo = () => (
  <div className="relative w-8 h-8 flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-7 h-7 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">
      <defs>
        <linearGradient id="headerGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF3C4" />
          <stop offset="50%" stop-color="#D4AF37" />
          <stop offset="100%" stop-color="#AA7C11" />
        </linearGradient>
      </defs>
      <path 
        d="M12 0 C12 6.627 6.627 12 0 12 C6.627 12 12 17.373 12 24 C12 17.373 17.373 12 24 12 C17.373 12 12 6.627 12 0 Z" 
        fill="url(#headerGold)" 
      />
    </svg>
    {/* ستاره کوچک متحرک در گوشه لوگو */}
    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-300 animate-ping opacity-75" />
  </div>
);

const SovereignHeader = ({ onToggleSidebar }) => {
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
      {/* هدر بالای صفحه */}
      <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-gold/15 px-3 sm:px-6 py-2.5 flex justify-between items-center transition-all">
        {/* راست: لوگوی Google Labs + عنوان برند */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              liveSynth.playClickSfx();
              onToggleSidebar();
            }}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass border border-gold/30 text-gold hover:bg-gold/10 transition-all active:scale-95"
            title="باز کردن منو"
          >
            <Menu className="w-4 h-4" />
            <span className="text-xs font-bold font-mono">منو</span>
          </button>

          <Link
            to="/"
            onClick={() => liveSynth.playClickSfx()}
            className="flex items-center gap-2 cursor-pointer shrink-0"
          >
            <GoogleLabsLogo />
            <span className="brand-title text-base sm:text-lg tracking-[0.2em] font-black gold-text uppercase">
              PRIME CROWN
            </span>
          </Link>
        </div>

        {/* چپ: ابزارهای کنترلی */}
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

      {/* نوار پایینی پرسرعت موبایل */}
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
