import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Upload, Cpu, CheckCircle2, AlertTriangle, RefreshCw, Sparkles, Layers } from 'lucide-react';
import { liveSynth } from '../../core/audio/BinauralEngine';
import { ImageProcessor } from '../../core/ai/imageProcessor';

const VisionLab = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [sensitivity, setSensitivity] = useState(65);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      liveSynth.playClickSfx();
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setProcessedImage(null);
        setMetrics(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunAnalysis = async () => {
    if (!selectedImage) return;
    liveSynth.playClickSfx();
    setIsAnalyzing(true);

    try {
      const result = await ImageProcessor.analyzeImage(selectedImage, Number(sensitivity));
      setProcessedImage(result.processedCanvasUrl);
      setMetrics(result);
      liveSynth.playSuccessSfx();
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 text-right" dir="rtl">
      {/* Header */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-gold/20 text-center relative overflow-hidden">
        <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-mono block mb-2">CLIENT-SIDE COMPUTER VISION</span>
        <h2 className="text-2xl sm:text-4xl font-black text-white mb-2">
          موتور بینایی ماشین و <span className="gold-text">استخراج ترک‌های بتن</span>
        </h2>
        <p className="text-xs sm:text-sm text-white/60 max-w-lg mx-auto font-light leading-relaxed">
          پردازش محلی ماتریس تصویر با عملگر سوبل (Sobel Gradient) جهت استخراج الگوی هندسی ترک‌ها بدون ارسال عکس به سرور.
        </p>
      </div>

      {/* Main Vision Workspace */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Original View */}
          <div className="space-y-2">
            <span className="text-xs text-white/70 block font-bold">۱. تصویر ورودی المان سازه:</span>
            {selectedImage ? (
              <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10 bg-black/50 flex items-center justify-center">
                <img src={selectedImage} alt="ورودی" className="w-full h-full object-contain" />
              </div>
            ) : (
              <label className="h-64 rounded-2xl border-2 border-dashed border-white/20 hover:border-gold/50 flex flex-col items-center justify-center p-6 cursor-pointer bg-black/30 transition-all">
                <Upload className="w-8 h-8 text-gold mb-2" />
                <span className="text-xs font-bold text-white mb-1">انتخاب تصویر المان بتنی / آسفالت</span>
                <span className="text-[10px] text-white/40 font-mono">PNG, JPG, WEBP</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            )}
          </div>

          {/* Processed Edge Detection View */}
          <div className="space-y-2">
            <span className="text-xs text-white/70 block font-bold">۲. نقشه استخراج گرادیان ترک‌ها (Sobel Edges):</span>
            <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10 bg-black/70 flex items-center justify-center">
              {processedImage ? (
                <img src={processedImage} alt="پردازش شده" className="w-full h-full object-contain" />
              ) : (
                <div className="text-center p-4 text-white/30 text-xs">
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center gap-2">
                      <RefreshCw className="w-6 h-6 text-gold animate-spin" />
                      <span>در حال پیمایش ماتریس پیکسل‌ها...</span>
                    </div>
                  ) : (
                    'پس از اجرای تحلیل، نقشه ترک‌ها در این کادر رسم می‌شود'
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-black/40 p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-1/2 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-white/60">آستانه حساسیت فیلتر (Threshold):</span>
              <span className="font-mono text-gold font-bold">{sensitivity}</span>
            </div>
            <input
              type="range"
              min="30"
              max="120"
              value={sensitivity}
              onChange={(e) => setSensitivity(e.target.value)}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {selectedImage && (
              <label className="py-3 px-4 glass text-white/70 hover:text-white rounded-xl text-xs font-bold cursor-pointer transition-all border border-white/10">
                تصویر جدید
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            )}

            <button
              onClick={handleRunAnalysis}
              disabled={!selectedImage || isAnalyzing}
              className="flex-1 sm:flex-none py-3 px-6 bg-gold text-black rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:bg-gold-light transition-all disabled:opacity-40"
            >
              {isAnalyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Cpu className="w-4 h-4" />}
              <span>محاسبه و تفکیک لبه‌های ترک</span>
            </button>
          </div>
        </div>

        {/* Metrics Report */}
        <AnimatePresence>
          {metrics && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  خروجی محاسبات ماتریسی تصویر
                </span>
                <span className="text-[10px] font-mono text-gold">Algorithm: Sobel 3x3 Conv</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 glass rounded-xl border border-white/10">
                  <span className="text-[10px] text-white/40 block mb-1">تراکم لبه‌های عارضه</span>
                  <span className="text-sm font-mono font-bold text-gold" dir="ltr">{metrics.crackRatio}%</span>
                </div>
                <div className="p-3 glass rounded-xl border border-white/10">
                  <span className="text-[10px] text-white/40 block mb-1">تعداد پیکسل‌های ناپیوستگی</span>
                  <span className="text-sm font-mono font-bold text-white" dir="ltr">{metrics.crackCount} px</span>
                </div>
                <div className="p-3 glass rounded-xl border border-white/10 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-white/40 block mb-1">ارزیابی سازه‌ای</span>
                  <span className={`text-xs font-bold ${metrics.hasCrack ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {metrics.severity}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VisionLab;
