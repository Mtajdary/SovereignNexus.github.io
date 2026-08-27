import React, { useState } from 'react';
import { Activity, Layers, ShieldAlert, CheckCircle2, Sliders, TrendingUp } from 'lucide-react';

export default function StructuralSimSuite() {
  const [b, setB] = useState(350); // عرض تیر (mm)
  const [h, setH] = useState(600); // ارتفاع کل تیر (mm)
  const [fc, setFc] = useState(25); // مقاومت مشخصه بتن (MPa)
  const [appliedMoment, setAppliedMoment] = useState(120); // لنگر خمشی وارد شده (kN.m)

  // محاسبات مقطع و تنش‌های خمشی
  const I_gross = (b * Math.pow(h, 3)) / 12; // ممان اینرسی ناخالص (mm^4)
  const y_t = h / 2; // فاصله تار خنثی تا دورترین تار کششی (mm)
  
  // مدول گسیختگی بتن طبق مبحث نهم مقررات ملی / ACI 318
  const fr = 0.62 * Math.sqrt(fc); // مدول گسیختگی (MPa)
  
  // لنگر ترک‌خوردگی بتن (Cracking Moment)
  const Mcr_Nmm = (fr * I_gross) / y_t;
  const Mcr_kNm = Mcr_Nmm / 1e6;

  // تنش کششی واقعی در تار تحتانی
  const M_Nmm = appliedMoment * 1e6;
  const actualTensileStress = (M_Nmm * y_t) / I_gross; // تنش واقعی (MPa)

  const isCracked = appliedMoment >= Mcr_kNm;
  const safetyFactor = actualTensileStress > 0 ? (fr / actualTensileStress).toFixed(2) : '0';

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-6 text-right font-sans" dir="rtl">
      {/* سربرگ ماژول */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200 mb-2">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>FRACTURE &amp; STRESS SIMULATION ENGINE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">شبیه‌ساز تنش‌های کششی و لنگر ترک‌خوردگی مقطع</h2>
          <p className="text-xs text-gray-500 mt-0.5">محاسبه ممان اینرسی مقطع، مدول گسیختگی (fr) و آستانه آغاز ترک‌های سازه‌ای</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* پنل ورودی‌های هندسی و بارگذاری */}
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-600" />
            <span>پارامترهای هندسی و لنگر خمشی مقطع</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-gray-700 block mb-1 font-bold">عرض مقطع تیر (b - میلی‌متر):</label>
              <input
                type="number"
                value={b}
                onChange={(e) => setB(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-mono font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-gray-700 block mb-1 font-bold">ارتفاع کل مقطع (h - میلی‌متر):</label>
              <input
                type="number"
                value={h}
                onChange={(e) => setH(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-mono font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-gray-700 block mb-1 font-bold">مقاومت فشاری مشخصه بتن (fc - مگاپاسکال):</label>
              <select
                value={fc}
                onChange={(e) => setFc(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 focus:outline-none"
              >
                <option value={20}>C20 (مقاومت ۲۰ مگاپاسکال)</option>
                <option value={25}>C25 (مقاومت ۲۵ مگاپاسکال - متداول سازه‌ای)</option>
                <option value={30}>C30 (مقاومت ۳۰ مگاپاسکال)</option>
                <option value={35}>C35 (مقاومت ۳۵ مگاپاسکال)</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700 block mb-1 font-bold">لنگر خمشی اعمالی (Mu - کیلونیوتن در متر):</label>
              <input
                type="number"
                value={appliedMoment}
                onChange={(e) => setAppliedMoment(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-mono font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* پنل نتایج تحلیلی و وضعیت گسیختگی */}
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>نتایج پایش و تحلیل الاستیک مقطع</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
                <span className="text-[10px] text-gray-500 block">مدول گسیختگی بتن (fr)</span>
                <span className="text-base font-black font-mono text-gray-900">{fr.toFixed(2)} MPa</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
                <span className="text-[10px] text-gray-500 block">لنگر ترک‌خوردگی (Mcr)</span>
                <span className="text-base font-black font-mono text-gray-900">{Mcr_kNm.toFixed(1)} kN.m</span>
              </div>
            </div>

            {/* وضعیت ترک‌خوردگی */}
            <div className={`p-5 rounded-2xl border text-center space-y-1.5 ${
              isCracked ? 'bg-amber-50 border-amber-300 text-amber-950' : 'bg-emerald-50 border-emerald-300 text-emerald-950'
            }`}>
              <span className="text-xs font-bold block">وضعیت مقطع در تار تحتانی:</span>
              <span className="text-2xl font-black font-mono block">
                {isCracked ? 'مقطع ترک‌خورده (Cracked Section)' : 'مقطع الاستیک بدون ترک (Uncracked)'}
              </span>
              <div className="flex items-center justify-center gap-1.5 pt-1 text-xs font-bold">
                {isCracked ? (
                  <>
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                    <span>لنگر اعمالی بیش از ظرفیت کششی بتن است (M &ge; Mcr)</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>تنش کششی کمتر از مدول گسیختگی است (ضریب اطمینان: {safetyFactor})</span>
                  </>
                )}
              </div>
            </div>

            <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-1">
              <div className="flex justify-between">
                <span>تنش کششی واقعی محاسبه‌شده:</span>
                <span className="font-mono font-bold text-gray-900">{actualTensileStress.toFixed(2)} MPa</span>
              </div>
              <div className="flex justify-between">
                <span>ممان اینرسی ناخالص مقطع (Ig):</span>
                <span className="font-mono text-gray-700">{(I_gross / 1e6).toFixed(1)} &times; 10⁶ mm⁴</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-gray-500 bg-gray-50 p-2.5 rounded-xl border border-gray-200 leading-relaxed font-mono">
            فرمول: Mcr = (fr &times; Ig) / yt | fr = 0.62 &times; &radic;fc (مبحث نهم مقررات ملی ساختمان)
          </div>
        </div>
      </div>
    </div>
  );
}
