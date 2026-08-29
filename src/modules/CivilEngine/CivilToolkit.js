import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Layers, HardHat, TrendingUp, CheckCircle, AlertTriangle, ShieldAlert } from 'lucide-react';
import { liveSynth } from '../../core/audio/BinauralEngine';

const CivilToolkit = () => {
  const [activeTab, setActiveTab] = useState('compaction'); // compaction | concrete | earthwork

  // ۱. محاسبات تراکم خاک
  const [gammaDryField, setGammaDryField] = useState('2.12');
  const [gammaDryMaxLab, setGammaDryMaxLab] = useState('2.20');
  const [moistureField, setMoistureField] = useState('8.5');
  const [optimumMoisture, setOptimumMoisture] = useState('9.0');

  // ۲. پیش‌بینی مقاومت بتن
  const [fckDesign, setFckDesign] = useState('30'); // MPa
  const [curingDays, setCuringDays] = useState('7');
  const [curingTemp, setCuringTemp] = useState('25');

  // ۳. احجام خاکی
  const [area1, setArea1] = useState('145'); // m2
  const [area2, setArea2] = useState('180'); // m2
  const [distance, setDistance] = useState('20'); // meters

  // محاسبات تراکم
  const rc = ((parseFloat(gammaDryField) / (parseFloat(gammaDryMaxLab) || 1)) * 100).toFixed(2);
  const moistureDiff = (parseFloat(moistureField) - parseFloat(optimumMoisture)).toFixed(1);
  const isCompactionPassed = parseFloat(rc) >= 95.0;

  // محاسبات مقاومت بتن (فرمول تخمین بلوغ زمانی بتن)
  const calculateConcreteStrength = () => {
    const fck = parseFloat(fckDesign) || 30;
    const t = parseFloat(curingDays) || 28;
    // ضریب مقاومت نسبت به ۲۸ روز بر اساس روابط تجربی ACI/CEB-FIP
    const beta = Math.exp(0.25 * (1 - Math.sqrt(28 / t)));
    const estimatedFcm = (fck * beta).toFixed(1);
    const percentage = ((estimatedFcm / fck) * 100).toFixed(1);
    return { estimatedFcm, percentage };
  };

  const concreteResult = calculateConcreteStrength();

  // محاسبات احجام خاکی (قاعده میانگین سطوح)
  const earthVolume = (((parseFloat(area1) + parseFloat(area2)) / 2) * parseFloat(distance)).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 text-right" dir="rtl">
      {/* Hero Header */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-gold/20 relative overflow-hidden text-center sm:text-right">
        <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-mono block mb-2">CIVIL INFRASTRUCTURE TOOLKIT</span>
        <h2 className="text-2xl sm:text-4xl font-black text-white mb-2">
          جعبه‌ابزار <span className="gold-text">مهندسی زیرساخت و خاک</span>
        </h2>
        <p className="text-xs sm:text-sm text-white/60 max-w-xl mx-auto sm:mx-0 font-light leading-relaxed">
          موتور محاسباتی میدانی برای تحلیل کنترل کیفی تراکم لایه‌های راه‌سازی، تخمین مقاومت فشاری بتن و احجام عملیات خاکی.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-black/50 p-1.5 rounded-2xl border border-white/10 gap-1">
        {[
          { id: 'compaction', label: 'تراکم خاک (پروکتور)', icon: Layers },
          { id: 'concrete', label: 'بلوغ مقاومت بتن', icon: HardHat },
          { id: 'earthwork', label: 'احجام عملیات خاکی', icon: Calculator }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                liveSynth.playClickSfx();
                setActiveTab(tab.id);
              }}
              className={`flex-1 py-3 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                isActive
                  ? 'bg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.35)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Module 1: Compaction Engine */}
      {activeTab === 'compaction' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-gold" />
              <span>تحلیل دانسیته خشک و درصد تراکم لایه (Relative Compaction)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-white/60 block mb-1">دانسیته خشک صحرایی (γd field - g/cm³):</label>
                <input
                  type="number"
                  step="0.01"
                  value={gammaDryField}
                  onChange={(e) => setGammaDryField(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-sm text-white font-mono focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-white/60 block mb-1">حداکثر دانسیته خشک آزمایشگاهی (γd max - g/cm³):</label>
                <input
                  type="number"
                  step="0.01"
                  value={gammaDryMaxLab}
                  onChange={(e) => setGammaDryMaxLab(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-sm text-white font-mono focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-white/60 block mb-1">رطوبت صحرایی لایه (%):</label>
                <input
                  type="number"
                  step="0.1"
                  value={moistureField}
                  onChange={(e) => setMoistureField(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-sm text-white font-mono focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-white/60 block mb-1">رطوبت بهینه آزمایشگاه (OMC - %):</label>
                <input
                  type="number"
                  step="0.1"
                  value={optimumMoisture}
                  onChange={(e) => setOptimumMoisture(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-sm text-white font-mono focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            {/* Results Output */}
            <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row justify-between items-center gap-4 ${isCompactionPassed ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block mb-0.5">COMPACTION RESULT</span>
                <div className="flex items-center gap-3">
                  <span className={`text-3xl font-mono font-black ${isCompactionPassed ? 'text-emerald-400' : 'text-rose-400'}`}>
                    RC = {rc}%
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${isCompactionPassed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                    {isCompactionPassed ? 'مورد تأیید (≥95%)' : 'نیاز به کوبش مجدد'}
                  </span>
                </div>
              </div>

              <div className="text-left font-mono text-xs text-white/70">
                <span>انحراف از رطوبت بهینه: </span>
                <span className={Math.abs(moistureDiff) <= 1.5 ? 'text-emerald-400' : 'text-amber-400'}>
                  {moistureDiff > 0 ? `+${moistureDiff}%` : `${moistureDiff}%`}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Module 2: Concrete Maturity */}
      {activeTab === 'concrete' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <HardHat className="w-4 h-4 text-gold" />
              <span>پیش‌بینی مقاومت فشاری بتن در سنین مختلف (Concrete Strength Maturity)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] text-white/60 block mb-1">رده مقاومتی مشخصه ۲۸ روزه (MPa):</label>
                <input
                  type="number"
                  value={fckDesign}
                  onChange={(e) => setFckDesign(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-sm text-white font-mono focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-white/60 block mb-1">سن نمونه‌گیری (روز):</label>
                <input
                  type="number"
                  value={curingDays}
                  onChange={(e) => setCuringDays(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-sm text-white font-mono focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-white/60 block mb-1">دمای عمل‌آوری (°C):</label>
                <input
                  type="number"
                  value={curingTemp}
                  onChange={(e) => setCuringTemp(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-sm text-white font-mono focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            {/* Results Output */}
            <div className="bg-gold/10 border border-gold/30 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-gold uppercase block mb-0.5">ESTIMATED STRENGTH</span>
                <span className="text-3xl font-mono font-black text-white">
                  {concreteResult.estimatedFcm} <span className="text-base text-gold">MPa</span>
                </span>
              </div>

              <div className="text-left font-mono text-xs text-white/80">
                <span className="block">درصد دستیابی به مقاومت ۲۸ روزه:</span>
                <span className="text-lg font-bold text-gold">{concreteResult.percentage}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Module 3: Earthwork Volumes */}
      {activeTab === 'earthwork' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-gold" />
              <span>محاسبه احجام خاکی بین دو مقطع عرضی (Average End Area Method)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] text-white/60 block mb-1">مساحت مقطع اول (A1 - m²):</label>
                <input
                  type="number"
                  value={area1}
                  onChange={(e) => setArea1(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-sm text-white font-mono focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-white/60 block mb-1">مساحت مقطع دوم (A2 - m²):</label>
                <input
                  type="number"
                  value={area2}
                  onChange={(e) => setArea2(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-sm text-white font-mono focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-white/60 block mb-1">فاصله دو مقطع (L - متر):</label>
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-sm text-white font-mono focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            {/* Results Output */}
            <div className="bg-black/60 border border-white/10 p-5 rounded-2xl flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block mb-0.5">TOTAL VOLUME</span>
                <span className="text-3xl font-mono font-black text-gold">
                  {earthVolume} <span className="text-base text-white/60">m³</span>
                </span>
              </div>
              <span className="text-xs text-white/50 font-light">فرمول: V = ((A1 + A2) / 2) × L</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CivilToolkit;
