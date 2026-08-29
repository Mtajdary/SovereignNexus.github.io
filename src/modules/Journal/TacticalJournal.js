import React, { useState } from 'react';
import { PenTool, Trash2, Plus, Tag, Calendar, Download, Sparkles } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

const TAGS = ['استراتژی', 'عمران و مهندسی', 'تکنولوژی و هوش مصنوعی', 'مدیریت مالی', 'یادداشت روزانه'];

const TacticalJournal = () => {
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pc_notes')) || [
        {
          id: 1,
          t: 'تمرکز بر یادگیری عمیق Computer Vision و پیاده‌سازی مدل‌های PyTorch برای زیرساخت‌های مهندسی.',
          tag: 'تکنولوژی و هوش مصنوعی',
          date: '۱۴۰۵/۰۶/۰۵'
        },
        {
          id: 2,
          t: 'اجرای اصل ۲۰/۸۰ در نظارت پروژه‌های راهسازی: تمرکز بر کیفیت مصالح دانه‌بندی و تراکم بستر.',
          tag: 'عمران و مهندسی',
          date: '۱۴۰۵/۰۶/۰۲'
        }
      ];
    } catch {
      return [];
    }
  });

  const [val, setVal] = useState('');
  const [selectedTag, setSelectedTag] = useState('استراتژی');

  const addNote = () => {
    if (val.trim()) {
      audioEngine.playSfx('reward');
      const newNotes = [
        {
          id: Date.now(),
          t: val.trim(),
          tag: selectedTag,
          date: new Date().toLocaleDateString('fa-IR')
        },
        ...notes
      ];
      setNotes(newNotes);
      localStorage.setItem('pc_notes', JSON.stringify(newNotes));
      setVal('');
    }
  };

  const delNote = (id) => {
    audioEngine.playSfx('click');
    const newNotes = notes.filter((n) => n.id !== id);
    setNotes(newNotes);
    localStorage.setItem('pc_notes', JSON.stringify(newNotes));
  };

  return (
    <div className="max-w-3xl mx-auto px-6 text-right space-y-8">
      <div>
        <span className="text-gold text-[10px] tracking-[0.4em] font-mono uppercase block mb-2">TACTICAL LOG</span>
        <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold">ژورنال تاکتیکی و بصیرت‌ها</h2>
        <p className="text-white/50 text-xs mt-2 font-light">ثبت تصمیمات، درس‌آموخته‌های پروژه‌ها و ایده‌های استراتژیک</p>
      </div>

      {/* Input Box */}
      <div className="glass p-6 rounded-3xl border border-gold/20 space-y-4">
        <textarea
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="ثبت بصیرت استراتژیک جدید یا نتیجه‌گیری مهم..."
          rows={3}
          className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-gold text-white font-sans text-sm resize-none"
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gold" />
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="bg-black/60 border border-white/10 text-white text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-gold"
            >
              {TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={addNote}
            className="px-8 py-3 bg-gold text-black font-bold text-xs rounded-xl gold-glow hover:bg-gold-light transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            ثبت در حافظه تاکتیکی
          </button>
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {notes.map((n) => (
          <div
            key={n.id}
            className="glass p-6 rounded-2xl border border-white/10 hover:border-gold/30 flex justify-between items-start gap-4 transition-all group"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-mono text-gold bg-gold/10 px-2.5 py-0.5 rounded-full border border-gold/20">
                  {n.tag}
                </span>
                <span className="text-[10px] text-white/40 font-mono flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {n.date}
                </span>
              </div>
              <p className="text-sm text-white/90 leading-relaxed font-light">{n.t}</p>
            </div>

            <button
              onClick={() => delNote(n.id)}
              className="text-white/20 group-hover:text-red-400 p-2 transition-colors focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
              title="حذف"
              aria-label="حذف یادداشت"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TacticalJournal;
