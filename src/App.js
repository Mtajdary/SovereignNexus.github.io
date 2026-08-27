import React, { useState, Component } from 'react';
import { SovereignProvider } from './context/SovereignContext';
import PuttyCanvas from './components/layout/PuttyCanvas';
import SovereignHeader from './components/layout/SovereignHeader';
import Dashboard from './modules/Dashboard/Dashboard';
import VaultEngine from './modules/Vault/VaultEngine';
import FocusEngine from './modules/Focus/FocusEngine';
import TacticalJournal from './modules/Journal/TacticalJournal';
import ArchitectProfile from './modules/Profile/ArchitectProfile';
import PWAInstallButton from './components/PWAInstallButton';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("React Error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '24px', color: '#ef4444', backgroundColor: '#090d16', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>Runtime Error Encountered:</h2>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '13px', color: '#fca5a5' }}>
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }}
            style={{ marginTop: '20px', padding: '10px 16px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px' }}
          >
            Clear Cache & Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function MainApp() {
  const [activeModule, setActiveModule] = useState('dashboard');

  return (
    <PuttyCanvas>
      <SovereignHeader currentModule={activeModule} onModuleChange={setActiveModule} />
      <main className="pt-24 pb-16 min-h-[80vh]">
        {activeModule === 'dashboard' && <Dashboard />}
        {activeModule === 'vault' && (VaultEngine ? <VaultEngine /> : <Dashboard />)}
        {activeModule === 'focus' && (FocusEngine ? <FocusEngine /> : <Dashboard />)}
        {activeModule === 'journal' && (TacticalJournal ? <TacticalJournal /> : <Dashboard />)}
        {activeModule === 'profile' && <ArchitectProfile />}
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
    <ErrorBoundary>
      <SovereignProvider>
        <MainApp />
      </SovereignProvider>
    </ErrorBoundary>
  );
}
