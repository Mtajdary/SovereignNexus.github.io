import React, { useState } from 'react';
import PuttyCanvas from './components/layout/PuttyCanvas';
import SovereignHeader from './components/layout/SovereignHeader';
import Dashboard from './modules/Dashboard/Dashboard';
import EngineeringSuite from './modules/EngineeringLab/EngineeringSuite';
import ProjectsSection from './modules/Projects/ProjectsSection';
import KnowledgeHub from './modules/KnowledgeHub/KnowledgeHub';
import ContactResumeSuite from './modules/Contact/ContactResumeSuite';
import TacticalJournal from './modules/Journal/TacticalJournal';
import SystemDiagnostics from './components/SystemDiagnostics';
import PWAInstallButton from './components/PWAInstallButton';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');

  return (
    <PuttyCanvas activeModule={activeModule}>
      <SovereignHeader currentModule={activeModule} onModuleChange={setActiveModule} />
      
      <main className="pt-6 pb-16 min-h-[85vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {activeModule === 'dashboard' && (
              <Dashboard 
                onNavigate={(dest) => {
                  if (dest === 'projects') setActiveModule('projects-hub');
                  else if (dest === 'profile') setActiveModule('profile-resume');
                  else if (dest === 'vault' || dest === 'civil-tools') setActiveModule('engineering-lab');
                  else setActiveModule(dest);
                }} 
              />
            )}
            {activeModule === 'engineering-lab' && <EngineeringSuite />}
            {activeModule === 'projects-hub' && (
              <div className="space-y-8">
                <ProjectsSection />
                <KnowledgeHub />
              </div>
            )}
            {activeModule === 'profile-resume' && <ContactResumeSuite />}
            {activeModule === 'journal' && <TacticalJournal />}
          </motion.div>
        </AnimatePresence>

        <SystemDiagnostics />
      </main>

      <footer className="py-6 text-center text-gray-400 text-[10px] font-mono tracking-widest uppercase border-t border-gray-200">
        محمد تاجداری © ۱۴۰۵ • مهندسی عمران، بینایی ماشین و توسعه نرم‌افزار
      </footer>

      <PWAInstallButton />
    </PuttyCanvas>
  );
}
