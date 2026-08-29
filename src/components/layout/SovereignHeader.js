import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, Volume2, VolumeX, Sun, Moon, LayoutDashboard, Lock, Flame, BookOpen, User } from 'lucide-react';
import { useSovereign } from '../../context/SovereignContext';
import { audioEngine } from '../../services/audioEngine';

const NAV_ITEMS = [
  { path: '/', label: 'فرماندهی', icon: LayoutDashboard },
  { path: '/vault', label: 'گاوصندوق', icon: Lock },
  { path: '/focus', label: 'تمرکز', icon: Flame },
  { path: '/journal', label: 'ژورنال', icon: BookOpen },
  { path: '/profile', label: 'معمار', icon: User }
];

const SovereignHeader = () => {
  const location = useLocation();
  const { coins, theme, toggleTheme, isAudioPlaying, toggleAudio, soundMode } = useSovereign();

  const handleSoundToggle = () => {
    if (audioEngine?.playSfx) audioEngine.playSfx('click');
    toggleAudio();
  };

  const handleThemeToggle = () => {
    if (audioEngine?.playSfx) audioEngine.playSfx('click');
    toggleTheme();
  };

  return (
    <>
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-gold/15 px-4 md:px-10 py-2.5 flex justify-between items-center transition-all">
        {/* Brand */}
        <Link
          to="/"
          onClick={() => audioEngine?.playSfx && audioEngine.playSfx('click')}
          className="flex items-center cursor-pointer"
        >
          <span className="brand-title text-base sm:text-lg tracking-[0.2em] font-bold gold-text uppercase">
            PRIME CROWN
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {NAV_ITEMS.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                onClick={() => audioEngine?.playSfx && audioEngine.playSfx('click')}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-medium transition-all ${
                  isActive
                    ? 'text-black bg-gold font-bold shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Stats */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Day / Night Theme Switcher */}
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-xl glass border border-gold/20 text-gold hover:border-gold/40 transition-all active:scale-95"
            title={theme === 'dark' ? 'تغییر به حالت روز' : 'تغییر به حالت شب'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-amber-500" />
            )}
          </button>

          {/* Audio Brainwave Trigger */}
          <button
            onClick={handleSoundToggle}
            className={`p-2 sm:px-2.5 sm:py-1.5 rounded-xl border text-[10px] font-mono transition-all flex items-center gap-1.5 active:scale-95 ${
              isAudioPlaying
                ? 'border-gold bg-gold/10 text-gold shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                : 'glass border-white/10 text-white/40 hover:text-white'
            }`}
            title="امواج تمرکز (Binaural Beats)"
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4 text-gold animate-bounce" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{isAudioPlaying ? soundMode : 'صوت'}</span>
          </button>

          {/* Coins Badge */}
          <div className="flex items-center gap-1.5 glass border border-gold/20 px-2.5 py-1.5 rounded-xl">
            <Wallet className="w-3.5 h-3.5 text-gold" />
            <span className="font-mono text-xs font-bold gold-text">{coins.toLocaleString()} SC</span>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t border-white/10 px-2 py-2 flex justify-around items-center">
        {NAV_ITEMS.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              onClick={() => audioEngine?.playSfx && audioEngine.playSfx('click')}
              className={`flex flex-col items-center justify-center py-1 px-2.5 transition-all ${
                isActive ? 'text-gold font-bold scale-105' : 'text-white/40 hover:text-white/70'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]' : 'text-white/40'}`} />
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default SovereignHeader;
