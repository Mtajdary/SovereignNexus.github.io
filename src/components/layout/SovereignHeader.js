import React from 'react';
import { Wallet, Volume2, VolumeX, Shield, LayoutDashboard, Lock, Flame, BookOpen, User } from 'lucide-react';
import { useSovereign } from '../../context/SovereignContext';
import { audioEngine } from '../../services/audioEngine';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'فرماندهی', icon: LayoutDashboard },
  { id: 'vault', label: 'گاوصندوق', icon: Lock },
  { id: 'focus', label: 'تمرکز', icon: Flame },
  { id: 'journal', label: 'ژورنال', icon: BookOpen },
  { id: 'profile', label: 'معمار', icon: User }
];

const SovereignHeader = ({ currentModule, onModuleChange }) => {
  const { coins, rank, isAudioPlaying, toggleAudio, soundMode } = useSovereign();

  const getRankData = (r) => {
    switch (r) {
      case 'SOVEREIGN': return { fa: 'حاکم مطلق', color: 'text-amber-300' };
      case 'ARCHITECT': return { fa: 'معمار ارشد', color: 'text-yellow-400' };
      case 'STRATEGIST': return { fa: 'استراتژیست', color: 'text-gold' };
      default: return { fa: 'تازه‌وارد', color: 'text-white/60' };
    }
  };

  const rankInfo = getRankData(rank);

  const handleNav = (moduleName) => {
    if (audioEngine?.playSfx) audioEngine.playSfx('click');
    onModuleChange(moduleName);
  };

  return (
    <>
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gold/10 px-4 md:px-10 py-3 flex justify-between items-center">
        {/* Brand */}
        <div className="flex items-center cursor-pointer" onClick={() => handleNav('dashboard')}>
          <span className="font-serif text-lg md:text-xl tracking-[0.25em] font-bold gold-text uppercase">
            PRIME CROWN
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-4">
          {NAV_ITEMS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleNav(tab.id)}
              className={`text-xs tracking-wider transition-all px-4 py-2 rounded-xl font-medium ${
                currentModule === tab.id
                  ? 'text-black bg-gold font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Stats & Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Audio Trigger */}
          <button
            onClick={() => toggleAudio()}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-full border text-[10px] font-mono transition-all flex items-center gap-1.5 ${
              isAudioPlaying
                ? 'border-gold bg-gold/10 text-gold shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                : 'border-white/10 text-white/40 hover:text-white'
            }`}
            title="امواج تمرکز (Binaural Beats)"
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4 text-gold animate-bounce" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden lg:inline">{isAudioPlaying ? soundMode : 'صوت'}</span>
          </button>

          {/* Coins Badge */}
          <div className="flex items-center gap-2 bg-white/5 border border-gold/20 px-3 py-1.5 rounded-2xl backdrop-blur-md">
            <Wallet className="w-4 h-4 text-gold" />
            <span className="font-mono text-xs md:text-sm font-bold gold-text">{coins.toLocaleString()} SC</span>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/90 backdrop-blur-2xl border-t border-white/10 px-2 py-2 flex justify-around items-center">
        {NAV_ITEMS.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentModule === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleNav(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
                isActive ? 'text-gold font-bold scale-105' : 'text-white/40 hover:text-white/70'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-gold' : 'text-white/40'}`} />
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default SovereignHeader;
