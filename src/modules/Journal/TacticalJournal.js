import React, { useState, useEffect } from 'react';
import { Plus, Trash2, FileText, CheckCircle2 } from 'lucide-react';

export default function TacticalJournal() {
  const [logs, setLogs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mt_engineering_logs')) || [
        { id: 1, date: '۱۴۰۵/۰۶/۰۶', title: 'بررسی نتایج آزمایش تراکم نسبی لایه زیراساس (بستر معابر)', category: 'عمران و نظارت' },
        { id: 2, date: '۱۴۰۵/۰۶/۰۵', title: 'بهینه‌سازی لایه Service Worker در PWA جهت افزایش سرعت لود آفلاین', category: 'توسعه نرم‌افزار' }
      ];
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('عمران و نظارت');

  useEffect(() => {
    try {
      localStorage.setItem('mt_engineering_logs', JSON.stringify(logs));
    } catch (e) {}
  }, [logs]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newLog = {
      id: Date.now(),
      date: new Intl.DateTimeFormat('fa-IR').format(new Date()),
      title: title.trim(),
      category
    };

    setLogs([newLog, ...logs]);
    setTitle('');
  };

  const handleDelete = (id) => {
    setLogs(logs.filter(l => l.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 space-y-4 text-right" dir="rtl">
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-gray-200 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900">دفترچه یادداشت و گزارش‌های مهندسی</h2>
        <p className="text-xs text-gray-500 mt-0.5">ثبت سریع رخدادهای کارگاهی، آزمون‌ها و ایده‌های فنی</p>
      </div>

      <form onSubmit={handleAdd} className="p-4 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="عنوان گزارش یا یادداشت فنی جدید را بنویسید..."
          className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-emerald-500"
        />
        
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-700 focus:outline-none"
          >
            <option value="عمران و نظارت">عمران و نظارت کارگاهی</option>
            <option value="بینایی ماشین">هوش مصنوعی و بینایی ماشین</option>
            <option value="توسعه نرم‌افزار">توسعه نرم‌افزار و وب</option>
          </select>
          
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>ثبت در دفترچه</span>
          </button>
        </div>
      </form>

      <div className="space-y-2">
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
