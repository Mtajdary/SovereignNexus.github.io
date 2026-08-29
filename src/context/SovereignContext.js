import React, { createContext, useContext, useState, useEffect } from 'react';

const SovereignContext = createContext();

export const SovereignProvider = ({ children }) => {
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('pc_coins');
    return saved ? parseInt(saved, 10) : 500;
  });

  const [unlockedItems, setUnlockedItems] = useState(() => {
    const saved = localStorage.getItem('pc_unlocked_items');
    return saved ? JSON.parse(saved) : ['v1'];
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('pc_theme') || 'dark';
  });

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [soundMode, setSoundMode] = useState('گاما ۴۰Hz');

  useEffect(() => {
    localStorage.setItem('pc_coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('pc_unlocked_items', JSON.stringify(unlockedItems));
  }, [unlockedItems]);

  useEffect(() => {
    localStorage.setItem('pc_theme', theme);
    const root = document.documentElement;
    const body = document.body;
    if (theme === 'light') {
      root.classList.add('light-theme');
      root.classList.remove('dark');
      body.classList.add('light-theme');
      body.classList.remove('dark');
    } else {
      root.classList.remove('light-theme');
      root.classList.add('dark');
      body.classList.remove('light-theme');
      body.classList.add('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addCoins = (amount) => {
    setCoins((prev) => prev + amount);
  };

  const spendCoins = (amount) => {
    if (coins >= amount) {
      setCoins((prev) => prev - amount);
      return true;
    }
    return false;
  };

  const toggleAudio = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  const getRank = () => {
    if (coins >= 2500) return 'SOVEREIGN';
    if (coins >= 1200) return 'ARCHITECT';
    if (coins >= 500) return 'STRATEGIST';
    return 'INITIATE';
  };

  return (
    <SovereignContext.Provider
      value={{
        coins,
        addCoins,
        spendCoins,
        unlockedItems,
        setUnlockedItems,
        rank: getRank(),
        theme,
        toggleTheme,
        isAudioPlaying,
        toggleAudio,
        soundMode
      }}
    >
      {children}
    </SovereignContext.Provider>
  );
};

export const useSovereign = () => {
  const context = useContext(SovereignContext);
  if (!context) {
    throw new Error('useSovereign must be used within a SovereignProvider');
  }
  return context;
};
