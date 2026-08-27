import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, User, Zap, BookOpen, Layers } from 'lucide-react';

export default function SovereignHeader({ currentModule, onModuleChange }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Zap },
    { id: 'profile', label: 'Architect Dossier', icon: User },
    { id: 'vault', label: 'Vault', icon: Layers },
    { id: 'journal', label: 'Journal', icon: BookOpen },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-white/70 border-b border-gray-200/80">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-black font-black shadow-sm">
          <Crown className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-sm tracking-tight text-gray-900">PRIME CROWN</span>
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 border border-gray-300/60">
            Sovereign v2
          </span>
        </div>
      </div>

      <nav className="flex items-center gap-1 bg-gray-100/90 p-1 rounded-full border border-gray-200 shadow-inner">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onModuleChange(item.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? 'bg-emerald-400 text-black shadow-sm scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}
