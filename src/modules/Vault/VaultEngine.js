import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Shield, Key, Eye, EyeOff, Plus, Trash2, CheckCircle2, FileText } from 'lucide-react';
import { useSovereign } from '../../context/SovereignContext';
import { cryptoEngine } from '../../core/crypto/cryptoEngine';
import { dbStorage } from '../../storage/db';
import { liveSynth } from '../../core/audio/BinauralEngine';

const PROTOCOLS = [
  {
    id: 'v1',
    cost: 0,
    title: 'پروتکل ۱: شکستن مقاومت و استارت فوری (قانون ۵ ثانیه عصب‌شناختی)',
    desc: 'مکانیسم بیولوژیک خروج از اینرسی و خاموش کردن قشر پیش‌پیشانی در زمان اهمال‌کاری.',
    content: 'هر زمان تکانه‌ای برای اقدام سازنده حس کردید، از ۵ تا ۱ معکوس بشمارید و در ثانیه ۱ فوراً دست به عمل فیزیکی بزنید. شمارش معکوس مدار پیش‌فرض مغز (DMN) را متوقف کرده و کنترل را به قشر حرکتی منتقل می‌کند.'
  },
  {
    id: 'v2',
    cost: 400,
    title: 'پروتکل ۲: بلوک‌های اولترادین و غرقگی ۹۰ دقیقه‌ای',
    desc: 'همگام‌سازی چرخه‌های زیستی مغز با ریتم‌های کار عمیق برای بهینه‌سازی دوپامین.',
    content: 'مغز انسان بر اساس ریتم‌های اولترادین در بازه‌های ۹۰ دقیقه‌ای به اوج تمرکز می‌رسد. پس از هر بلوک ۹۰ دقیقه‌ای، حداقل ۲۰ دقیقه استراحت حسی کامل (بدون نمایشگر) برای بازسازی استیل‌کولین در سیناپس‌ها ضروری است.'
  },
  {
    id: 'v3',
    cost: 800,
    title: 'پروتکل ۳: مهندسی محیط و حذف اصطکاک تصمیم‌گیری',
    desc: 'طراحی فضای فیزیکی و دیجیتال برای به صفر رساندن اتلاف اراده.',
    content: 'اراده یک منبع بیولوژیک محدود است. تمام انتخاب‌های غیرضروری روزانه را با روتین‌های ثابت جایگزین کنید. تلفن همراه و محرک‌های بصری باید خارج از میدان دید مستقیم میز کار قرار گیرند.'
  },
  {
    id: 'v4',
    cost: 1500,
    title: 'پروتکل ۴: بازسازی شبانه‌روزی و فرکانس‌های نور خورشید',
    desc: 'تنظیم ساعت بیولوژیک از طریق دریافت فوتون‌های صبحگاهی و قطع نور آبی.',
    content: 'ظرف ۳۰ دقیقه پس از بیداری، ۳ تا ۵ دقیقه نور طبیعی مستقیم خورشید دریافت کنید. این امر ترشح کورتیزول سالم صبحگاهی را فعال کرده و تایمر ترشح ملاتونین را برای خواب عمیق شبانه دقیقاً ۱۶ ساعت بعد کوک می‌کند.'
  }
];

const VaultEngine = () => {
  const { coins, spendCoins, unlockedItems, setUnlockedItems } = useSovereign();
  const [activeItem, setActiveItem] = useState(null);

  // بخش یادداشت‌های رمزنگاری‌شده شخصی
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteBody, setNoteBody] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [decryptedNotes, setDecryptedNotes] = useState({});

  useEffect(() => {
    loadEncryptedNotes();
  }, []);

  const loadEncryptedNotes = async () => {
    const saved = await dbStorage.getAll('vault_secure_notes');
    setNotes(saved || []);
  };

  const handleUnlockProtocol = (item) => {
    if (unlockedItems.includes(item.id)) {
      setActiveItem(item);
      liveSynth.playClickSfx();
      return;
    }

    if (coins >= item.cost) {
      if (spendCoins(item.cost)) {
        setUnlockedItems([...unlockedItems, item.id]);
        setActiveItem(item);
        liveSynth.playSuccessSfx();
      }
    } else {
      liveSynth.playClickSfx();
      alert('موجودی سکه برای بازگشایی این پروتکل کافی نیست.');
    }
  };

  const handleCreateEncryptedNote = async (e) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteBody.trim() || !passphrase.trim()) {
      alert('لطفاً عنوان، متن یادداشت و رمز عبور رمزنگاری را وارد کنید.');
      return;
    }

    liveSynth.playClickSfx();
    const encryptedData = await cryptoEngine.encrypt(noteBody.trim(), passphrase.trim());
    const newRecord = {
      id: Date.now().toString(),
      title: noteTitle.trim(),
      encryptedPayload: encryptedData,
      createdAt: new Date().toISOString()
    };

    await dbStorage.put('vault_secure_notes', newRecord);
    setNoteTitle('');
    setNoteBody('');
    setPassphrase('');
    loadEncryptedNotes();
    liveSynth.playSuccessSfx();
  };

  const handleDecryptNote = async (noteId, encryptedPayload) => {
    const pass = prompt('رمز عبور امنیتی برای رمزگشایی AES-GCM این یادداشت را وارد کنید:');
    if (!pass) return;

    const plaintext = await cryptoEngine.decrypt(encryptedPayload, pass);
    if (plaintext) {
      setDecryptedNotes(prev => ({ ...prev, [noteId]: plaintext }));
      liveSynth.playSuccessSfx();
    } else {
      alert('رمز عبور نادرست است یا داده‌ها مخدوش شده‌اند.');
    }
  };

  const handleDeleteNote = async (id) => {
    liveSynth.playClickSfx();
    await dbStorage.delete('vault_secure_notes', id);
    loadEncryptedNotes();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 text-right" dir="rtl">
      {/* Header */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-gold/20 text-center relative overflow-hidden">
        <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-mono block mb-2">SOVEREIGN ARCHIVE & ENCRYPTION</span>
        <h2 className="text-2xl sm:text-4xl font-black text-white mb-2">
          گاوصندوق <span className="gold-text">اسناد و یادداشت‌های رمزنگاری‌شده</span>
        </h2>
        <p className="text-xs sm:text-sm text-white/60 max-w-lg mx-auto font-light leading-relaxed">
          دسترسی به پروتکل‌های ذهنی آزادشده و ایجاد یادداشت‌های شخصی با رمزنگاری ۲۵۶ بیتی Web Crypto API.
        </p>
      </div>

      {/* Protocols Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROTOCOLS.map((item) => {
          const isUnlocked = unlockedItems.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => handleUnlockProtocol(item)}
              className={`glass p-6 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isUnlocked ? 'border-gold/30 hover:border-gold' : 'border-white/10 opacity-75 hover:opacity-100'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono text-gold uppercase tracking-wider">{item.id.toUpperCase()}</span>
                  {isUnlocked ? (
                    <span className="text-xs text-emerald-400 flex items-center gap-1 font-bold">
                      <Unlock className="w-3.5 h-3.5" /> گشوده شده
                    </span>
                  ) : (
                    <span className="text-xs text-amber-300 font-mono font-bold flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> {item.cost} SC
                    </span>
                  )}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-xs text-gold">
                <span>{isUnlocked ? 'مشاهده سند کامل' : 'آزادسازی با سکه'}</span>
                <span>←</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Protocol Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-gold/40 space-y-4 text-right"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h3 className="font-bold text-sm sm:text-base text-white">{activeItem.title}</h3>
                <button onClick={() => setActiveItem(null)} className="text-white/40 hover:text-white text-xs">بستن ✕</button>
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed whitespace-pre-line">{activeItem.content}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AES-GCM Encrypted Notes Section */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Key className="w-5 h-5 text-gold" />
          <h3 className="text-sm sm:text-base font-bold text-white">ایجاد یادداشت محرمانه با رمزنگاری ۲۵۶ بیتی (AES-GCM)</h3>
        </div>

        <form onSubmit={handleCreateEncryptedNote} className="space-y-3">
          <input
            type="text"
            placeholder="عنوان یادداشت..."
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-gold"
          />
          <textarea
            rows="3"
            placeholder="متن محرمانه (این متن پیش از ذخیره در دیتابیس مستقیماً رمزنگاری می‌شود)..."
            value={noteBody}
            onChange={(e) => setNoteBody(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-gold"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="password"
              placeholder="رمز عبور اختصاصی این یادداشت..."
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              className="flex-1 bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="py-3 px-6 bg-gold text-black rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-gold-light transition-all"
            >
              <Plus className="w-4 h-4" /> رمزنگاری و ثبت در گاوصندوق
            </button>
          </div>
        </form>

        {/* Encrypted Notes List */}
        <div className="space-y-3 pt-2">
          {notes.map((n) => {
            const isDecrypted = Boolean(decryptedNotes[n.id]);
            return (
              <div key={n.id} className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs sm:text-sm text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gold" /> {n.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecryptNote(n.id, n.encryptedPayload)}
                      className="text-xs px-3 py-1 rounded-lg bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20 flex items-center gap-1"
                    >
                      {isDecrypted ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isDecrypted ? 'رمزگشایی شد' : 'رمزگشایی'}</span>
                    </button>
                    <button onClick={() => handleDeleteNote(n.id)} className="text-white/30 hover:text-rose-400 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-xs font-mono p-2.5 rounded-xl bg-black/60 border border-white/5 break-all">
                  {isDecrypted ? (
                    <span className="text-emerald-400 font-sans">{decryptedNotes[n.id]}</span>
                  ) : (
                    <span className="text-white/40">CIPHERTEXT: {n.encryptedPayload.ciphertext.substring(0, 48)}...</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VaultEngine;
