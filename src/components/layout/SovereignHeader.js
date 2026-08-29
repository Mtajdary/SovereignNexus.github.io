import React from 'react';
import { Wallet, Volume2, VolumeX, LayoutDashboard, Lock, Flame, BookOpen, User } from 'lucide-react';
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
  const { coins, isAudioPlaying, toggleAudio, soundMode } = useSovereign();

  const handleNav = (moduleName) => {
    if (audioEngine?.playSfx) audioEngine.playSfx('click');
    onModuleChange(moduleName);
  };

  return (
    <>
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-gold/10 px-4 md:px-10 py-2.5 flex justify-between items-center">
        {/* Brand */}
        <div className="flex items-center cursor-pointer" onClick={() => handleNav('dashboard')}>
          <span className="font-serif text-base sm:text-lg tracking-[0.2em] font-bold gold-text uppercase">
            PRIME CROWN
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {NAV_ITEMS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleNav(tab.id)}
              className={`text-xs px-3.5 py-1.5 rounded-xl font-medium transition-all ${
                currentModule === tab.id
                  ? 'text-black bg-gold font-bold shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleAudio()}
            className={`p-1.5 sm:px-2.5 sm:py-1 rounded-xl border text-[10px] transition-all flex items-center gap-1 ${
              isAudioPlaying
                ? 'border-gold bg-gold/10 text-gold'
                : 'border-white/10 text-white/40 hover:text-white'
            }`}
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4 text-gold" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{isAudioPlaying ? soundMode : 'صوت'}</span>
          </button>

          <div className="flex items-center gap-1.5 bg-white/5 border border-gold/20 px-2.5 py-1 rounded-xl">
            <Wallet className="w-3.5 h-3.5 text-gold" />
            <span className="font-mono text-xs font-bold gold-text">{coins.toLocaleString()} SC</span>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/95 backdrop-blur-2xl border-t border-white/10 px-2 py-2 flex justify-around items-center">
        {NAV_ITEMS.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentModule === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleNav(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 transition-all ${
                isActive ? 'text-gold font-bold' : 'text-white/40 hover:text-white/70'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]' : 'text-white/40'}`} />
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default SovereignHeader;
