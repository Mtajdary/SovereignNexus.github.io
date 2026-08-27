import React, { useState } from 'react';
import { SovereignProvider } from './context/SovereignContext';
import BiometricGate from './modules/Auth/BiometricGate';
import SovereignHeader from './components/layout/SovereignHeader';
import Dashboard from './modules/Dashboard/Dashboard';
import VaultEngine from './modules/Vault/VaultEngine';
import FocusEngine from './modules/Focus/FocusEngine';
import TacticalJournal from './modules/Journal/TacticalJournal';
import ArchitectProfile from './modules/Profile/ArchitectProfile';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeModule, setActiveModule] = useState('dashboard');

  if (!isAuthorized) {
    return <BiometricGate onAccessGranted={() => setIsAuthorized(true)} />;
  }

  return (
    <SovereignProvider>
      <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-black relative">
        <SovereignHeader currentModule={activeModule} onModuleChange={setActiveModule} />
        
        <main className="relative z-10 pt-28 pb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {activeModule === 'dashboard' && <Dashboard />}
              {activeModule === 'vault' && <VaultEngine />}
              {activeModule === 'focus' && <FocusEngine />}
              {activeModule === 'journal' && <TacticalJournal />}
              {activeModule === 'profile' && <ArchitectProfile />}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="py-8 text-center opacity-30 text-[9px] tracking-[0.5em] uppercase font-mono border-t border-white/5">
          PRIME CROWN © 2026 | ARCHITECT: MOHAMMAD TAJDARI
        </footer>
      </div>
    </SovereignProvider>
  );
}

export default App;
