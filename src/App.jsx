import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SovereignProvider, useSovereign } from './context/SovereignContext';
import SovereignHeader from './components/layout/SovereignHeader';
import DynamicBackground from './components/layout/DynamicBackground';
import Dashboard from './modules/Dashboard/Dashboard';
import DecisionMatrix from './modules/DecisionMatrix/DecisionMatrix';
import CivilToolkit from './modules/CivilEngine/CivilToolkit';
import VisionLab from './modules/VisionLab/VisionLab';
import VaultEngine from './modules/Vault/VaultEngine';
import FocusEngine from './modules/Focus/FocusEngine';
import TacticalJournal from './modules/Journal/TacticalJournal';
import ArchitectProfile from './modules/Profile/ArchitectProfile';
import { motion, AnimatePresence } from 'framer-motion';

const PageTitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      '/': 'فرماندهی و داشبورد | PRIME CROWN',
      '/matrix': 'ماتریس تصمیم‌گیری استراتژیک ۸۰/۲۰ | PRIME CROWN',
      '/civil': 'جعبه‌ابزار مهندسی عمران و ژئوتکنیک | PRIME CROWN',
      '/vision': 'آزمایشگاه بینایی ماشین و هوش مصنوعی | PRIME CROWN',
      '/vault': 'گاوصندوق اسناد استراتژیک | PRIME CROWN',
      '/focus': 'اتاق تمرکز و غرقگی عمیق | PRIME CROWN',
      '/journal': 'ژورنال تاکتیکی و بصیرت‌ها | PRIME CROWN',
      '/profile': 'پروفایل معمار ارشد سیستم | PRIME CROWN'
    };

    document.title = titles[location.pathname] || 'PRIME CROWN | سیستم‌عامل معماری ذهن برتر';
  }, [location]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrap><Dashboard /></PageWrap>} />
        <Route path="/matrix" element={<PageWrap><DecisionMatrix /></PageWrap>} />
        <Route path="/civil" element={<PageWrap><CivilToolkit /></PageWrap>} />
        <Route path="/vision" element={<PageWrap><VisionLab /></PageWrap>} />
        <Route path="/vault" element={<PageWrap><VaultEngine /></PageWrap>} />
        <Route path="/focus" element={<PageWrap><FocusEngine /></PageWrap>} />
        <Route path="/journal" element={<PageWrap><TacticalJournal /></PageWrap>} />
        <Route path="/profile" element={<PageWrap><ArchitectProfile /></PageWrap>} />
      </Routes>
    </AnimatePresence>
  );
};

const PageWrap = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

const AppContent = () => {
  const { theme } = useSovereign();

  return (
    <div className={`min-h-screen relative pb-20 lg:pb-8 transition-colors duration-300 overflow-x-hidden ${theme === 'light' ? 'light-theme' : 'dark'}`}>
      <PageTitleUpdater />
      <DynamicBackground />
      <SovereignHeader />

      <main className="relative z-10 pt-16 sm:pt-20">
        <AnimatedRoutes />
      </main>
    </div>
  );
};

function App() {
  return (
    <SovereignProvider>
      <Router>
        <AppContent />
      </Router>
    </SovereignProvider>
  );
}

export default App;
