import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2, Flame, Award, Shield } from 'lucide-react';
import { useSovereign } from '../../context/SovereignContext';
import { audioEngine } from '../../services/audioEngine';

const PRESETS = [
  { id: 'p25', title: 'پومودورو', sub: '۲۵ دقیقه', duration: 25 * 60, reward: 25, badge: 'TACTICAL' },
  { id: 'p50', title: 'غرقگی عمیق', sub: '۵۰ دقیقه', duration: 50 * 60, reward: 55, badge: 'DEEP WORK' },
  { id: 'p90', title: 'چرخه اولترادین', sub: '۹۰ دقیقه', duration: 90 * 60, reward: 110, badge: 'PEAK FLOW' }
];

const FocusEngine = () => {
  const { addCoins, isAudioPlaying, toggleAudio, soundMode } = useSovereign();
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [timeLeft, setTimeLeft] = useState(PRESETS[0].duration);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSession, setCompletedSession] = useState(null);

  const timerRef = useRef(null);

  const totalDuration = selectedPreset.duration;
  const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleComplete = () => {
    setIsRunning(false);
    if (audioEngine?.playSfx) {
      audioEngine.playSfx('granted');
    }
    if (addCoins) {
      addCoins(selectedPreset.reward, `پاداش تمرکز: ${selectedPreset.title}`);
    }
    setCompletedSession(selectedPreset);
  };

  const handleSelectPreset = (preset) => {
    setIsRunning(false);
    setSelectedPreset(preset);
    setTimeLeft(preset.duration);
    if (audioEngine?.playSfx) {
      audioEngine.playSfx('click');
    }
  };

  const toggleTimer = () => {
    if (audioEngine?.playSfx) {
      audioEngine.playSfx('click');
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    if (audioEngine?.playSfx) {
      audioEngine.playSfx('click');
    }
    setIsRunning(false);
    setTimeLeft(selectedPreset.duration);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 text-right" dir="rtl">
      {/* Title Header */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-gold/20 text-center relative overflow-hidden">
        <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-mono block mb-2">NEURAL FOCUS ENGINE</span>
        <h2 className="text-2xl sm:text-4xl font-black text-white mb-2">
          پروتکل <span className="gold-text">تمرکز و غرقگی عمیق</span>
        </h2>
        <p className="text-xs sm:text-sm text-white/60 max-w-lg mx-auto font-light leading-relaxed">
          تمرکز کامل بر تسک‌های با ارزش بالا همراه با امواج صوتی دوگوشی و استخراج سکه‌های حاکمیتی.
        </p>
      </div>

      {/* Timer Presets */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {PRESETS.map((preset) => {
          const isSelected = selectedPreset.id === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`p-3 sm:p-4 rounded-2xl border transition-all flex flex-col items-center justify-center text-center ${
                isSelected
                  ? 'bg-gold text-black border-gold font-bold shadow-[0_0_20px_rgba(212,175,55,0.35)] scale-[1.02]'
                  : 'glass text-white/70 border-white/10 hover:border-gold/30 hover:text-white'
              }`}
            >
              <span className={`text-[8px] sm:text-[9px] font-mono tracking-widest block mb-1 uppercase ${isSelected ? 'text-black/60' : 'text-gold'}`}>
                {preset.badge}
              </span>
              <span className="text-xs sm:text-sm font-bold block">{preset.title}</span>
              <span className={`text-[10px] sm:text-xs block mt-0.5 ${isSelected ? 'text-black/80' : 'text-white/40'}`}>
                {preset.sub}
              </span>
            </button>
          );
        })}
      </div>

      {/* Circular Timer Display */}
      <div className="glass p-8 sm:p-12 rounded-3xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 240 240">
            {/* Background Track */}
            <circle
              cx="120"
              cy="120"
              r="100"
              className="stroke-white/5"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Active Gold Progress Track */}
            <circle
              cx="120"
              cy="120"
              r="100"
              className="stroke-gold transition-all duration-500"
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 100}
              strokeDashoffset={(2 * Math.PI * 100) * (1 - progressPercent / 100)}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center Timer Numeric Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
            <span className="font-mono text-4xl sm:text-5xl font-black text-white tracking-widest" dir="ltr">
              {formatTime(timeLeft)}
            </span>
            <span className="text-[10px] font-mono tracking-[0.3em] text-gold uppercase mt-2">
              {isRunning ? 'FLOW ACTIVE' : 'STANDBY'}
            </span>
            <span className="text-[9px] text-white/40 font-mono mt-1">
              پاداش: +{selectedPreset.reward} SC
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={resetTimer}
            className="p-3.5 rounded-2xl glass border border-white/10 text-white/60 hover:text-white hover:border-gold/30 transition-all active:scale-95"
            title="شروع مجدد تایمر"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTimer}
            className={`px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center gap-2 ${
              isRunning
                ? 'bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]'
                : 'bg-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:bg-gold-light'
            } active:scale-95`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                توقف موقت
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                آغاز غرقگی
              </>
            )}
          </button>

          <button
            onClick={() => toggleAudio()}
            className={`p-3.5 rounded-2xl border transition-all active:scale-95 ${
              isAudioPlaying
                ? 'bg-gold/10 border-gold text-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'glass border-white/10 text-white/40 hover:text-white'
            }`}
            title="امواج صوتی مغزی"
          >
            {isAudioPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {completedSession && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass p-6 sm:p-8 rounded-3xl max-w-sm w-full border border-gold/40 text-center relative space-y-4 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                <Award className="w-8 h-8 animate-bounce" />
              </div>

              <div>
                <span className="text-[9px] font-mono text-gold tracking-widest uppercase block mb-1">SESSION COMPLETE</span>
                <h3 className="text-xl font-bold text-white">پایان موفقیت‌آمیز نشست تمرکز</h3>
                <p className="text-xs text-white/60 mt-1">
                  چرخه «{completedSession.title}» با موفقیت تکمیل گردید.
                </p>
              </div>

              <div className="bg-black/60 p-4 rounded-2xl border border-white/10">
                <span className="text-[10px] text-white/40 block mb-1">اعتبار پاداش واریزشده</span>
                <span className="text-xl font-mono font-bold text-gold">+{completedSession.reward} SC</span>
              </div>

              <button
                onClick={() => {
                  setCompletedSession(null);
                  setTimeLeft(selectedPreset.duration);
                }}
                className="w-full py-3 bg-gold text-black font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:bg-gold-light transition-all"
              >
                ثبت و ادامه
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FocusEngine;
