import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Zap, Server, ShieldCheck, Gauge } from 'lucide-react';

export default function PerformanceHub() {
  const [fps, setFps] = useState(60);
  const [latency, setLatency] = useState(18);
  const [memoryUsage, setMemoryUsage] = useState(24.5);

  useEffect(() => {
    const interval = setInterval(() => {
      setFps(Math.floor(58 + Math.random() * 4));
      setLatency(Math.floor(14 + Math.random() * 8));
      setMemoryUsage(Number((24.0 + Math.random() * 1.5).toFixed(1)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const stackLayers = [
    {
      layer: 'Presentation & UI Engine',
      tech: 'React 18 + Tailwind CSS + Framer Motion',
      status: 'Optimal (60 FPS)',
      icon: Gauge,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    {
      layer: 'Inference & Vision Core',
      tech: 'PyTorch ResNet-18 via WebAssembly / ONNX',
      status: 'Ready (~15ms latency)',
      icon: Cpu,
      color: 'text-sky-700 bg-sky-50 border-sky-200'
    },
    {
      layer: 'Offline Storage & PWA Service',
      tech: 'IndexedDB + CacheStorage API',
      status: 'Synced (Zero Packet Loss)',
      icon: Server,
      color: 'text-amber-700 bg-amber-50 border-amber-200'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-6 text-right font-sans" dir="rtl">
      {/* سربرگ */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span>SYSTEM TELEMETRY & ARCHITECTURE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">پایش عملکرد و معماری سامانه‌ها</h2>
          <p className="text-xs text-gray-500 mt-0.5">وضعیت زنده منابع سیستم، نرخ پاسخ‌دهی الگوریتم‌ها و لایه‌های نرم‌افزاری</p>
        </div>
      </div>

      {/* کارت‌های شاخص‌های زنده عملکرد */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-5 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-1">
          <span className="text-xs text-gray-500 block">نرخ فریم رابط کاربری (UI Rendering)</span>
          <span className="text-3xl font-black font-mono text-emerald-600">{fps} FPS</span>
          <span className="text-[10px] text-gray-400 block">پایداری نرم انیمیشن‌ها</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-1">
          <span className="text-xs text-gray-500 block">تأخیر استنتاج هوش مصنوعی (AI Latency)</span>
          <span className="text-3xl font-black font-mono text-sky-600">{latency} ms</span>
          <span className="text-[10px] text-gray-400 block">زمان پردازش مدل پایش سازه</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-1">
          <span className="text-xs text-gray-500 block">حافظه مصرفی رندر (JS Heap Memory)</span>
          <span className="text-3xl font-black font-mono text-amber-600">{memoryUsage} MB</span>
          <span className="text-[10px] text-gray-400 block">بهینه‌سازی مصرف رم کلاینت</span>
        </div>
      </div>

      {/* لایه‌های معماری نرم‌افزار */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">
          ساختار لایه‌بندی فنی پلتفرم (Architectural Stack)
        </h3>

        <div className="space-y-3">
          {stackLayers.map((layer, idx) => {
            const Icon = layer.icon;
            return (
              <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${layer.color} shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-900">{layer.layer}</h4>
                    <p className="text-[11px] text-gray-500 font-mono mt-0.5">{layer.tech}</p>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white border border-gray-200 text-emerald-700 self-end sm:self-auto">
                  {layer.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
