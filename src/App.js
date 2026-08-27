import React, { useState } from 'react';
import PuttyCanvas from './components/layout/PuttyCanvas';
import SovereignHeader from './components/layout/SovereignHeader';
import Dashboard from './modules/Dashboard/Dashboard';
import CivilToolsSuite from './modules/CivilTools/CivilToolsSuite';
import AIVisionLab from './modules/AILab/AIVisionLab';
import ProjectsSection from './modules/Projects/ProjectsSection';
import TacticalJournal from './modules/Journal/TacticalJournal';
import ArchitectProfile from './modules/Profile/ArchitectProfile';
import PWAInstallButton from './components/PWAInstallButton';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');

  return (
    <PuttyCanvas>
      <SovereignHeader currentModule={activeModule} onModuleChange={setActiveModule} />
      
      <main className="pt-6 pb-24 min-h-[85vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {activeModule === 'dashboard' && <Dashboard onNavigate={setActiveModule} />}
            {activeModule === 'civil-tools' && <CivilToolsSuite />}
            {activeModule === 'ai-lab' && <AIVisionLab />}
            {activeModule === 'projects' && <ProjectsSection />}
            {activeModule === 'profile' && <ArchitectProfile />}
            {activeModule === 'journal' && <TacticalJournal />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="py-6 text-center text-gray-400 text-[10px] font-mono tracking-widest uppercase border-t border-gray-200">
        محمد تاجداری © ۱۴۰۵ • مهندسی عمران، هوش مصنوعی و نرم‌افزار
      </footer>

      <PWAInstallButton />
    </PuttyCanvas>
  );
}
