import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, Trash2, Tag, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

const DEFAULT_ENTRIES = [
  {
    id: 1,
    content: 'تمرکز بر یادگیری عمیق Computer Vision و پیاده‌سازی مدل‌های PyTorch برای زیرساخت‌های مهندسی.',
    category: 'تکنولوژی و هوش مصنوعی',
    date: '۱۴۰۵/۰۶/۰۵'
  },
  {
    id: 2,
    content: 'قانون اهرم: کدنویسی و انتشار محتوای تخصصی دو ستون اصلی خلق ارزش بدون نیاز به مجوز هستند.',
    category: 'استراتژی',
    date: '۱۴۰۵/۰۶/۰۱'
  },
  {
    id: 3,
    content: 'اجرای دقیق پروتکل ۹۰ دقیقه تاخیر کافئین صبحگاهی جهت تثبیت ترشح دوپامین و حذف افت انرژی عصرگاهی.',
    category: 'بیولوژی و عملکرد',
    date: '۱۴۰۵/۰۵/۲۸'
  }
];

const CATEGORIES = [
  'استراتژی',
  'تکنولوژی و هوش مصنوعی',
  'مهندسی و زیرساخت',
  'بیولوژی و عملکرد'
];

const TacticalJournal = () => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('pc_tactical_journal');
    return saved ? JSON.parse(saved) : DEFAULT_ENTRIES;
  });

  const [inputText, setInputText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [isSavedAlert, setIsSavedAlert] = useState(false);

  useEffect(() => {
    localStorage.setItem('pc_tactical_journal', JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (audioEngine?.playSfx) audioEngine.playSfx('click');

    const today = new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date());

    const newEntry = {
      id: Date.now(),
      content: inputText.trim(),
      category: selectedCategory,
      date: today
    };

    setEntries([newEntry, ...entries]);
    setInputText('');
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 2500);
  };

  const handleDeleteEntry = (id) => {
    if (audioEngine?.playSfx) audioEngine.playSfx('click');
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 text-right" dir="rtl">
      {/* Title Header */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-gold/20 text-center relative overflow-hidden">
        <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-mono block mb-2">TACTICAL LOG</span>
        <h2 className="text-2xl sm:text-4xl font-black text-white mb-2">
          ژورنال تاکتیکی و <span className="gold-text">بصیرت‌ها</span>
        </h2>
        <p className="text-xs sm:text-sm text-white/60 max-w-lg mx-auto font-light leading-relaxed">
          ثبت تصمیمات استراتژیک، درس‌آموخته‌های پروژه‌ها و ایده‌های کلیدی در پایگاه داده محلی.
        </p>
      </div>

      {/* Entry Input Form */}
      <form onSubmit={handleAddEntry} className="glass p-5 sm:p-7 rounded-3xl border border-white/10 space-y-4">
        <div>
          <label className="text-xs text-white/70 block mb-2 font-medium">ثبت بصیرت استراتژیک جدید یا نتیجه‌گیری مهم:</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            placeholder="ایده، تصمیم استراتژیک یا تحلیل سیستماتیک خود را بنویسید..."
            className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/50 transition-all resize-none leading-relaxed"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
          {/* Category Dropdown */}
          <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-xl px-3 py-2">
            <Tag className="w-4 h-4 text-gold" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-xs text-white/80 focus:outline-none cursor-pointer"
            >
              {CATEGORIES.map((cat, i) => (
                <option key={i} value={cat} className="bg-black text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="py-3 px-6 bg-gold text-black rounded-xl font-bold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:bg-gold-light transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
          >
            <Plus className="w-4 h-4" />
            ثبت در حافظه تاکتیکی
          </button>
        </div>

        {/* Confirmation Toast */}
        <AnimatePresence>
          {isSavedAlert && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              بصیرت تاکتیکی با موفقیت ذخیره شد.
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Entries List */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gold" />
            <span>بایگانی بصیرت‌های ثبت‌شده ({entries.length})</span>
          </h3>
        </div>

        <AnimatePresence>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-5 rounded-2xl border border-white/10 hover:border-gold/20 transition-all relative group"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-gold bg-gold/10 border border-gold/20 px-2.5 py-0.5 rounded-full">
                    {entry.category}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-white/40">
                    <Calendar className="w-3 h-3" />
                    <span>{entry.date}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="text-white/30 hover:text-rose-400 transition-colors p-1"
                    title="حذف یادداشت"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light whitespace-pre-line">
                {entry.content}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TacticalJournal;
