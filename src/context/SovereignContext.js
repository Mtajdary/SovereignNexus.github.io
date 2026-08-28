import React, { createContext, useContext, useState, useEffect } from 'react';
import { audioEngine } from '../services/audioEngine';

const SovereignContext = createContext();

export const SovereignProvider = ({ children }) => {
  const [coins, setCoins] = useState(() => Number(localStorage.getItem('pc_coins')) || 750);
  const [rank, setRank] = useState('STRATEGIST');
  const [unlockedItems, setUnlockedItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pc_vault')) || ['v1'];
    } catch {
      return ['v1'];
    }
  });
  const [transactions, setTransactions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pc_txs')) || [
        { id: 1, type: 'EARNED', amount: 750, title: 'پاداش ایجاد حساب حاکمیتی اولیه', date: new Date().toLocaleDateString('fa-IR') }
      ];
    } catch {
      return [];
    }
  });
  const [focusStats, setFocusStats] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pc_focus_stats')) || { sessions: 14, totalMinutes: 350 };
    } catch {
      return { sessions: 14, totalMinutes: 350 };
    }
  });
  const [soundMode, setSoundMode] = useState('ALPHA');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.25);

  useEffect(() => {
    localStorage.setItem('pc_coins', coins);
    localStorage.setItem('pc_vault', JSON.stringify(unlockedItems));
    localStorage.setItem('pc_txs', JSON.stringify(transactions));
    localStorage.setItem('pc_focus_stats', JSON.stringify(focusStats));

    if (coins >= 5000) setRank('SOVEREIGN');
    else if (coins >= 2500) setRank('ARCHITECT');
    else if (coins >= 1000) setRank('STRATEGIST');
    else setRank('NOVICE');
  }, [coins, unlockedItems, transactions, focusStats]);

  const awardCoins = (amount, title = 'پاداش پروتکل تمرکز') => {
    setCoins(prev => prev + amount);
    const newTx = {
      id: Date.now(),
      type: 'EARNED',
      amount,
      title,
      date: new Date().toLocaleDateString('fa-IR') + ' - ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };
    setTransactions(prev => [newTx, ...prev]);
    audioEngine.playSfx('reward');
  };

  const spendCoins = (amount, title = 'دسترسی به اسناد گاوصندوق') => {
    if (coins >= amount) {
      setCoins(prev => prev - amount);
      const newTx = {
        id: Date.now(),
        type: 'SPENT',
        amount,
        title,
        date: new Date().toLocaleDateString('fa-IR') + ' - ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
      };
      setTransactions(prev => [newTx, ...prev]);
      audioEngine.playSfx('unlock');
      return true;
    }
    return false;
  };

  const recordFocusSession = (minutes = 25) => {
    setFocusStats(prev => ({
      sessions: prev.sessions + 1,
      totalMinutes: prev.totalMinutes + minutes
    }));
    awardCoins(minutes * 2, `تکمیل ${minutes} دقیقه پروتکل تمرکز عصبی`);
  };

  const toggleAudio = (preset = soundMode) => {
    if (isAudioPlaying) {
      audioEngine.stop();
      setIsAudioPlaying(false);
    } else {
      audioEngine.startPreset(preset, audioVolume);
      setIsAudioPlaying(true);
      setSoundMode(preset);
    }
  };

  const changeVolume = (v) => {
    setAudioVolume(v);
    audioEngine.setVolume(v);
  };

  const exportState = () => {
    const data = { coins, rank, unlockedItems, transactions, focusStats, exportDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prime-crown-backup-${Date.now()}.json`;
    a.click();
  };

  return (
    <SovereignContext.Provider value={{
      coins,
      rank,
      unlockedItems,
      setUnlockedItems,
      transactions,
      focusStats,
      awardCoins,
      spendCoins,
      recordFocusSession,
      soundMode,
      setSoundMode,
      isAudioPlaying,
      toggleAudio,
      audioVolume,
      changeVolume,
      exportState
    }}>
      {children}
    </SovereignContext.Provider>
  );
};

export const useSovereign = () => useContext(SovereignContext);
