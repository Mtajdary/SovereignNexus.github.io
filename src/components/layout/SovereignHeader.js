import React from 'react';
import { Menu, Wallet, Volume2, VolumeX, Sun, Moon } from 'lucide-react';
import { useSovereign } from '../../context/SovereignContext';
import { liveSynth } from '../../core/audio/BinauralEngine';

const SovereignHeader = ({ onOpenMobileSidebar }) => {
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
    <header className="fixed top-0 left-0 right-0 md:right-20 z-30 glass border-b border-gold/15 px-4 sm:px-8 py-3 flex justify-between items-center transition-all">
      {/* دکمه منوی همبرگری در موبایل */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 rounded-xl glass border border-gold/30 text-gold md:hidden active:scale-95 transition-all"
          title="منوی ناوبری"
        >
          <Menu className="w-5 h-5" />
        </button>

        <span className="brand-title text-sm sm:text-base tracking-[0.2em] font-bold gold-text uppercase">
          WORKSPACE OS
        </span>
      </div>

      {/* ابزارهای کنترلی بالای صفحه */}
      <div className="flex items-center gap-2 sm:gap-3">
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
          title="امواج صوتی مغزی"
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
  );
};

export default SovereignHeader;
