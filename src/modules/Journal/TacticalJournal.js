import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, Trash2, Tag, Calendar } from 'lucide-react';
import { useStorage } from '../../shared/hooks/useStorage';
import { getPersianDate } from '../../shared/utils/formatters';
import { liveSynth } from '../../core/audio/BinauralEngine';

const CATEGORIES = ['تجربه کاری و مهندسی', 'پیشرفت شخصی', 'ایده نرم‌افزاری و هوش مصنوعی', 'برنامه فردا'];

const TacticalJournal = () => {
  const { data: entries, saveItem, removeItem } = useStorage('journal');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    liveSynth.playClickSfx();
    const newEntry = {
      id: Date.now().toString(),
      content: content.trim(),
      category,
      date: getPersianDate(),
      timestamp: new Date().toISOString()
    };

    await saveItem(newEntry);
    setContent('');
  };

  const handleDelete = async (id) => {
    liveSynth.playClickSfx();
    await removeItem(id);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-right" dir="rtl">
      {/* هدر ساده */}
      <div className="glass p-6 rounded-3xl border border-gold/20 text-center">
        <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
          ژورنال و <span className="gold-text">یادداشت‌های روزانه</span>
        </h2>
        <p className="text-xs sm:text-sm text-white/60 font-light">
          نکات مهم کارگاه، درس‌های پروژه‌ها و ایده‌های خود را ثبت کنید.
        </p>
      </div>

      {/* فرم ثبت یادداشت */}
      <form onSubmit={handleSubmit} className="glass p-5 rounded-3xl border border-white/10 space-y-3">
        <textarea
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="امروز چه دستاوردی داشتید یا چه نکته مهمی یاد گرفتید؟..."
          className="w-full bg-black/40 border border-white/10 rounded-2xl p-3.5 text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold"
        />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Tag className="w-4 h-4 text-gold shrink-0" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-black/50 border border-white/10 text-white text-xs rounded-xl p-2 focus:outline-none focus:border-gold w-full sm:w-auto"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900 text-white">{cat}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={!content.trim()}
            className="w-full sm:w-auto py-2.5 px-6 bg-gold text-black rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-gold-light transition-all disabled:opacity-40"
          >
            <Plus className="w-4 h-4" /> ذخیره یادداشت
          </button>
        </div>
      </form>

      {/* لیست یادداشت‌ها */}
      <div className="space-y-3">
        <AnimatePresence>
          {entries.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glass p-4 sm:p-5 rounded-2xl border border-white/10 hover:border-gold/30 transition-all space-y-2"
            >
              <div className="flex justify-between items-center text-[10px] text-white/50 border-b border-white/5 pb-2">
                <span className="font-bold text-gold">{item.category}</span>
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3 h-3" /> {item.date}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed whitespace-pre-line">
                {item.content}
              </p>
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-white/30 hover:text-rose-400 p-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TacticalJournal;
