import React, { useState } from 'react';
import { SovereignProvider } from './context/SovereignContext';
import PuttyCanvas from './components/layout/PuttyCanvas';
import SovereignHeader from './components/layout/SovereignHeader';
import Dashboard from './modules/Dashboard/Dashboard';
import VaultEngine from './modules/Vault/VaultEngine';
import TacticalJournal from './modules/Journal/TacticalJournal';
import ArchitectProfile from './modules/Profile/ArchitectProfile';
import PWAInstallButton from './components/PWAInstallButton';
import { motion, AnimatePresence } from 'framer-motion';

function MainApp() {
  const [activeModule, setActiveModule] = useState('dashboard');

  return (
    <PuttyCanvas>
      <SovereignHeader currentModule={activeModule} onModuleChange={setActiveModule} />
      
      <main className="pt-6 pb-24 min-h-[85vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeModule === 'dashboard' && <Dashboard onNavigate={setActiveModule} />}
            {activeModule === 'vault' && <VaultEngine />}
            {activeModule === 'journal' && <TacticalJournal />}
            {activeModule === 'profile' && <ArchitectProfile />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="py-6 text-center text-gray-400 text-[10px] font-mono tracking-widest uppercase border-t border-gray-200">
        PRIME CROWN © 2026 • ARCHITECT: MOHAMMAD TAJDARI
      </footer>

      <PWAInstallButton />
    </PuttyCanvas>
  );
}

export default function App() {
  return (
    <SovereignProvider>
      <MainApp />
    </SovereignProvider>
  );
}
