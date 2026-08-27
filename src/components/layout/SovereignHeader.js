import React from 'react';
import { Crown, Sparkles } from 'lucide-react';

export default function SovereignHeader({ currentModule, onModuleChange }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'profile', label: 'Architect' },
    { id: 'vault', label: 'Vault' },
    { id: 'journal', label: 'Journal' },
  ];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-3.5 backdrop-blur-md bg-[#fafafa]/80 border-b border-gray-200/80">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onModuleChange('dashboard')}>
        <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-sm">
          <Crown className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-black text-sm tracking-tight text-gray-900">PRIME CROWN</span>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
            Labs
          </span>
        </div>
      </div>

      <nav className="flex items-center gap-1 bg-gray-200/60 p-1 rounded-full border border-gray-300/50">
        {navItems.map((item) => {
          const isActive = currentModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onModuleChange(item.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
