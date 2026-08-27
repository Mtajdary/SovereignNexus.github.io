import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2 } from 'lucide-react';
import { useSovereign } from '../../context/SovereignContext';
import { audioEngine } from '../../services/audioEngine';

const FocusEngine = () => {
  const { recordFocusSession, isAudioPlaying, toggleAudio, soundMode, setSoundMode } = useSovereign();
  const [selectedDuration, setSelectedDuration] = useState(25); // 25, 50, 90 min
  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let timer = null;
    if (active && time > 0) {
      timer = setInterval(() => setTime((t) => t - 1), 1000);
    } else if (time === 0 && active) {
      setActive(false);
      audioEngine.stop();
      recordFocusSession(selectedDuration);
      setTime(selectedDuration * 60);
      alert(`پروتکل تمرکز ${selectedDuration} دقیقه‌ای با موفقیت کامل شد! پاداش به حساب شما افزوده شد.`);
    }
    return () => clearInterval(timer);
  }, [active, time, selectedDuration, recordFocusSession]);

  const handleStart = () => {
    audioEngine.playSfx('click');
    if (!active && !isAudioPlaying) {
      toggleAudio(soundMode);
    }
    setActive(!active);
  };

  const handleReset = (dur = selectedDuration) => {
    audioEngine.playSfx('click');
    setActive(false);
    audioEngine.stop();
    setSelectedDuration(dur);
    setTime(dur * 60);
  };

  const fmt = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  const totalSeconds = selectedDuration * 60;
  const progressPercent = ((totalSeconds - time) / totalSeconds) * 100;

  return (
    <div className="max-w-4xl mx-auto px-6 text-center py-6">
      <div className="mb-10">
        <span className="text-gold text-[10px] tracking-[0.4em] font-mono uppercase block mb-2">NEURAL FOCUS ENGINE</span>
        <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold">پروتکل تمرکز و غرقگی عمیق</h2>
        <p className="text-white/50 text-xs mt-2 font-light">تمرکز کامل بر تسک‌های با ارزش بالا همراه با امواج صوتی تنظیم فرکانس مغزی</p>
      </div>

      {/* Preset Duration Selector */}
      <div className="flex justify-center gap-3 mb-12">
        {[
          { m: 25, label: 'پومودورو استراتژیک (۲۵ دقیقه)' },
          { m: 50, label: 'غرقگی عمیق (۵۰ دقیقه)' },
          { m: 90, label: 'سیکل اولترا (۹۰ دقیقه)' }
        ].map((d) => (
          <button
            key={d.m}
            onClick={() => handleReset(d.m)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-mono transition-all ${
              selectedDuration === d.m
                ? 'bg-gold text-black font-bold gold-glow'
                : 'bg-white/5 text-white/60 border border-white/10 hover:border-gold/30'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Circular Timer Visualizer */}
      <div className="relative w-80 h-80 mx-auto flex items-center justify-center mb-12">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle cx="160" cy="160" r="150" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
          <motion.circle
            cx="160"
            cy="160"
            r="150"
            fill="transparent"
            stroke="#D4AF37"
            strokeWidth="4"
            strokeDasharray="942"
            strokeDashoffset={942 - (942 * progressPercent) / 100}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>

        <div className="text-center z-10">
          <p className="text-6xl sm:text-7xl font-mono font-bold text-white tracking-tight">{fmt(time)}</p>
          <span className="text-[10px] tracking-[0.3em] text-gold font-mono uppercase mt-2 block">
            {active ? 'PROTO-RUNNING' : 'STANDBY'}
          </span>
        </div>
      </div>

      {/* Controls & Sound Switcher */}
      <div className="flex items-center justify-center gap-6 mb-10">
        <button
          onClick={handleStart}
          className="px-10 py-4 bg-gold text-black font-bold text-sm rounded-2xl gold-glow hover:bg-gold-light transition-all flex items-center gap-2"
        >
          {active ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          <span>{active ? 'مکث' : 'شروع پروتکل'}</span>
        </button>

        <button
          onClick={() => handleReset()}
          className="p-4 bg-white/5 border border-white/10 text-white/60 hover:text-white rounded-2xl transition-all"
          title="بازنشانی"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Brainwave selector bar */}
      <div className="glass p-5 rounded-2xl max-w-md mx-auto border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-right">
          <Volume2 className="w-4 h-4 text-gold" />
          <span className="text-xs text-white/80">نوع موج همگام‌ساز:</span>
        </div>
        <div className="flex gap-2">
          {['ALPHA', 'THETA', 'GAMMA'].map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setSoundMode(mode);
                if (isAudioPlaying) audioEngine.startPreset(mode);
              }}
              className={`px-3 py-1 text-[10px] font-mono rounded-lg transition-all ${
                soundMode === mode ? 'bg-gold text-black font-bold' : 'bg-white/5 text-white/50 hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FocusEngine;
