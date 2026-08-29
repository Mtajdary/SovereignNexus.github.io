import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SovereignProvider, useSovereign } from './context/SovereignContext';
import SovereignHeader from './components/layout/SovereignHeader';
import { SovereignSidebar } from './components/layout/SovereignSidebar';
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
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className={`min-h-screen relative transition-colors duration-300 overflow-x-hidden ${theme === 'light' ? 'light-theme' : 'dark'}`}>
      <PageTitleUpdater />
      <DynamicBackground />
      
      {/* ۱. سایدبار عمودی راست (ثابت در دسکتاپ، کشویی در موبایل) */}
      <SovereignSidebar
        isMobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* ۲. هدر بالای صفحه با احتساب سایدبار راست */}
      <SovereignHeader
        onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
      />

      {/* ۳. محتوای اصلی با حاشیه استاندارد از سمت راست در دسکتاپ (md:mr-20) */}
      <main className="relative z-10 pt-20 sm:pt-24 pb-12 md:mr-20 px-3 sm:px-6">
        <AnimatedRoutes />
      </main>

      <footer className="relative z-10 py-6 text-center opacity-40 text-[9px] tracking-[0.4em] uppercase font-mono border-t border-white/5 md:mr-20">
        PRIME CROWN © 2026 | ARCHITECT: MOHAMMAD TAJDARI
      </footer>
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
