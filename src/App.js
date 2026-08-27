import React, { useState } from 'react';
import PuttyCanvas from './components/layout/PuttyCanvas';
import SovereignHeader from './components/layout/SovereignHeader';
import Dashboard from './modules/Dashboard/Dashboard';
import EngineeringSuite from './modules/EngineeringLab/EngineeringSuite';
import KnowledgeHub from './modules/KnowledgeHub/KnowledgeHub';
import ContactResumeSuite from './modules/Contact/ContactResumeSuite';
import TacticalJournal from './modules/Journal/TacticalJournal';
import SystemDiagnostics from './components/SystemDiagnostics';
import PWAInstallButton from './components/PWAInstallButton';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');

  return (
    <PuttyCanvas>
      <SovereignHeader currentModule={activeModule} onModuleChange={setActiveModule} />
      
      <main className="pt-6 pb-16 min-h-[85vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
          >
            {activeModule === 'dashboard' && <Dashboard onNavigate={setActiveModule} />}
            {activeModule === 'engineering-lab' && <EngineeringSuite />}
            {activeModule === 'knowledge' && <KnowledgeHub />}
            {activeModule === 'contact' && <ContactResumeSuite />}
            {activeModule === 'journal' && <TacticalJournal />}
          </motion.div>
        </AnimatePresence>

        <SystemDiagnostics />
      </main>

      <footer className="py-6 text-center text-slate-400 text-[10px] font-mono tracking-widest uppercase border-t border-slate-200/60">
        PRIME CROWN ENGINEERING LABS &bull; CIVIL &amp; AI SYSTEMS &bull; ۲۰۲۶
      </footer>

      <PWAInstallButton />
    </PuttyCanvas>
  );
}
