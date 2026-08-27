import React, { createContext, useContext, useState, useEffect } from 'react';

const SovereignContext = createContext();

export function SovereignProvider({ children }) {
  // بازیابی داده‌ها از LocalStorage با مقدار اولیه پیش‌فرض
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('prime_points');
    return saved !== null ? JSON.parse(saved) : 1000;
  });

  const [unlockedItems, setUnlockedItems] = useState(() => {
    const saved = localStorage.getItem('prime_unlocked_items');
    return saved !== null ? JSON.parse(saved) : [];
  });

  const [userRank, setUserRank] = useState(() => {
    const saved = localStorage.getItem('prime_rank');
    return saved !== null ? JSON.parse(saved) : 'STRATEGIST';
  });

  // ذخیره‌سازی خودکار در زمان تغییر مقادیر
  useEffect(() => {
    localStorage.setItem('prime_points', JSON.stringify(points));
  }, [points]);

  useEffect(() => {
    localStorage.setItem('prime_unlocked_items', JSON.stringify(unlockedItems));
  }, [unlockedItems]);

  useEffect(() => {
    localStorage.setItem('prime_rank', JSON.stringify(userRank));
  }, [userRank]);

  const addPoints = (amount) => {
    setPoints((prev) => prev + amount);
  };

  const unlockVaultItem = (itemId, cost) => {
    if (points >= cost && !unlockedItems.includes(itemId)) {
      setPoints((prev) => prev - cost);
      setUnlockedItems((prev) => [...prev, itemId]);
      return true;
    }
    return false;
  };

  return (
    <SovereignContext.Provider
      value={{
        points,
        addPoints,
        unlockedItems,
        unlockVaultItem,
        userRank,
        setUserRank
      }}
    >
      {children}
    </SovereignContext.Provider>
  );
}

export const useSovereign = () => useContext(SovereignContext);
