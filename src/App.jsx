import React, { useState } from 'react';
import { SovereignProvider } from './context/SovereignContext';
import SovereignHeader from './components/layout/SovereignHeader';
import Dashboard from './modules/Dashboard/Dashboard';
import VaultEngine from './modules/Vault/VaultEngine';
import FocusEngine from './modules/Focus/FocusEngine';
import TacticalJournal from './modules/Journal/TacticalJournal';
import ArchitectProfile from './modules/Profile/ArchitectProfile';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');

  return (
    <SovereignProvider>
      <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-black font-['Vazirmatn',sans-serif] relative pb-24 md:pb-0">
        <SovereignHeader currentModule={activeModule} onModuleChange={setActiveModule} />

        <main className="relative z-10 pt-20 md:pt-28 pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
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
      </div>
    </SovereignProvider>
  );
}

export default App;
