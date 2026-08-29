import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Flame, Volume2, VolumeX, CheckCircle } from 'lucide-react';
import { useSovereign } from '../../context/SovereignContext';
import { liveSynth } from '../../core/audio/BinauralEngine';
import { dbStorage } from '../../storage/db';

const PRESETS = [
  { id: 'pomodoro', name: 'پومودورو کوتاه', time: 25 * 60, desc: '۲۵ دقیقه کار بدون وقفه + ۵ دقیقه استراحت' },
  { id: 'deep', name: 'تمرکز عمیق', time: 50 * 60, desc: '۵۰ دقیقه برای پروژه‌های تحلیلی و برنامه‌نویسی' },
  { id: 'long', name: 'ماراتن ۹۰ دقیقه‌ای', time: 90 * 60, desc: 'یک چرخه کامل تمرکز برای پیشبرد کارهای سنگین' }
];

const FocusEngine = () => {
  const { addCoins, isAudioPlaying, toggleAudio } = useSovereign();
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [timeLeft, setTimeLeft] = useState(PRESETS[0].time);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      handleComplete();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleComplete = async () => {
    setIsRunning(false);
    liveSynth.playSuccessSfx();
    const reward = Math.round(selectedPreset.time / 60);
    addCoins(reward);

    await dbStorage.put('focus_sessions', {
      id: Date.now().toString(),
      preset: selectedPreset.name,
      durationMinutes: reward,
      completedAt: new Date().toISOString()
    });

    alert(`عالی بود! بازه تمرکز شما تمام شد. ${reward} امتیاز به شما اضافه شد.`);
    setTimeLeft(selectedPreset.time);
  };

  const toggleTimer = () => {
    liveSynth.playClickSfx();
    if (!isRunning && !isAudioPlaying) {
      liveSynth.start('gamma');
      toggleAudio();
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    liveSynth.playClickSfx();
    setIsRunning(false);
    setTimeLeft(selectedPreset.time);
  };

  const handleSelectPreset = (preset) => {
    liveSynth.playClickSfx();
    setSelectedPreset(preset);
    setTimeLeft(preset.time);
    setIsRunning(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const progress = ((selectedPreset.time - timeLeft) / selectedPreset.time) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-right" dir="rtl">
      {/* هدر ساده */}
      <div className="glass p-6 rounded-3xl border border-gold/20 text-center">
        <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
          اتاق <span className="gold-text">تمرکز و کار عمیق</span>
        </h2>
        <p className="text-xs sm:text-sm text-white/60 font-light">
          گوشی را کنار بگذارید، یک بازه زمانی انتخاب کنید و تمام تمرکزتان را روی کار بگذارید.
        </p>
      </div>

      {/* انتخاب بازه زمانی */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSelectPreset(p)}
            className={`p-3.5 rounded-2xl border text-center transition-all ${
              selectedPreset.id === p.id
                ? 'bg-gold text-black border-gold font-bold shadow-[0_0_15px_rgba(212,175,55,0.35)]'
                : 'glass border-white/10 text-white/70 hover:text-white'
            }`}
          >
            <span className="block text-xs sm:text-sm font-bold mb-1">{p.name}</span>
            <span className="block text-[10px] opacity-75 font-mono">{Math.round(p.time / 60)} دقیقه</span>
          </button>
        ))}
      </div>

      {/* نمایشگر ساعت تمرکز */}
      <div className="glass p-8 sm:p-10 rounded-3xl border border-white/10 text-center relative overflow-hidden space-y-6">
        <div className="relative inline-flex items-center justify-center">
          <div className="font-mono text-5xl sm:text-7xl font-black text-white tracking-wider" dir="ltr">
            {formattedTime}
          </div>
        </div>

        {/* نوار پیشرفت */}
        <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/5">
          <div
            className="bg-gold h-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* دکمه‌های کنترل */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={resetTimer}
            className="p-3.5 rounded-2xl glass border border-white/10 text-white/60 hover:text-white hover:border-gold/30 transition-all"
            title="شروع مجدد"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTimer}
            className="py-3.5 px-8 rounded-2xl bg-gold text-black font-black text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:bg-gold-light transition-all active:scale-95"
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
            <span>{isRunning ? 'توقف موقت' : 'شروع تمرکز'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusEngine;
