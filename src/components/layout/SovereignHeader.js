import React from 'react';
import { Crown } from 'lucide-react';

export default function SovereignHeader({ currentModule, onModuleChange }) {
  const navItems = [
    { id: 'dashboard', label: 'صفحه اصلی' },
    { id: 'civil-tools', label: 'محاسبات عمران' },
    { id: 'structural-sim', label: 'شبیه‌ساز تنش سازه' },
    { id: 'ai-lab', label: 'بینایی ماشین' },
    { id: 'performance', label: 'پایش عملکرد' },
    { id: 'knowledge', label: 'پایگاه دانش' },
    { id: 'projects', label: 'پروژه‌ها' },
    { id: 'profile', label: 'درباره من' },
    { id: 'contact', label: 'رزومه و تماس' },
    { id: 'journal', label: 'یادداشت‌ها' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fafafa]/90 backdrop-blur-md border-b border-gray-200 px-3 sm:px-8 py-2.5">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3" dir="rtl">
        <div 
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
          onClick={() => onModuleChange('dashboard')}
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <Crown className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-right">
            <span className="font-black text-xs sm:text-sm tracking-tight text-gray-900">
              محمد تاجداری
            </span>
            <span className="text-[9px] sm:text-[10px] text-gray-500 font-mono">
              Civil &amp; AI Engineering
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-1 bg-gray-200/70 p-1 rounded-full overflow-x-auto no-scrollbar shrink-0">
          {navItems.map((item) => {
            const isActive = currentModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onModuleChange(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
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
