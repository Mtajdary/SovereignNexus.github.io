import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, LayoutGrid, Cpu, Send, BookOpen, Layers } from 'lucide-react';

export default function SovereignHeader({ currentModule, onModuleChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'خدمات مهندسی (Services)', icon: LayoutGrid },
    { id: 'engineering-lab', label: 'موتور ابزارها و محاسبات (Tools Lab)', icon: Cpu },
    { id: 'knowledge', label: 'مشخصات فنی و استانداردها (Specs)', icon: BookOpen },
    { id: 'contact', label: 'استعلام پروژه و همکاری (Inquiries)', icon: Send },
  ];

  const handleSelect = (id) => {
    onModuleChange(id);
    setIsOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 px-4 sm:px-8 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3" dir="rtl">
          {/* نشان برند مهندسی بدون نام شخصی */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer shrink-0"
            onClick={() => handleSelect('dashboard')}
          >
            <div className="w-8 h-8 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex flex-col text-right">
              <span className="font-bold text-xs sm:text-sm tracking-tight text-slate-900 font-sans">
                Prime Crown <span className="text-slate-400 font-normal">| Labs</span>
              </span>
              <span className="text-[9px] text-slate-500 font-mono">
                Civil &amp; AI Engineering Suite
              </span>
            </div>
          </div>

          {/* منوی تمیز دسکتاپ */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* دکمه منوی موبایل */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200"
          >
            <Menu className="w-4 h-4" />
            <span>منو</span>
          </button>
        </div>
      </header>

      {/* منوی کشویی موبایل */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-slate-950/30 backdrop-blur-xs md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 bg-white shadow-2xl p-5 flex flex-col justify-between overflow-y-auto text-right md:hidden"
              dir="rtl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-bold text-xs text-slate-900 font-mono">PRIME CROWN LABS</span>
                  <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg bg-slate-100 text-slate-500">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentModule === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item.id)}
                        className={`w-full p-2.5 rounded-xl flex items-center gap-2.5 text-xs font-bold transition-all ${
                          isActive ? 'bg-slate-900 text-white' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="text-[10px] text-slate-400 text-center font-mono border-t border-slate-100 pt-3">
                Prime Crown &bull; Automated Systems
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
