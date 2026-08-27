import React from 'react';
import { Crown } from 'lucide-react';

export default function SovereignHeader({ currentModule, onModuleChange }) {
  const navItems = [
    { id: 'dashboard', label: 'داشبورد' },
    { id: 'profile', label: 'معمار' },
    { id: 'vault', label: 'خزانه' },
    { id: 'journal', label: 'ژورنال' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fafafa]/90 backdrop-blur-md border-b border-gray-200 px-3 sm:px-6 py-2.5">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* لوگو و نام برند */}
        <div 
          className="flex items-center gap-2 cursor-pointer shrink-0" 
          onClick={() => onModuleChange('dashboard')}
        >
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <Crown className="w-4 h-4" />
          </div>
          <span className="font-black text-xs sm:text-sm tracking-tight text-gray-900">
            PRIME CROWN
          </span>
        </div>

        {/* ناوبری اسکرول‌پذیر و بهینه برای موبایل */}
        <nav className="flex items-center gap-1 bg-gray-200/70 p-1 rounded-full overflow-x-auto no-scrollbar shrink-0">
          {navItems.map((item) => {
            const isActive = currentModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onModuleChange(item.id)}
                className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#22c55e] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
