import React, { useState } from 'react';
import PuttyCanvas from './components/layout/PuttyCanvas';
import SovereignHeader from './components/layout/SovereignHeader';
import Dashboard from './modules/Dashboard/Dashboard';
import CivilToolsSuite from './modules/CivilTools/CivilToolsSuite';
import StructuralSimSuite from './modules/StructuralSim/StructuralSimSuite';
import AIVisionLab from './modules/AILab/AIVisionLab';
import SiteCommandCenter from './modules/SiteCommand/SiteCommandCenter';
import DailyReportGenerator from './modules/DailyReport/DailyReportGenerator';
import PerformanceHub from './modules/Performance/PerformanceHub';
import KnowledgeHub from './modules/KnowledgeHub/KnowledgeHub';
import ProjectsSection from './modules/Projects/ProjectsSection';
import ArchitectProfile from './modules/Profile/ArchitectProfile';
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
      
      <main className="pt-6 pb-20 min-h-[85vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {activeModule === 'dashboard' && <Dashboard onNavigate={setActiveModule} />}
            {activeModule === 'civil-tools' && <CivilToolsSuite />}
            {activeModule === 'structural-sim' && <StructuralSimSuite />}
            {activeModule === 'ai-lab' && <AIVisionLab />}
            {activeModule === 'site-command' && <SiteCommandCenter />}
            {activeModule === 'daily-report' && <DailyReportGenerator />}
            {activeModule === 'performance' && <PerformanceHub />}
            {activeModule === 'knowledge' && <KnowledgeHub />}
            {activeModule === 'projects' && <ProjectsSection />}
            {activeModule === 'profile' && <ArchitectProfile />}
            {activeModule === 'contact' && <ContactResumeSuite />}
            {activeModule === 'journal' && <TacticalJournal />}
          </motion.div>
        </AnimatePresence>

        <SystemDiagnostics />
      </main>

      <footer className="py-6 text-center text-slate-400 text-[10px] font-mono tracking-widest uppercase border-t border-slate-200/80">
        محمد تاجداری © ۱۴۰۵ • مهندسی عمران، بینایی ماشین و توسعه نرم‌افزار
      </footer>

      <PWAInstallButton />
    </PuttyCanvas>
  );
}
