import React, { useState } from 'react';
import { Eye, Cpu, Activity, CheckCircle2, RefreshCw } from 'lucide-react';

export default function AIVisionLab() {
  const [selectedSample, setSelectedSample] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState({
    label: 'ترک سازه‌ای فعال (Positive - Cracked)',
    confidence: 98.4,
    crackWidth: '1.8 mm',
    severity: 'متوسط رو به شدید (نیازمند ترمیم تخصصی)',
    inferenceTime: '14.2 ms',
    features: ['انشعاب طولی', 'عرض متغیر', 'افت چسبندگی سنگدانه']
  });

  const samples = [
    { id: 1, name: 'نمونه ۱: ترک برشی تیر بتنی', type: 'cracked', desc: 'شکستگی مایل ناشی از تنش‌های برشی' },
    { id: 2, name: 'نمونه ۲: سطح بتن سالم و یکنواخت', type: 'intact', desc: 'بدون ناپیوستگی سطحی یا میکروترک' },
    { id: 3, name: 'نمونه ۳: میکروترک‌های جمع‌شدگی', type: 'cracked', desc: 'ترک‌های شبکه‌ای مویی ناشی از هیدراتاسیون' }
  ];

  const handleRunInference = (sampleId) => {
    setSelectedSample(sampleId);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      if (sampleId === 2) {
        setAnalysisResult({
          label: 'بتن سالم و بدون ترک (Negative - Intact)',
          confidence: 99.1,
          crackWidth: '0.0 mm',
          severity: 'مطلوب (فاقد هرگونه ریسک سازه‌ای)',
          inferenceTime: '12.8 ms',
          features: ['بافت سطحی همگن', 'توزیع یکنواخت ماتریس سیمان']
        });
      } else if (sampleId === 3) {
        setAnalysisResult({
          label: 'میکروترک جمع‌شدگی (Positive - Microcracks)',
          confidence: 94.7,
          crackWidth: '0.3 mm',
          severity: 'سطحی و غیربحرانی (پایش دوره‌ای)',
          inferenceTime: '15.1 ms',
          features: ['الگوی نامنظم مویی', 'عمق سطحی کمتر از ۵ میلی‌متر']
        });
      } else {
        setAnalysisResult({
          label: 'ترک سازه‌ای برشی (Positive - Cracked)',
          confidence: 98.4,
          crackWidth: '1.8 mm',
          severity: 'متوسط رو به شدید (نیازمند ترمیم تخصصی)',
          inferenceTime: '14.2 ms',
          features: ['انشعاب طولی', 'عرض متغیر', 'افت چسبندگی سنگدانه']
        });
      }
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-6 text-right font-sans" dir="rtl">
      {/* سربرگ */}
      <div className="clay-card p-6 sm:p-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100/80 border border-sky-300 text-sky-900 text-xs font-bold shadow-xs">
          <Eye className="w-4 h-4 text-sky-600" />
          <span>SHM AI INFERENCE PIPELINE</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">آزمایشگاه بینایی ماشین و پایش سلامت سازه</h2>
        <p className="text-xs text-slate-500 leading-relaxed">استنتاج بلادرنگ مدل ResNet-18 آموزش‌دیده در PyTorch جهت طبقه‌بندی خودکار ترک‌های بتن</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* انتخاب تصویر و نمونه */}
        <div className="clay-card p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
            انتخاب ورودی تصویر جهت تحلیل
          </h3>

          <div className="space-y-2.5">
            {samples.map((s) => (
              <button
                key={s.id}
                onClick={() => handleRunInference(s.id)}
                className={`w-full p-3.5 rounded-2xl text-right transition-all border flex items-center justify-between ${
                  selectedSample === s.id
                    ? 'border-sky-400 bg-sky-50/90 shadow-sm'
                    : 'border-slate-200 bg-white/70 hover:bg-slate-50'
                }`}
              >
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{s.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{s.desc}</p>
                </div>
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                  selectedSample === s.id ? 'bg-sky-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                }`}>
                  {s.id}
                </div>
              </button>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 font-mono text-xs shadow-inner">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1.5">
              <span>BACKBONE</span>
              <span className="text-sky-400 font-bold">ResNet-18 Transfer</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Resolution:</span>
              <span>224 × 224 × 3</span>
            </div>
          </div>
        </div>

        {/* نتایج استنتاج هوش مصنوعی */}
        <div className="clay-card p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-sm text-slate-900">خروجی استنتاج شبکه عصبی</h3>
              {isProcessing && (
                <span className="text-[11px] font-mono font-bold text-sky-600 flex items-center gap-1 animate-pulse">
                  <RefreshCw className="w-3 h-3 animate-spin" /> در حال پردازش...
                </span>
              )}
            </div>

            <div className={`p-4 rounded-2xl border text-center space-y-2 ${
              analysisResult.label.includes('Negative')
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}>
              <span className="text-xs font-bold block text-slate-600">کلاس شناسایی‌شده:</span>
              <h4 className="text-base sm:text-lg font-black">{analysisResult.label}</h4>
              <div className="flex items-center justify-center gap-4 pt-1 font-mono text-xs">
                <span>اطمینان مدل: <strong>{analysisResult.confidence}%</strong></span>
                <span>&bull;</span>
                <span>زمان استنتاج: <strong>{analysisResult.inferenceTime}</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block">عرض بازشدگی ترک</span>
                <span className="text-sm font-black font-mono text-slate-900">{analysisResult.crackWidth}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block">سطح ریسک مهندسی</span>
                <span className="text-xs font-bold text-slate-900">{analysisResult.severity}</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200 leading-relaxed font-mono">
            Pipeline: Convolutional Feature Extractor &rarr; GAP &rarr; Softmax
          </div>
        </div>
      </div>
    </div>
  );
}
