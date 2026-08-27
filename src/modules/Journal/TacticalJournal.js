import React, { useState, useEffect } from 'react';
import { useSovereign } from '../../context/SovereignContext';
import { Plus, Trash2, FileText } from 'lucide-react';

export default function TacticalJournal() {
  const { setPoints } = useSovereign() || {};
  const [logs, setLogs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pc_tactical_logs')) || [
        { id: 1, date: '2026-08-28', title: 'بررسی لایه‌های اساس و پایش ترک‌های کارگاهی', category: 'عمران و نظارت' },
        { id: 2, date: '2026-08-27', title: 'توسعه معماری PWA و اتصال لایه کشینگ آفلاین', category: 'توسعه نرم‌افزار' }
      ];
    } catch {
      return [];
    }
  });

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('عمران و نظارت');

  useEffect(() => {
    try {
      localStorage.setItem('pc_tactical_logs', JSON.stringify(logs));
    } catch (e) {}
  }, [logs]);

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: newTitle.trim(),
      category: newCategory
    };

    setLogs([newEntry, ...logs]);
    setNewTitle('');
    if (setPoints) setPoints(p => p + 50);
  };

  const handleDelete = (id) => {
    setLogs(logs.filter(l => l.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 space-y-4 text-right" dir="rtl">
      {/* کارت سربرگ ژورنال */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">ژورنال عملیاتی و گزارش‌ها</h2>
          <p className="text-xs text-gray-500 mt-0.5">ثبت مستندات کارگاهی، آزمون‌ها و لاگ‌های توسعه</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 self-start sm:self-auto">
          +50 امتیاز به ازای هر گزارش
        </span>
      </div>

      {/* فرم ثبت گزارش ریسپانسیو */}
      <form onSubmit={handleAddLog} className="p-4 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-3">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="عنوان گزارش یا اقدام انجام‌شده..."
          className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-emerald-500"
        />
        
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-700 focus:outline-none"
          >
            <option value="عمران و نظارت">عمران و نظارت میدانی</option>
            <option value="بینایی ماشین">هوش مصنوعی و بینایی ماشین</option>
            <option value="توسعه نرم‌افزار">توسعه نرم‌افزار و سیستم‌ها</option>
          </select>
          
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>ثبت گزارش</span>
          </button>
        </div>
      </form>

      {/* لیست لاگ‌ها */}
      <div className="space-y-2.5">
        {logs.map((log) => (
          <div key={log.id} className="p-3.5 rounded-2xl bg-white border border-gray-200 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-xl bg-gray-100 text-gray-600 shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="truncate">
                <h4 className="font-bold text-xs text-gray-900 truncate">{log.title}</h4>
                <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-400 font-mono">
                  <span>{log.date}</span>
                  <span>&bull;</span>
                  <span className="text-emerald-700 font-semibold">{log.category}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => handleDelete(log.id)} 
              className="text-gray-400 hover:text-red-500 p-1.5 shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
