import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSovereign } from '../../context/SovereignContext';
import { Plus, Trash2, Calendar, FileText, CheckCircle } from 'lucide-react';

export default function TacticalJournal() {
  const { setPoints } = useSovereign() || {};
  const [logs, setLogs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pc_tactical_logs')) || [
        { id: 1, date: '2026-08-28', title: 'بررسی لایه‌های اساس و پایش ترک‌های کارگاهی', category: 'Civil & QC' },
        { id: 2, date: '2026-08-27', title: 'توسعه معماری PWA و اتصال لایه کشینگ آفلاین', category: 'Software' }
      ];
    } catch {
      return [];
    }
  });

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Civil & Ops');

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
    if (setPoints) setPoints(p => p + 50); // پاداش ثبت گزارش
  };

  const handleDelete = (id) => {
    setLogs(logs.filter(l => l.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-6 text-right" dir="rtl">
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900">ژورنال عملیاتی و گزارش‌های مهندسی</h2>
          <p className="text-xs text-gray-500 mt-1">ثبت مستندات کارگاهی، رصدهای ژئوتکنیک و تسک‌های استراتژیک</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
          +50 امتیاز به ازای هر لاگ
        </span>
      </div>

      <form onSubmit={handleAddLog} className="p-5 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="عنوان گزارش یا لاگ عملیاتی جدید را وارد کنید..."
          className="flex-1 px-4 py-2.5 rounded-full bg-gray-50 border border-gray-300 text-xs text-gray-900 focus:outline-none focus:border-emerald-500"
        />
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="px-4 py-2.5 rounded-full bg-gray-50 border border-gray-300 text-xs text-gray-700 focus:outline-none"
        >
          <option value="Civil & Ops">عمران و نظارت میدانی</option>
          <option value="Vision AI">هوش مصنوعی و بینایی ماشین</option>
          <option value="Software">توسعه نرم‌افزار و سیستم‌ها</option>
        </select>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>ثبت گزارش</span>
        </button>
      </form>

      <div className="space-y-3">
        {logs.map((log) => (
          <div key={log.id} className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gray-100 text-gray-600">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-gray-900">{log.title}</h4>
                <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-400 font-mono">
                  <span>{log.date}</span>
                  <span>&bull;</span>
                  <span className="text-emerald-700 font-semibold">{log.category}</span>
                </div>
              </div>
            </div>
            <button onClick={() => handleDelete(log.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
