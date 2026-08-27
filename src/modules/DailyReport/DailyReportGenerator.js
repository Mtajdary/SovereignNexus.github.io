import React, { useState } from 'react';
import { FileText, Copy, Printer, CheckCircle2, Sparkles, HardHat, Calendar, Clock, AlertTriangle } from 'lucide-react';

export default function DailyReportGenerator() {
  const [reportDate, setReportDate] = useState('۱۴۰۵/۰۶/۰۶');
  const [siteLocation, setSiteLocation] = useState('پروژه آماده‌سازی اراضی فاز ۱ - معابر اصلی');
  const [weather, setWeather] = useState('آفتابی / دمای حداکثر ۳۶ درجه سانتی‌گراد');
  const [personnelCount, setPersonnelCount] = useState('۱ نفر مهندس ناظر مقیم، ۲ نفر نقشه‌بردار، ۴ نفر راننده ماشین‌آلات سنگین');
  const [activeMachinery, setActiveMachinery] = useState('۱ دستگاه گریدر GD661، ۱ دستگاه غلطک CA25، ۱ دستگاه تانکر آب‌پاش');
  const [executedActivities, setExecutedActivities] = useState('آب‌پاشی و اختلاط رطوبت بهینه، پخش و تسطیح مصالح زیراساس، کوبش لایه بستر و انجام آزمایش‌های تراکم میدانی');
  const [qcResults, setQcResults] = useState('انجام ۳ مورد آزمایش مخروط ماسه در کیلومترهای ۰+۱۲۰ الی ۰+۲۸۰؛ میانگین تراکم نسبی ۹۶.۸٪ (منطبق با مشخصات نشریه ۱۰۱)');
  const [safetyNotes, setSafetyNotes] = useState('استفاده کامل پرسنل از کلاه و کفش ایمنی؛ کنترل ایمنی تردد تانکر و ماشین‌آلات');
  const [copied, setCopied] = useState(false);

  const fullReportText = `================================================
گزارش روزانه نظارت مقیم کارگاه ساختمانی و راه‌سازی
مهندس ناظر مقیم: محمد تاجداری
تاریخ گزارش: ${reportDate}
پروژه / کارگاه: ${siteLocation}
================================================

۱. شرایط جوی و اقلیمی کارگاه:
- ${weather}

۲. نفرات و عوامل فنی حاضر در سایت:
- ${personnelCount}

۳. ماشین‌آلات و تجهیزات فعال:
- ${activeMachinery}

۴. شرح عملیات اجرایی صورت‌پذیرفته در روز جاری:
- ${executedActivities}

۵. کنترل کیفیت و نتایج آزمایش‌های ژئوتکنیک:
- ${qcResults}

۶. نکات ایمنی، بهداشت و محیط زیست (HSE):
- ${safetyNotes}

تأییدیه ناظر مقیم:
نام و امضا: محمد تاجداری - کارشناس مهندسی عمران
================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullReportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-6 text-right font-sans" dir="rtl">
      {/* سربرگ */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI SITE REPORT GENERATOR</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">سامانه هوشمند تولید گزارش روزانه نظارت کارگاه</h2>
          <p className="text-xs text-gray-500 mt-0.5">تنظیم استاندارد صورت‌جلسات اجرایی، ثبت آزمون‌های تراکم و گزارش عملکرد روزانه</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'متن کپی شد' : 'کپی متن گزارش'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-full bg-gray-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>چاپ صورت‌جلسه</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* فرم ورودی پارامترهای کارگاهی */}
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-3.5 text-xs">
          <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">
            ورودی‌های وضعیت اجرایی و فنی سایت
          </h3>

          <div>
            <label className="text-gray-700 block mb-1 font-bold">تاریخ و موقعیت جبهه کاری:</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                className="px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 font-mono text-gray-900 focus:outline-none"
              />
              <input
                type="text"
                value={siteLocation}
                onChange={(e) => setSiteLocation(e.target.value)}
                className="px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-700 block mb-1 font-bold">شرح عملیات اجرایی صورت‌گرفته:</label>
            <textarea
              rows={2}
              value={executedActivities}
              onChange={(e) => setExecutedActivities(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-700 block mb-1 font-bold">نتایج کنترل کیفیت و آزمایش‌ها:</label>
            <textarea
              rows={2}
              value={qcResults}
              onChange={(e) => setQcResults(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-700 block mb-1 font-bold">ماشین‌آلات و ادوات فعال:</label>
            <input
              type="text"
              value={activeMachinery}
              onChange={(e) => setActiveMachinery(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-700 block mb-1 font-bold">ملاحظات ایمنی و بهداشت (HSE):</label>
            <input
              type="text"
              value={safetyNotes}
              onChange={(e) => setSafetyNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none"
            />
          </div>
        </div>

        {/* پیش‌نمایش برگه گزارش نظارت */}
        <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <span className="text-xs font-bold text-gray-900">پیش‌نمایش سند رسمی روزانه</span>
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                READY TO EXPORT
              </span>
            </div>

            <pre className="text-[11px] text-gray-700 leading-relaxed font-sans whitespace-pre-wrap bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs max-h-[380px] overflow-y-auto">
              {fullReportText}
            </pre>
          </div>

          <div className="text-[11px] text-gray-500 bg-white p-2.5 rounded-xl border border-gray-200 leading-relaxed">
            قالب خروجی مطابق با فرمت استاندارد دفترچه‌های نظارتی نظام مهندسی و سازمان برنامه و بودجه.
          </div>
        </div>
      </div>
    </div>
  );
}
