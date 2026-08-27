import React, { useState } from 'react';
import { HardHat, Calculator, CheckCircle2, AlertTriangle, Layers, Activity } from 'lucide-react';

export default function CivilToolsSuite() {
  const [activeTab, setActiveTab] = useState('compaction');

  // ۱. تراکم خاک
  const [wetWeight, setWetWeight] = useState(2150);
  const [holeVolume, setHoleVolume] = useState(1050);
  const [moisture, setMoisture] = useState(8.5);
  const [maxDryDensity, setMaxDryDensity] = useState(2.10);
  const [requiredCompaction, setRequiredCompaction] = useState(95);

  // ۲. مصالح اساس
  const [roadLength, setRoadLength] = useState(500);
  const [roadWidth, setRoadWidth] = useState(10);
  const [layerThickness, setLayerThickness] = useState(15);
  const [compactedDensity, setCompactedDensity] = useState(2.2);

  // ۳. مقاومت بتن
  const [crushLoad, setCrushLoad] = useState(480);
  const [cubeSize, setCubeSize] = useState(150);
  const [targetStrength, setTargetStrength] = useState(25);

  // محاسبات
  const wetDensity = holeVolume > 0 ? (wetWeight / holeVolume) : 0;
  const dryDensity = moisture >= 0 ? (wetDensity / (1 + (moisture / 100))) : 0;
  const actualCompaction = maxDryDensity > 0 ? ((dryDensity / maxDryDensity) * 100) : 0;
  const isCompactionPassed = actualCompaction >= requiredCompaction;

  const totalVolume = (roadLength * roadWidth * (layerThickness / 100));
  const totalTonnage = totalVolume * compactedDensity;
  const truckCount = Math.ceil(totalTonnage / 15);

  const areaMm2 = cubeSize * cubeSize;
  const strengthMpa = areaMm2 > 0 ? ((crushLoad * 1000) / areaMm2) : 0;
  const strengthKgCm2 = strengthMpa * 10.197;
  const isConcretePassed = strengthMpa >= targetStrength;

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-6 text-right font-sans" dir="rtl">
      {/* سربرگ */}
      <div className="clay-card p-6 sm:p-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold shadow-xs">
          <HardHat className="w-4 h-4 text-amber-600" />
          <span>CIVIL COMPUTATIONAL SUITE &bull; نشریه ۱۰۱</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">موتور محاسبات کارگاهی ژئوتکنیک و سازه</h2>
        <p className="text-xs text-slate-500 leading-relaxed">ابزارهای محاسباتی بلادرنگ جهت تطبیق نتایج آزمایشگاهی با استانداردهای نظام مهندسی</p>
      </div>

      {/* منوی تب کپسولی Clay */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setActiveTab('compaction')}
          className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 ${
            activeTab === 'compaction'
              ? 'clay-btn-emerald text-white'
              : 'clay-btn-white text-slate-700'
          }`}
        >
          آزمایش تراکم نسبی خاک (مخروط ماسه)
        </button>
        <button
          onClick={() => setActiveTab('materials')}
          className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 ${
            activeTab === 'materials'
              ? 'clay-btn-emerald text-white'
              : 'clay-btn-white text-slate-700'
          }`}
        >
          برآورد تناژ اساس و زیراساس
        </button>
        <button
          onClick={() => setActiveTab('concrete')}
          className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 ${
            activeTab === 'concrete'
              ? 'clay-btn-emerald text-white'
              : 'clay-btn-white text-slate-700'
          }`}
        >
          مقاومت فشاری نمونه‌های بتن
        </button>
      </div>

      {/* ۱. ماژول تراکم خاک */}
      {activeTab === 'compaction' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="clay-card p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
              ورودی‌های آزمایش مخروط ماسه (Sand Cone)
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-600 block mb-1 font-bold">وزن خاک مرطوب خروجی چاله (گرم):</label>
                <input
                  type="number"
                  value={wetWeight}
                  onChange={(e) => setWetWeight(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-600 block mb-1 font-bold">حجم چاله آزمایش (cm³):</label>
                <input
                  type="number"
                  value={holeVolume}
                  onChange={(e) => setHoleVolume(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-600 block mb-1 font-bold">درصد رطوبت خاک (%):</label>
                <input
                  type="number"
                  step="0.1"
                  value={moisture}
                  onChange={(e) => setMoisture(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-600 block mb-1 font-bold">حداکثر وزن مخصوص خشک آزمایشگاهی - پروکتور (g/cm³):</label>
                <input
                  type="number"
                  step="0.01"
                  value={maxDryDensity}
                  onChange={(e) => setMaxDryDensity(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-600 block mb-1 font-bold">حداقل تراکم مشخصات فنی:</label>
                <select
                  value={requiredCompaction}
                  onChange={(e) => setRequiredCompaction(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none"
                >
                  <option value={90}>۹۰٪ (بستر خاکی معمولی)</option>
                  <option value={95}>۹۵٪ (ساب‌گرید و زیراساس)</option>
                  <option value={100}>۱۰۰٪ (اساس و ۱۵ سانتی‌متر فوقانی ساب‌گرید)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="clay-card p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                تحلیل ژئوتکنیک و انطباق نشریه ۱۰۱
              </h3>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">دانسیته مرطوب</span>
                  <span className="text-base font-black font-mono text-slate-900">{wetDensity.toFixed(3)} g/cm³</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">دانسیته خشک میدانی</span>
                  <span className="text-base font-black font-mono text-slate-900">{dryDensity.toFixed(3)} g/cm³</span>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border text-center space-y-2 ${
                isCompactionPassed ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950' : 'bg-red-50/90 border-red-300 text-red-950'
              }`}>
                <span className="text-xs font-bold block">درصد تراکم نسبی (Relative Compaction):</span>
                <span className="text-3xl font-black font-mono block">{actualCompaction.toFixed(1)}%</span>
                <div className="flex items-center justify-center gap-1.5 pt-1 text-xs font-bold">
                  {isCompactionPassed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>تأیید ناظر مقیم (منطبق با مشخصات نشریه ۱۰۱)</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>عدم انطباق! نیاز به کوبش مجدد لایه</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed font-mono">
              RC = (γd / γd,max) × 100 | γd = γwet / (1 + w/100)
            </div>
          </div>
        </div>
      )}

      {/* ۲. مصالح اساس */}
      {activeTab === 'materials' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="clay-card p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
              پارامترهای هندسی معبر
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-600 block mb-1 font-bold">طول معبر (متر):</label>
                <input
                  type="number"
                  value={roadLength}
                  onChange={(e) => setRoadLength(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-slate-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-600 block mb-1 font-bold">عرض معبر (متر):</label>
                <input
                  type="number"
                  value={roadWidth}
                  onChange={(e) => setRoadWidth(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-slate-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-600 block mb-1 font-bold">ضخامت لایه کوبیده‌شده (سانتی‌متر):</label>
                <input
                  type="number"
                  value={layerThickness}
                  onChange={(e) => setLayerThickness(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-slate-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-600 block mb-1 font-bold">وزن مخصوص متراکم (تن/متر مکعب):</label>
                <input
                  type="number"
                  step="0.05"
                  value={compactedDensity}
                  onChange={(e) => setCompactedDensity(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-slate-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="clay-card p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                برآورد مصالح و لجستیک حمل
              </h3>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <span className="text-xs text-amber-800 font-bold block">حجم کوبیده‌شده لایه:</span>
                <span className="text-2xl font-black font-mono text-amber-900">{totalVolume.toFixed(2)} متر مکعب</span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-xs text-emerald-800 font-bold block">وزن کل مصالح مورد نیاز:</span>
                <span className="text-2xl font-black font-mono text-emerald-900">{totalTonnage.toFixed(1)} تن</span>
              </div>
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-1">
                <span className="text-xs text-sky-800 font-bold block">تعداد سرویس تقریبی کامیون (۱۵ تنی):</span>
                <span className="text-xl font-black font-mono text-sky-900">{truckCount} سرویس</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ۳. مقاومت بتن */}
      {activeTab === 'concrete' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="clay-card p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
              نتایج آزمایش جک بتن‌شکن
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-600 block mb-1 font-bold">نیروی گسیختگی نهایی جک (kN):</label>
                <input
                  type="number"
                  value={crushLoad}
                  onChange={(e) => setCrushLoad(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-slate-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-600 block mb-1 font-bold">ابعاد قالب مکعبی (میلی‌متر):</label>
                <select
                  value={cubeSize}
                  onChange={(e) => setCubeSize(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none"
                >
                  <option value={150}>مکعبی ۱۵۰×۱۵۰ (استاندارد ایران/اروپا)</option>
                  <option value={100}>مکعبی ۱۰۰×۱۰۰</option>
                  <option value={200}>مکعبی ۲۰۰×۲۰۰</option>
                </select>
              </div>
              <div>
                <label className="text-slate-600 block mb-1 font-bold">رده بتن هدف طرح:</label>
                <select
                  value={targetStrength}
                  onChange={(e) => setTargetStrength(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none"
                >
                  <option value={20}>C20</option>
                  <option value={25}>C25 (سازه‌ای متداول)</option>
                  <option value={30}>C30</option>
                  <option value={35}>C35 (پل‌ها و سازه‌های خاص)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="clay-card p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                انطباق با آیین‌نامه بتن ایران (آبا)
              </h3>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">مقاومت فشاری (MPa)</span>
                  <span className="text-xl font-black font-mono text-slate-900">{strengthMpa.toFixed(2)} MPa</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">مقاومت معادل (kg/cm²)</span>
                  <span className="text-xl font-black font-mono text-slate-900">{strengthKgCm2.toFixed(1)} kg/cm²</span>
                </div>
              </div>
              <div className={`p-5 rounded-2xl border text-center space-y-1.5 ${
                isConcretePassed ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-red-50 border-red-300 text-red-900'
              }`}>
                <span className="text-xs font-bold block">نتیجه رده مقاومتی:</span>
                <span className="text-2xl font-black font-mono block">
                  {strengthMpa >= targetStrength ? `تأیید رده C${targetStrength}` : `عدم احراز رده C${targetStrength}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
