import React from 'react';
import { Crown } from 'lucide-react';

export default function SovereignHeader({ currentModule, onModuleChange }) {
  const navItems = [
    { id: 'dashboard', label: 'صفحه اصلی' },
    { id: 'profile', label: 'درباره من و مهارت‌ها' },
    { id: 'projects', label: 'پروژه‌ها و مقالات' },
    { id: 'journal', label: 'دفترچه یادداشت مهندسی' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fafafa]/90 backdrop-blur-md border-b border-gray-200 px-4 sm:px-8 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3" dir="rtl">
        {/* برند و عنوان پلتفرم */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
          onClick={() => onModuleChange('dashboard')}
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <Crown className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-right">
            <span className="font-black text-xs sm:text-sm tracking-tight text-gray-900">
              محمد تاجداری
            </span>
            <span className="text-[10px] text-gray-500 font-mono">
              Prime Crown &bull; Engineering Lab
            </span>
          </div>
        </div>

        {/* منوی ناوبری کامپکت و بهینه برای موبایل */}
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
