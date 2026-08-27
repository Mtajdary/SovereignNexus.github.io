import React, { createContext, useContext, useState, useEffect } from 'react';

const SovereignContext = createContext();

export function SovereignProvider({ children }) {
  const [points, setPoints] = useState(() => {
    try {
      return Number(localStorage.getItem('pc_points')) || 1250;
    } catch {
      return 1250;
    }
  });

  const [userRank, setUserRank] = useState('SOVEREIGN ARCHITECT');

  useEffect(() => {
    try {
      localStorage.setItem('pc_points', points);
    } catch (e) {}
  }, [points]);

  return (
    <SovereignContext.Provider value={{ points, setPoints, userRank, setUserRank }}>
      {children}
    </SovereignContext.Provider>
  );
}

export function useSovereign() {
  const context = useContext(SovereignContext);
  return context || { points: 1250, userRank: 'SOVEREIGN ARCHITECT', setPoints: () => {} };
}
