import React, { useState } from 'react';
import { MapPin, Truck, Thermometer, Droplets, Wind, AlertCircle, CheckCircle2, TrendingUp, Calendar, Clock, HardHat } from 'lucide-react';

export default function SiteCommandCenter() {
  const [ambientTemp, setAmbientTemp] = useState(36); // دمای هوا (درجه سانتی‌گراد)
  const [humidity, setHumidity] = useState(25); // رطوبت نسبی (%)
  const [windSpeed, setWindSpeed] = useState(18); // سرعت باد (km/h)
  const [concreteTemp, setConcreteTemp] = useState(30); // دمای بتن تازه (درجه سانتی‌گراد)

  // محاسبه نرخ تبخیر سطحی بتن بر اساس نوموگرام ACI 305R / آبا (kg/m^2/h)
  // رابطه تجربی تقریب نرخ تبخیر
  const Tc = concreteTemp;
  const Ta = ambientTemp;
  const r = humidity / 100;
  const V = windSpeed;
  
  // فشار بخار اشباع
  const es_c = 0.61078 * Math.exp((17.27 * Tc) / (Tc + 237.3));
  const es_a = 0.61078 * Math.exp((17.27 * Ta) / (Ta + 237.3));
  const ea = r * es_a;
  
  // نرخ تبخیر تقریبی (kg/m2/hr)
  const evaporationRate = Math.max(0, (Math.pow(Tc, 2.5) - r * Math.pow(Ta, 2.5)) * (1 + 0.4 * (V / 3.6)) * 1e-4 * 10);
  const isEvaporationCritical = evaporationRate > 1.0; // حد بحرانی ۱ کیلوگرم بر مترمربع در ساعت

  const fleetStatus = [
    { id: 'FL-01', name: 'گریدر کوماتسو GD661', duty: 'پخش و تسطیح لایه زیراساس معبر اصلی', status: 'Active', fuel: '78%' },
    { id: 'FL-02', name: 'غلطک ویبره خودکشش CA25', duty: 'تراکم نهایی لایه بستر و ساب‌گرید', status: 'Active', fuel: '62%' },
    { id: 'FL-03', name: 'لودر کاترپیلار 966', duty: 'بارگیری مصالح خاکریز از دپوی قرضه', status: 'Standby', fuel: '85%' },
    { id: 'FL-04', name: 'تانکر آب‌پاش ۱۲ هزار لیتری', duty: 'تنظیم رطوبت بهینه خاک پیش از کوبش', status: 'Active', fuel: '90%' }
  ];

  const projectPhases = [
    { title: 'عملیات خاکی و خاکبرداری تراز نهایی', progress: 100, status: 'تکمیل‌شده' },
    { title: 'تسطیح و تراکم لایه بستر (ساب‌گرید ۹۵٪)', progress: 92, status: 'در حال نظارت و آزمایش' },
    { title: 'پخش و کوبش لایه زیر‌اساس (Subbase)', progress: 65, status: 'عملیات فعال' },
    { title: 'اجرای جدول‌گذاری و کانیو بتنی', progress: 30, status: 'در حال پیاده‌سازی رقوم' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-6 text-right font-sans" dir="rtl">
      {/* سربرگ ماژول */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 mb-2">
            <HardHat className="w-3.5 h-3.5 text-amber-600" />
            <span>SITE INFRASTRUCTURE COMMAND</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">مرکز پایش میدانی پروژه و کنترل شرایط محیطی کارگاه</h2>
          <p className="text-xs text-gray-500 mt-0.5">رصد آنلاین پیشرفت فیزیکی، استقرار ماشین‌آلات و ارزیابی ریسک تبخیر سطحی بتن</p>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3.5 py-2 rounded-2xl text-xs font-mono">
          <MapPin className="w-4 h-4 text-red-500" />
          <span>موقعیت پروژه: آماده‌سازی فاز ۱ زیرساخت</span>
        </div>
      </div>

      {/* بخش ارزیابی ریسک شرایط محیطی و بتن‌ریزی در هوای گرم */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-red-500" />
            <span>پایش شرایط اقلیمی و نرخ تبخیر سطحی بتن (وفق استاندارد ACI 305R / آبا)</span>
          </h3>
          <span className="text-xs font-mono font-bold text-gray-400">ACI 305R EVAPORATION MONITOR</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="text-gray-600 block mb-1">دمای محیط (°C):</label>
            <input
              type="number"
              value={ambientTemp}
              onChange={(e) => setAmbientTemp(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 font-mono font-bold text-gray-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-600 block mb-1">رطوبت نسبی هوا (%):</label>
            <input
              type="number"
              value={humidity}
              onChange={(e) => setHumidity(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 font-mono font-bold text-gray-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-600 block mb-1">سرعت وزش باد (km/h):</label>
            <input
              type="number"
              value={windSpeed}
              onChange={(e) => setWindSpeed(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 font-mono font-bold text-gray-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-600 block mb-1">دمای بتن تازه (°C):</label>
            <input
              type="number"
              value={concreteTemp}
              onChange={(e) => setConcreteTemp(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 font-mono font-bold text-gray-900 focus:outline-none"
            />
          </div>
        </div>

        {/* کارت ارزیابی نرخ تبخیر */}
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right ${
          isEvaporationCritical ? 'bg-red-50 border-red-300 text-red-950' : 'bg-emerald-50 border-emerald-300 text-emerald-950'
        }`}>
          <div>
            <span className="text-xs font-bold block">نرخ محاسبه‌شده تبخیر آب از سطح بتن:</span>
            <span className="text-xl font-black font-mono mt-0.5 block">{evaporationRate.toFixed(2)} $kg/m^2/h$</span>
          </div>

          <div className="text-xs font-bold flex items-center gap-1.5">
            {isEvaporationCritical ? (
              <>
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>هشدار بحرانی: نرخ تبخیر بیش از ۱.۰ است؛ خطر ایجاد ترک‌های خمیری پلاستیک (نیاز به کیورینگ فوری با گونی مرطوب یا ژل ترکیبات عمل‌آوری)</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>شرایط مجاز: نرخ تبخیر در محدوده استاندارد است (عملیات بتن‌ریزی با رعایت زمان عمل‌آوری بلامانع است)</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* وضعیت ماشین‌آلات و پیشرفت فازها */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* وضعیت ناوگان ماشین‌آلات */}
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
            <Truck className="w-4 h-4 text-blue-600" />
            <span>پایش ناوگان و ماشین‌آلات اجرایی کارگاه</span>
          </h3>

          <div className="space-y-2.5">
            {fleetStatus.map((item) => (
              <div key={item.id} className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-[11px] text-gray-500">{item.duty}</p>
                </div>
                <div className="text-left shrink-0">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    item.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {item.status === 'Active' ? 'فعال در جبهه' : 'آماده به کار'}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 block mt-0.5">سوخت: {item.fuel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* درصد پیشرفت فازهای اجرایی */}
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>پیشرفت فیزیکی فازهای آماده‌سازی</span>
          </h3>

          <div className="space-y-3 pt-1">
            {projectPhases.map((phase, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-bold">
                  <span className="text-gray-800">{phase.title}</span>
                  <span className="font-mono text-emerald-700">{phase.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${phase.progress}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-400 block">{phase.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
