import React, { useState } from 'react';
import { SovereignProvider } from './context/SovereignContext';
import PuttyCanvas from './components/layout/PuttyCanvas';
import SovereignHeader from './components/layout/SovereignHeader';
import Dashboard from './modules/Dashboard/Dashboard';
import VaultEngine from './modules/Vault/VaultEngine';
import FocusEngine from './modules/Focus/FocusEngine';
import TacticalJournal from './modules/Journal/TacticalJournal';
import ArchitectProfile from './modules/Profile/ArchitectProfile';
import PWAInstallButton from './components/PWAInstallButton';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');

  return (
    <SovereignProvider>
      <PuttyCanvas>
        <SovereignHeader currentModule={activeModule} onModuleChange={setActiveModule} />
        
        <main className="pt-20 pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {activeModule === 'dashboard' && <Dashboard />}
              {activeModule === 'vault' && <VaultEngine />}
              {activeModule === 'focus' && <FocusEngine />}
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
    </SovereignProvider>
  );
}

export default App;
