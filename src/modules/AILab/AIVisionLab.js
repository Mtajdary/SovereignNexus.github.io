import React, { useState } from 'react';
import { Eye, Cpu, Activity, CheckCircle2, AlertTriangle, Layers, Play, RefreshCw, BarChart2 } from 'lucide-react';

export default function AIVisionLab() {
  const [selectedSample, setSelectedSample] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState({
    label: 'ترک سازه‌ای فعال (Positive - Cracked)',
    confidence: 98.4,
    crackWidth: '1.8 mm',
    severity: 'متوسط رو به شدید (نیاز به تزریق رزین اپوکسی)',
    inferenceTime: '14.2 ms',
    features: ['انشعاب طولی', 'عرض متغیر', 'افت چسبندگی سنگدانه']
  });

  const samples = [
    { id: 1, name: 'نمونه ۱: ترک برشی تیر بتنی', type: 'cracked', desc: 'شکستگی مایل ناشی از تنش‌های برشی' },
    { id: 2, name: 'نمونه ۲: سطح بتن سالم و یکنواخت', type: 'intact', desc: 'بدون ناپیوستگی سطحی یا میکروترک' },
    { id: 3, name: 'نمونه ۳: میکروترک‌های حرارتی/جمع‌شدگی', type: 'cracked', desc: 'ترک‌های شبکه‌ای مویی ناشی از هیدراتاسیون' }
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
      {/* سربرگ ماژول */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold border border-sky-200 mb-2">
            <Eye className="w-3.5 h-3.5 text-sky-600" />
            <span>STRUCTURAL HEALTH MONITORING (SHM)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">آزمایشگاه بینایی ماشین و تشخیص خودکار آسیب بتن</h2>
          <p className="text-xs text-gray-500 mt-0.5">پایپ‌لاین یادگیری عمیق ResNet-18 آموزش‌دیده در PyTorch جهت طبقه‌بندی تصاویر سازه‌ای</p>
        </div>
      </div>

      {/* بخش شبیه‌ساز استنتاج هوش مصنوعی */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* پنل انتخاب نمونه و تصویر ورودی */}
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">
            انتخاب ورودی تصویر جهت استنتاج مدل (Inference)
          </h3>

          <div className="space-y-2">
            {samples.map((s) => (
              <button
                key={s.id}
                onClick={() => handleRunInference(s.id)}
                className={`w-full p-3 rounded-2xl text-right transition-all border flex items-center justify-between ${
                  selectedSample === s.id
                    ? 'border-sky-400 bg-sky-50/70'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100/60'
                }`}
              >
                <div>
                  <h4 className="font-bold text-xs text-gray-900">{s.name}</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">{s.desc}</p>
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  selectedSample === s.id ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {s.id}
                </div>
              </button>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-gray-900 text-white space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-gray-400 border-b border-gray-800 pb-1.5">
              <span>MODEL ARCHITECTURE</span>
              <span className="text-sky-400 font-bold">ResNet-18 Pretrained</span>
            </div>
            <div className="flex items-center justify-between text-gray-300">
              <span>Input Resolution:</span>
              <span>224 x 224 x 3 (Normalized)</span>
            </div>
            <div className="flex items-center justify-between text-gray-300">
              <span>Framework:</span>
              <span className="text-emerald-400">PyTorch 2.x & CUDA</span>
            </div>
          </div>
        </div>

        {/* پنل نتایج پردازش و ویژگی‌های استخراج‌شده */}
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="font-bold text-sm text-gray-900">خروجی استنتاج شبکه عصبی</h3>
              {isProcessing && (
                <span className="text-[11px] font-mono font-bold text-sky-600 flex items-center gap-1 animate-pulse">
                  <RefreshCw className="w-3 h-3 animate-spin" /> در حال پردازش تنسور...
                </span>
              )}
            </div>

            {/* کارت نتیجه نهایی */}
            <div className={`p-4 rounded-2xl border text-center space-y-2 ${
              analysisResult.label.includes('Negative')
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}>
              <span className="text-xs font-bold block text-gray-600">کلاس پیش‌بینی‌شده (Prediction):</span>
              <h4 className="text-base sm:text-lg font-black">{analysisResult.label}</h4>
              <div className="flex items-center justify-center gap-4 pt-1 font-mono text-xs">
                <span>اطمینان مدل: <strong>{analysisResult.confidence}%</strong></span>
                <span>&bull;</span>
                <span>زمان استنتاج: <strong>{analysisResult.inferenceTime}</strong></span>
              </div>
            </div>

            {/* مشخصات مهندسی استخراج‌شده */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200">
                <span className="text-[10px] text-gray-500 block">تخمین عرض بازشدگی ترک</span>
                <span className="text-sm font-black font-mono text-gray-900">{analysisResult.crackWidth}</span>
              </div>
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200">
                <span className="text-[10px] text-gray-500 block">سطح ریسک مهندسی</span>
                <span className="text-xs font-bold text-gray-900">{analysisResult.severity}</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-gray-700 block mb-1.5">الگوهای بصری شناسایی‌شده:</span>
              <div className="flex flex-wrap gap-1.5">
                {analysisResult.features.map((f, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 text-[11px]">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-gray-500 bg-gray-50 p-2.5 rounded-xl border border-gray-200 leading-relaxed font-mono">
            Pipeline: Convolutional Feature Extractor &rarr; Global Average Pool &rarr; Softmax Classifier
          </div>
        </div>
      </div>
    </div>
  );
}
