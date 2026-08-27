import React, { useState } from 'react';
import { HardHat, Calculator, Layers, Activity, CheckCircle2, AlertTriangle, RefreshCw, FileText } from 'lucide-react';

export default function CivilToolsSuite() {
  const [activeTab, setActiveTab] = useState('compaction');

  // ۱. حالت‌های محاسبه‌گر تراکم خاک
  const [wetWeight, setWetWeight] = useState(2150); // وزن خاک مرطوب از چاله (گرم)
  const [holeVolume, setHoleVolume] = useState(1050); // حجم چاله مخروط ماسه (سانتی‌متر مکعب)
  const [moisture, setMoisture] = useState(8.5); // درصد رطوبت
  const [maxDryDensity, setMaxDryDensity] = useState(2.10); // حداکثر وزن مخصوص خشک آزمایشگاه (پروکتور)
  const [requiredCompaction, setRequiredCompaction] = useState(95); // درصد تراکم مورد نیاز نشریه ۱۰۱

  // ۲. حالت‌های محاسبه‌گر تناژ اساس و زیراساس
  const [roadLength, setRoadLength] = useState(500); // طول معبر (متر)
  const [roadWidth, setRoadWidth] = useState(10); // عرض معبر (متر)
  const [layerThickness, setLayerThickness] = useState(15); // ضخامت لایه (سانتی‌متر)
  const [compactedDensity, setCompactedDensity] = useState(2.2); // وزن مخصوص متراکم (تن بر متر مکعب)

  // ۳. حالت‌های محاسبه‌گر مقاومت بتن
  const [crushLoad, setCrushLoad] = useState(480); // نیروی گسیختگی جک (کیلو نیوتن)
  const [cubeSize, setCubeSize] = useState(150); // ابعاد نمونه مکعبی (میلی‌متر)
  const [concreteAge, setConcreteAge] = useState(28); // سن نمونه (روز)
  const [targetStrength, setTargetStrength] = useState(25); // رده بتن هدف C25

  // محاسبات تراکم خاک
  const wetDensity = holeVolume > 0 ? (wetWeight / holeVolume) : 0;
  const dryDensity = moisture >= 0 ? (wetDensity / (1 + (moisture / 100))) : 0;
  const actualCompaction = maxDryDensity > 0 ? ((dryDensity / maxDryDensity) * 100) : 0;
  const isCompactionPassed = actualCompaction >= requiredCompaction;

  // محاسبات مصالح
  const totalVolume = (roadLength * roadWidth * (layerThickness / 100));
  const totalTonnage = totalVolume * compactedDensity;
  const truckCount = Math.ceil(totalTonnage / 15); // فرض کامیون ۱۰ چرخ ۱۵ تنی

  // محاسبات مقاومت بتن
  const areaMm2 = cubeSize * cubeSize;
  const strengthMpa = areaMm2 > 0 ? ((crushLoad * 1000) / areaMm2) : 0;
  const strengthKgCm2 = strengthMpa * 10.197;
  const isConcretePassed = strengthMpa >= targetStrength;

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-6 text-right font-sans" dir="rtl">
      {/* سربرگ ماژول ابزارهای محاسباتی */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 mb-2">
            <HardHat className="w-3.5 h-3.5 text-amber-600" />
            <span>CIVIL COMPUTATIONAL ENGINE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">موتور محاسبات کارگاهی و کنترل کیفیت ژئوتکنیک</h2>
          <p className="text-xs text-gray-500 mt-0.5">ابزارهای محاسباتی میدانی منطبق بر ضوابط نشریه ۱۰۱ و استانداردهای نظام مهندسی</p>
        </div>
      </div>

      {/* منوی تب ابزارها */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setActiveTab('compaction')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
            activeTab === 'compaction'
              ? 'bg-[#22c55e] text-white shadow-xs'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          آزمایش تراکم نسبی خاک (مخروط ماسه)
        </button>
        <button
          onClick={() => setActiveTab('materials')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
            activeTab === 'materials'
              ? 'bg-[#22c55e] text-white shadow-xs'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          برآورد تناژ لایه‌های زیراساس و اساس
        </button>
        <button
          onClick={() => setActiveTab('concrete')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
            activeTab === 'concrete'
              ? 'bg-[#22c55e] text-white shadow-xs'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          مقاومت فشاری نمونه‌های بتن
        </button>
      </div>

      {/* ۱. ماژول تراکم خاک */}
      {activeTab === 'compaction' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">
              ورودی‌های آزمایش مخروط ماسه (Sand Cone Test)
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 block mb-1">وزن خاک مرطوب خارج‌شده از چاله (گرم):</label>
                <input
                  type="number"
                  value={wetWeight}
                  onChange={(e) => setWetWeight(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600 block mb-1">حجم چاله آزمایش (سانتی‌متر مکعب):</label>
                <input
                  type="number"
                  value={holeVolume}
                  onChange={(e) => setHoleVolume(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600 block mb-1">درصد رطوبت خاک (%):</label>
                <input
                  type="number"
                  step="0.1"
                  value={moisture}
                  onChange={(e) => setMoisture(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600 block mb-1">حداکثر وزن مخصوص خشک آزمایشگاهی - پروکتور (g/cm³):</label>
                <input
                  type="number"
                  step="0.01"
                  value={maxDryDensity}
                  onChange={(e) => setMaxDryDensity(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono font-bold text-gray-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600 block mb-1">حداقل تراکم مشخصات فنی (%):</label>
                <select
                  value={requiredCompaction}
                  onChange={(e) => setRequiredCompaction(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 focus:outline-none"
                >
                  <option value={90}>۹۰٪ (بستر خاکی معمولی)</option>
                  <option value={95}>۹۵٪ (ساب‌گرید و زیراساس)</option>
                  <option value={100}>۱۰۰٪ (اساس و ۱۵ سانتی‌متر فوقانی ساب‌گرید)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">
                نتایج تحلیل ژئوتکنیک و تطبیق استاندارد
              </h3>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
                  <span className="text-[10px] text-gray-500 block">وزن مخصوص مرطوب</span>
                  <span className="text-base font-black font-mono text-gray-900">{wetDensity.toFixed(3)} g/cm³</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
                  <span className="text-[10px] text-gray-500 block">وزن مخصوص خشک میدانی</span>
                  <span className="text-base font-black font-mono text-gray-900">{dryDensity.toFixed(3)} g/cm³</span>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border text-center space-y-1.5 ${
                isCompactionPassed ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-red-50 border-red-300 text-red-900'
              }`}>
                <span className="text-xs font-bold block">درصد تراکم نسبی حاصله (Relative Compaction):</span>
                <span className="text-3xl font-black font-mono block">{actualCompaction.toFixed(1)}%</span>
                <div className="flex items-center justify-center gap-1.5 pt-1 text-xs font-bold">
                  {isCompactionPassed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>مورد تأیید مهندس ناظر (منطبق با ضوابط نشریه ۱۰۱)</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>عدم انطباق! نیاز به کوبش مجدد لایه با غلطک سنگین</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-200 leading-relaxed font-mono">
              فرمول: $RC = (\gamma_d / \gamma_{d,max}) \times 100$ | $\gamma_d = \gamma_{wet} / (1 + w/100)$
            </div>
          </div>
        </div>
      )}

      {/* ۲. ماژول مصالح و تناژ */}
      {activeTab === 'materials' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">
              پارامترهای هندسی و متریال محور معبر
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 block mb-1">طول قطعه اجرایی معبر (متر):</label>
                <input
                  type="number"
                  value={roadLength}
                  onChange={(e) => setRoadLength(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono font-bold text-gray-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600 block mb-1">عرض متوسط اجرای لایه (متر):</label>
                <input
                  type="number"
                  value={roadWidth}
                  onChange={(e) => setRoadWidth(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono font-bold text-gray-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600 block mb-1">ضخامت کوبیده‌شده لایه (سانتی‌متر):</label>
                <input
                  type="number"
                  value={layerThickness}
                  onChange={(e) => setLayerThickness(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono font-bold text-gray-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600 block mb-1">وزن مخصوص متراکم مصالح (تن بر متر مکعب):</label>
                <input
                  type="number"
                  step="0.05"
                  value={compactedDensity}
                  onChange={(e) => setCompactedDensity(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono font-bold text-gray-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">
                برآورد مصالح و لجستیک حمل
              </h3>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <span className="text-xs text-amber-800 font-bold block">حجم کوبیده‌شده لایه درجا:</span>
                <span className="text-2xl font-black font-mono text-amber-900">{totalVolume.toFixed(2)} متر مکعب</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-xs text-emerald-800 font-bold block">وزن کل مصالح مورد نیاز:</span>
                <span className="text-2xl font-black font-mono text-emerald-900">{totalTonnage.toFixed(1)} تن</span>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-1">
                <span className="text-xs text-sky-800 font-bold block">تعداد سرویس تقریبی کامیون (۱۰ چرخ ۱۵ تنی):</span>
                <span className="text-xl font-black font-mono text-sky-900">{truckCount} سرویس</span>
              </div>
            </div>

            <div className="text-[11px] text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-200 leading-relaxed font-mono">
              توجه: ضریب تورم برای تهیه مصالح دپو معمولاً بین ۱.۱۵ الی ۱.۲۵ در نظر گرفته می‌شود.
            </div>
          </div>
        </div>
      )}

      {/* ۳. ماژول مقاومت بتن */}
      {activeTab === 'concrete' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">
              نتایج آزمایش جک بتن‌شکن (Compressive Test)
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 block mb-1">نیروی گسیختگی نهایی جک (kN):</label>
                <input
                  type="number"
                  value={crushLoad}
                  onChange={(e) => setCrushLoad(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono font-bold text-gray-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600 block mb-1">نوع و ابعاد قالب نمونه:</label>
                <select
                  value={cubeSize}
                  onChange={(e) => setCubeSize(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 focus:outline-none"
                >
                  <option value={150}>مکعبی ۱۵×۱۵×۱۵ سانتی‌متر (استاندارد ایران/اروپا)</option>
                  <option value={100}>مکعبی ۱۰×۱۰×۱۰ سانتی‌متر</option>
                  <option value={200}>مکعبی ۲۰×۲۰×۲۰ سانتی‌متر</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-600 block mb-1">رده بتن مشخصه طرح (Target Grade):</label>
                <select
                  value={targetStrength}
                  onChange={(e) => setTargetStrength(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 focus:outline-none"
                >
                  <option value={20}>C20 (عیار تقریبی ۳۰۰)</option>
                  <option value={25}>C25 (عیار تقریبی ۳۵۰ - سازه‌ای)</option>
                  <option value={30}>C30 (عیار تقریبی ۴۰۰)</option>
                  <option value={35}>C35 (سازه‌های خاص و پل‌ها)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">
                مقاومت نهایی و انطباق آیین‌نامه بتن ایران (آبا)
              </h3>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
                  <span className="text-[10px] text-gray-500 block">مقاومت فشاری (MPa)</span>
                  <span className="text-xl font-black font-mono text-gray-900">{strengthMpa.toFixed(2)} MPa</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200">
                  <span className="text-[10px] text-gray-500 block">مقاومت معادل (kg/cm²)</span>
                  <span className="text-xl font-black font-mono text-gray-900">{strengthKgCm2.toFixed(1)} kg/cm²</span>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border text-center space-y-1.5 ${
                isConcretePassed ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-red-50 border-red-300 text-red-900'
              }`}>
                <span className="text-xs font-bold block">ارزیابی رده مقاومتی:</span>
                <span className="text-2xl font-black font-mono block">
                  {strengthMpa >= targetStrength ? `تأیید رده C${targetStrength}` : `عدم احراز رده C${targetStrength}`}
                </span>
                <div className="flex items-center justify-center gap-1.5 pt-1 text-xs font-bold">
                  {isConcretePassed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>نمونه حداقل مقاومت مشخصه را کسب کرده است</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>مقاومت کمتر از حد مجاز طرح است (نیاز به نمونه مغزه‌گیری/چکش اشمیت)</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-200 leading-relaxed font-mono">
              فرمول: $f_c = P / A$ | مساحت سطح مقطع مقاومت بارگذاری: {(areaMm2/100).toFixed(0)} سانتی‌متر مربع
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
