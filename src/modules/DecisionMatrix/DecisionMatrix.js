import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { liveSynth } from '../../core/audio/BinauralEngine';
import { getPersianDate } from '../../shared/utils/formatters';

const DEFAULT_TASKS = [
  { id: 1, title: 'طراحی خط لودر هوش مصنوعی در پروژه', impact: 9, effort: 4, category: 'اولویت طلایی (۲۰٪ اصلی)', completed: false },
  { id: 2, title: 'تنظیمات ظاهری و رنگ‌بندی هدر', impact: 3, effort: 6, category: 'کم‌ارزش یا حذف‌شدنی', completed: false },
  { id: 3, title: 'پیاده‌سازی ذخیره داده در دیتابیس', impact: 8, effort: 3, category: 'اولویت طلایی (۲۰٪ اصلی)', completed: true }
];

const DecisionMatrix = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('pc_matrix_tasks');
    return saved ? JSON.parse(saved) : DEFAULT_TASKS;
  });

  const [title, setTitle] = useState('');
  const [impact, setImpact] = useState(8);
  const [effort, setEffort] = useState(3);

  useEffect(() => {
    localStorage.setItem('pc_matrix_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const getPriority = (imp, eff) => {
    if (imp >= 6 && eff <= 5) return { name: 'اولویت طلایی (۲۰٪ اصلی)', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' };
    if (imp >= 6 && eff > 5) return { name: 'پروژه بزرگ و زمان‌بر', color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' };
    if (imp < 6 && eff <= 5) return { name: 'کارهای سریع و روزمره', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' };
    return { name: 'کم‌ارزش و وقت‌گیر (حذف کنید)', color: 'text-rose-400 border-rose-500/30 bg-rose-500/10' };
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    liveSynth.playClickSfx();
    const prio = getPriority(Number(impact), Number(effort));

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      impact: Number(impact),
      effort: Number(effort),
      category: prio.name,
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

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-right" dir="rtl">
      {/* هدر ساده و شفاف */}
      <div className="glass p-6 rounded-3xl border border-gold/20 text-center">
        <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
          اولویت‌بندی کارهای مهم <span className="gold-text">(قانون ۸۰/۲۰)</span>
        </h2>
        <p className="text-xs sm:text-sm text-white/60 font-light">
          کارهایی که بیشترین نتیجه را با کمترین اتلاف وقت به همراه دارند شناسایی کنید.
        </p>
      </div>

      {/* فرم ثبت تسک جدید */}
      <form onSubmit={handleAddTask} className="glass p-5 sm:p-6 rounded-3xl border border-white/10 space-y-4">
        <div>
          <label className="text-xs text-white/80 block mb-2 font-bold">چه کاری می‌خواهید انجام دهید؟</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="مثال: نوشتن گزارش پیشرفت کارگاه، مطالعه مبحث نهم..."
            className="w-full bg-black/40 border border-white/10 rounded-2xl p-3.5 text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-white/70">میزان اهمیت و نتیجه:</span>
              <span className="font-mono text-gold font-bold">{impact} از ۱۰</span>
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

          <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-white/70">انرژی و زمان موردنیاز:</span>
              <span className="font-mono text-white/70 font-bold">{effort} از ۱۰</span>
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

        <button
          type="submit"
          disabled={!title.trim()}
          className="w-full py-3 bg-gold text-black rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-gold-light transition-all disabled:opacity-40"
        >
          <Plus className="w-4 h-4" /> افزودن به لیست
        </button>
      </form>

      {/* لیست تسک‌ها */}
      <div className="space-y-2.5">
        <AnimatePresence>
          {tasks.map((t) => {
            const prio = getPriority(t.impact, t.effort);
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`glass p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  t.completed ? 'opacity-40 border-white/5' : 'border-white/10 hover:border-gold/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTask(t.id)}
                    className={`p-1 rounded-lg border transition-all ${
                      t.completed ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'border-white/20 text-transparent hover:border-gold'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 fill-current" />
                  </button>
                  <div>
                    <h4 className={`text-xs sm:text-sm font-bold text-white mb-1 ${t.completed ? 'line-through text-white/40' : ''}`}>
                      {t.title}
                    </h4>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full border ${prio.color}`}>
                      {prio.name}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(t.id)}
                  className="p-2 text-white/30 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DecisionMatrix;
