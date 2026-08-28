import React from 'react';
import { Wallet, Volume2, VolumeX, Shield, Award, Sparkles } from 'lucide-react';
import { useSovereign } from '../../context/SovereignContext';
import { audioEngine } from '../../services/audioEngine';

const SovereignHeader = ({ currentModule, onModuleChange }) => {
  const { coins, rank, isAudioPlaying, toggleAudio, soundMode } = useSovereign();

  const getRankData = (r) => {
    switch (r) {
      case 'SOVEREIGN': return { fa: 'حاکم مطلق', color: 'text-amber-300', badge: 'SOV-LEVEL-4' };
      case 'ARCHITECT': return { fa: 'معمار ارشد', color: 'text-yellow-400', badge: 'ARCH-LEVEL-3' };
      case 'STRATEGIST': return { fa: 'استراتژیست', color: 'text-gold', badge: 'STRAT-LEVEL-2' };
      default: return { fa: 'تازه‌وارد', color: 'text-white/60', badge: 'INITIATE-1' };
    }
  };

  const rankInfo = getRankData(rank);

  const handleNav = (moduleName) => {
    audioEngine.playSfx('click');
    onModuleChange(moduleName);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-gold/10 px-6 lg:px-12 py-3 flex justify-between items-center transition-all duration-300">
      {/* User Stats & Sound Control */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3 bg-white/5 border border-gold/20 px-4 py-1.5 rounded-full backdrop-blur-md">
          <Wallet className="w-4 h-4 text-gold animate-pulse" />
          <div className="flex flex-col text-right">
            <span className="text-[7px] tracking-widest text-white/40 uppercase">اعتبار حاکمیتی</span>
            <span className="font-mono text-sm font-bold gold-text leading-tight">{coins.toLocaleString()} SC</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
          <Shield className={`w-3.5 h-3.5 ${rankInfo.color}`} />
          <div className="flex flex-col text-right">
            <span className="text-[7px] tracking-widest text-white/40 uppercase">مرتبه</span>
            <span className={`text-[10px] font-bold ${rankInfo.color} leading-tight`}>{rankInfo.fa}</span>
          </div>
        </div>

        {/* Audio Brainwave Trigger */}
        <button
          onClick={() => toggleAudio()}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] font-mono tracking-wider transition-all ${
            isAudioPlaying
              ? 'border-gold bg-gold/10 text-gold gold-glow'
              : 'border-white/10 text-white/40 hover:text-white hover:border-white/20'
          }`}
          title="پخش امواج تمرکز دوگوشی (Binaural Beats)"
        >
          {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5 text-gold animate-bounce" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden md:inline">{isAudioPlaying ? `امواج ${soundMode}` : 'صدا خاموش'}</span>
        </button>
      </div>

      {/* Brand Center */}
      <div className="flex items-center cursor-pointer group" onClick={() => handleNav('dashboard')}>
        <div className="relative flex items-center justify-center">
          <span className="font-serif text-xl tracking-[0.3em] font-bold gold-text group-hover:scale-105 transition-transform duration-300 uppercase">
            PRIME CROWN
          </span>
        </div>
      </div>

      {/* Navigation Modules */}
      <nav className="flex items-center gap-3 sm:gap-6">
        {[
          { id: 'dashboard', label: 'فرماندهی' },
          { id: 'vault', label: 'گاوصندوق' },
          { id: 'focus', label: 'اتاق تمرکز' },
          { id: 'journal', label: 'ژورنال تاکتیکی' },
          { id: 'profile', label: 'معمار' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleNav(tab.id)}
            className={`text-[10px] sm:text-[11px] tracking-[0.2em] font-medium transition-all px-3 py-1.5 rounded-lg ${
              currentModule === tab.id
                ? 'text-black bg-gold font-bold gold-glow'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default SovereignHeader;
