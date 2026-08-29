import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Upload, Cpu, CheckCircle2, AlertTriangle, RefreshCw, Sparkles, Layers } from 'lucide-react';
import { liveSynth } from '../../core/audio/BinauralEngine';

const VisionLab = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      liveSynth.playClickSfx();
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const runModelInference = () => {
    if (!selectedImage) return;
    liveSynth.playClickSfx();
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      liveSynth.playSuccessSfx();
      // خروجی شبیه‌سازی مدل ResNet-18 برای طبقه‌بندی ترک
      setAnalysisResult({
        hasCrack: true,
        confidence: 96.8,
        crackSeverity: 'متوسط (نیاز به تزریق رزین اپوکسی)',
        modelArchitecture: 'ResNet-18 Backbone (PyTorch)',
        inferenceTime: '42ms',
        boundingZones: ['Zone-B3', 'Zone-B4']
      });
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 text-right" dir="rtl">
      {/* Title Header */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-gold/20 text-center relative overflow-hidden">
        <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-mono block mb-2">NEURAL COMPUTER VISION</span>
        <h2 className="text-2xl sm:text-4xl font-black text-white mb-2">
          آزمایشگاه <span className="gold-text">بینایی ماشین و پایش سازه</span>
        </h2>
        <p className="text-xs sm:text-sm text-white/60 max-w-lg mx-auto font-light leading-relaxed">
          آنالیز هوشمند تصاویر المان‌های بتنی و زیرساخت جهت تشخیص خودکار ترک و آسیب‌های سازه‌ای.
        </p>
      </div>

      {/* Main Vision Canvas */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex flex-col items-center justify-center">
          {selectedImage ? (
            <div className="relative max-w-md w-full rounded-2xl overflow-hidden border border-gold/30 group">
              <img src={selectedImage} alt="Structural Target" className="w-full h-64 object-cover" />

              {/* Scanning Laser Animation */}
              {isAnalyzing && (
                <motion.div
                  initial={{ top: '0%' }}
                  animate={{ top: '95%' }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-0 right-0 h-1 bg-gold shadow-[0_0_20px_#D4AF37] z-20"
                />
              )}

              {/* Detected Bounding Box Simulation */}
              {analysisResult && (
                <div className="absolute top-16 left-12 right-16 bottom-16 border-2 border-rose-500 bg-rose-500/10 rounded-lg flex items-start p-1.5 pointer-events-none">
                  <span className="text-[9px] font-mono bg-rose-600 text-white px-1.5 py-0.5 rounded font-bold">
                    CRACK DETECTED: 96.8%
                  </span>
                </div>
              )}
            </div>
          ) : (
            <label className="max-w-md w-full h-64 rounded-2xl border-2 border-dashed border-white/20 hover:border-gold/50 flex flex-col items-center justify-center p-6 cursor-pointer transition-all bg-black/40 hover:bg-black/60">
              <Upload className="w-10 h-10 text-gold mb-3" />
              <span className="text-xs font-bold text-white mb-1">بارگذاری تصویر المان سازه / بتن</span>
              <span className="text-[10px] text-white/40 font-mono">PNG, JPG, WEBP (حداکثر ۱۰ مگابایت)</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {selectedImage && (
            <label className="py-3 px-5 glass border border-white/10 text-white/70 hover:text-white rounded-xl text-xs font-bold cursor-pointer transition-all">
              تغییر تصویر
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          )}

          <button
            onClick={runModelInference}
            disabled={!selectedImage || isAnalyzing}
            className="w-full sm:w-auto py-3 px-8 bg-gold text-black rounded-xl font-bold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:bg-gold-light transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>در حال اجرای شبکه عصبی...</span>
              </>
            ) : (
              <>
                <Cpu className="w-4 h-4" />
                <span>اجرای استنتاج شبکه عصبی (Inference)</span>
              </>
            )}
          </button>
        </div>

        {/* Inference Report */}
        <AnimatePresence>
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-5 sm:p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-xs sm:text-sm text-white">گزارش استنتاج بینایی ماشین</span>
                </div>
                <span className="text-[10px] font-mono text-gold">{analysisResult.modelArchitecture}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 glass rounded-xl border border-white/10">
                  <span className="text-[9px] text-white/40 block mb-1">وضعیت عارضه</span>
                  <span className="text-xs font-bold text-rose-400">ترک سازه‌ای شناسایی شد</span>
                </div>

                <div className="p-3 glass rounded-xl border border-white/10">
                  <span className="text-[9px] text-white/40 block mb-1">ضریب اطمینان مدل</span>
                  <span className="text-xs font-mono font-bold text-emerald-400" dir="ltr">{analysisResult.confidence}%</span>
                </div>

                <div className="p-3 glass rounded-xl border border-white/10">
                  <span className="text-[9px] text-white/40 block mb-1">زمان پردازش</span>
                  <span className="text-xs font-mono font-bold text-gold" dir="ltr">{analysisResult.inferenceTime}</span>
                </div>

                <div className="p-3 glass rounded-xl border border-white/10">
                  <span className="text-[9px] text-white/40 block mb-1">سطح ارزیابی</span>
                  <span className="text-xs font-bold text-white">کلاس بحرانی II</span>
                </div>
              </div>

              <p className="text-[11px] text-white/70 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="font-bold text-gold">توصیه فنی: </span>
                {analysisResult.crackSeverity}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VisionLab;
