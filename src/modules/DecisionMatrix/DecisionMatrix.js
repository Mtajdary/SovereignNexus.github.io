import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Plus, Trash2, CheckCircle2, AlertOctagon, TrendingUp, Zap, Sparkles, Filter } from 'lucide-react';
import { liveSynth } from '../../core/audio/BinauralEngine';
import { dbStorage } from '../../storage/db';
import { toPersianDigits, getPersianDate } from '../../shared/utils/formatters';

const DEFAULT_TASKS = [
  {
    id: 1,
    title: 'توسعه معماری شبکه عصبی بینایی ماشین در مرورگر',
    impact: 9,
    effort: 4,
    category: 'اهرم طلایی (Top 20%)',
    completed: false,
    date: '۱۴۰۵/۰۶/۰۵'
  },
  {
    id: 2,
    title: 'بازنویسی ماژول‌های فرانت‌اند و رفع باگ‌های جزئی استایل',
    impact: 4,
    effort: 7,
    category: 'حذف یا تفویض',
    completed: false,
    date: '۱۴۰۵/۰۶/۰۴'
  },
  {
    id: 3,
    title: 'تدوین پروتکل‌های بیولوژیک و خواب شبانه‌روزی',
    impact: 8,
    effort: 3,
    category: 'اهرم طلایی (Top 20%)',
    completed: true,
    date: '۱۴۰۵/۰۶/۰۱'
  }
];

const DecisionMatrix = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('pc_matrix_tasks');
    return saved ? JSON.parse(saved) : DEFAULT_TASKS;
  });

  const [title, setTitle] = useState('');
  const [impact, setImpact] = useState(8);
  const [effort, setEffort] = useState(3);
  const [filterMode, setFilterMode] = useState('all'); // all | leverage | delegate

  useEffect(() => {
    localStorage.setItem('pc_matrix_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const calculateLeverage = (imp, eff) => {
    return (imp / (eff || 1)).toFixed(1);
  };

  const getQuadrant = (imp, eff) => {
    if (imp >= 6 && eff <= 5) return { name: 'اهرم طلایی (Top 20%)', color: 'text-amber-400 border-amber-400/30 bg-amber-500/10' };
    if (imp >= 6 && eff > 5) return { name: 'سرمایه‌گذاری استراتژیک', color: 'text-blue-400 border-blue-400/30 bg-blue-500/10' };
    if (imp < 6 && eff <= 5) return { name: 'بهینه‌سازی / خودکارسازی', color: 'text-emerald-400 border-emerald-400/30 bg-emerald-500/10' };
    return { name: 'تله زمانی (حذف قطعی)', color: 'text-rose-400 border-rose-500/30 bg-rose-500/10' };
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    liveSynth.playClickSfx();
    const quadrant = getQuadrant(Number(impact), Number(effort));

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      impact: Number(impact),
      effort: Number(effort),
      category: quadrant.name,
      completed: false,
      date: getPersianDate()
    };

    setTasks([newTask, ...tasks]);
    setTitle('');
  };

  const toggleTask = (id) => {
    liveSynth.playClickSfx();
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    liveSynth.playClickSfx();
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filterMode === 'leverage') return t.impact >= 6 && t.effort <= 5;
    if (filterMode === 'completed') return t.completed;
    return true;
  });

  const leverageCount = tasks.filter(t => t.impact >= 6 && t.effort <= 5).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 text-right" dir="rtl">
      {/* Header */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-gold/20 text-center relative overflow-hidden">
        <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-mono block mb-2">STRATEGIC 80/20 MATRIX</span>
        <h2 className="text-2xl sm:text-4xl font-black text-white mb-2">
          ماتریس تصمیم‌گیری و <span className="gold-text">تفکر اهرمی</span>
        </h2>
        <p className="text-xs sm:text-sm text-white/60 max-w-lg mx-auto font-light leading-relaxed">
          محاسبه ضریب اهرم تصمیمات برای شناسایی ۲۰٪ اقداماتی که ۸۰٪ دستاوردهای کلیدی را خلق می‌کنند.
        </p>
      </div>

      {/* Task Creation Form */}
      <form onSubmit={handleAddTask} className="glass p-5 sm:p-7 rounded-3xl border border-white/10 space-y-4">
        <div>
          <label className="text-xs text-white/70 block mb-2 font-medium">عنوان تصمیم یا تسک راهبردی:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="مثال: راه‌اندازی خط توسعه نرم‌افزار هوش مصنوعی..."
            className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/50 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Impact Slider */}
          <div className="bg-black/40 p-4 rounded-2xl border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-white/70">میزان اثرگذاری (Impact):</span>
              <span className="font-mono font-bold text-gold">{impact} / ۱۰</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Effort Slider */}
          <div className="bg-black/40 p-4 rounded-2xl border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-white/70">انرژی و زمان موردنیاز (Effort):</span>
              <span className="font-mono font-bold text-white/60">{effort} / ۱۰</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={effort}
              onChange={(e) => setEffort(e.target.value)}
              className="w-full accent-white/40 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="text-xs text-white/50">
            ضریب اهرم تخمینی: <span className="font-mono font-bold text-gold">{calculateLeverage(impact, effort)}x</span>
          </div>

          <button
            type="submit"
            disabled={!title.trim()}
            className="py-3 px-6 bg-gold text-black rounded-xl font-bold text-xs sm:text-sm tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:bg-gold-light transition-all disabled:opacity-40"
          >
            <Plus className="w-4 h-4" />
            تحلیل و افزودن به ماتریس
          </button>
        </div>
      </form>

      {/* Task Filters */}
      <div className="flex items-center justify-between px-1">
        <div className="flex gap-2">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-xl text-xs transition-all ${filterMode === 'all' ? 'bg-gold text-black font-bold' : 'glass text-white/60'}`}
          >
            همه موارد ({tasks.length})
          </button>
          <button
            onClick={() => setFilterMode('leverage')}
            className={`px-3 py-1.5 rounded-xl text-xs transition-all ${filterMode === 'leverage' ? 'bg-gold text-black font-bold' : 'glass text-white/60'}`}
          >
            تسک‌های ۲۰٪ طلایی ({leverageCount})
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredTasks.map((t) => {
            const quad = getQuadrant(t.impact, t.effort);
            const lev = calculateLeverage(t.impact, t.effort);

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`glass p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                  t.completed ? 'opacity-40 border-white/5' : 'border-white/10 hover:border-gold/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleTask(t.id)}
                    className={`mt-0.5 p-1 rounded-lg border transition-all ${
                      t.completed ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'border-white/20 text-transparent hover:border-gold'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 fill-current" />
                  </button>

                  <div>
                    <h4 className={`text-xs sm:text-sm font-bold text-white mb-1.5 ${t.completed ? 'line-through text-white/40' : ''}`}>
                      {t.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${quad.color}`}>
                        {quad.name}
                      </span>
                      <span className="text-[10px] font-mono text-white/40">
                        اثر: {t.impact} | تلاش: {t.effort} | ضریب: {lev}x
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => deleteTask(t.id)}
                    className="p-2 text-white/30 hover:text-rose-400 transition-colors"
                    title="حذف تسک"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DecisionMatrix;
