import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Cpu, HardHat, ArrowLeft, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function Dashboard({ onNavigate }) {
  const services = [
    {
      id: 'ai-vision',
      title: 'سامانه پایش هوشمند سازه و پردازش تصویر بتن (AI SHM)',
      badge: 'پژوهش و استقرار مدل',
      price: 'پروژه‌ای / سفارشی',
      desc: 'پیاده‌سازی مدل‌های یادگیری عمیق (PyTorch ResNet) جهت اسکن و طبقه‌بندی خودکار ترک‌ها و آسیب‌های سطحی سازه‌های بتنی و پل‌ها.',
      features: ['دقت تشخیص بالای ۹۸٪', 'کاهش هزینه‌های بازرسی چشمی', 'خروجی‌های تحلیلی قابل ادغام با سامانه‌های سازه'],
      actionText: 'دموی آنلاین در آزمایشگاه',
      target: 'ai-lab',
      color: 'border-sky-200 bg-sky-50/40 text-sky-700'
    },
    {
      id: 'custom-pwa',
      title: 'توسعه وب‌اپلیکیشن‌ها و نرم‌افزارهای مهندسی کارگاهی (PWA)',
      badge: 'طراحی نرم‌افزار کارگاهی',
      price: 'توسعه اختصاصی',
      desc: 'طراحی سامانه‌های تحت وب سبک و سریع با کارکرد کاملاً آفلاین (IndexedDB) جهت ثبت مستندات، محاسبات کارگاهی و پایش میدانی.',
      features: ['همگام‌سازی ابری خودکار', 'قابلیت نصب روی تمامی سیستم‌ها', 'حذف خطاهای محاسباتی در کارگاه'],
      actionText: 'مشاهده مشخصات فنی',
      target: 'knowledge',
      color: 'border-emerald-200 bg-emerald-50/40 text-emerald-700'
    },
    {
      id: 'civil-qc',
      title: 'مشاوره فنی نظارت و کنترل کیفیت ژئوتکنیک',
      badge: 'مشاوره فنی و نظارت',
      price: 'نظارت و استعلام میدانی',
      desc: 'راستی‌آزمایی آزمایش‌های تراکم خاک (مخروط ماسه و پروکتور)، محاسبات احجام عملیات خاکی و کنترل کیفیت روسازی معابر.',
      features: ['منطبق بر ضوابط نشریه ۱۰۱', 'برآورد دقیق تناژ مصالح اساس', 'پیشگیری از نشست‌های نامتقارن بستر'],
      actionText: 'ورود به ماشین‌حساب ژئوتکنیک',
      target: 'civil-tools',
      color: 'border-amber-200 bg-amber-50/40 text-amber-700'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 pt-8 pb-20 text-right" dir="rtl">
      {/* بخش معرفی محصول */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono mb-2">
          <span>PRIME CROWN ENGINEERING LABS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          توسعه سامانه‌های مهندسی؛ <br className="hidden sm:inline" />
          از پایش سازه تا نرم‌افزارهای خودگردان
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl mx-auto">
          ارائه راهکارهای نوین مهندسی عمران، بینایی ماشین در پایش سلامت سازه‌ها (SHM) و طراحی سامانه‌های نرم‌افزاری آفلاین‌محور.
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button 
            onClick={() => onNavigate('contact')}
            className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2"
          >
            <span>ثبت سفارش / استعلام پروژه</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => onNavigate('engineering-lab')}
            className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs transition-all"
          >
            دموی زنده ابزارها
          </button>
        </div>
      </div>

      {/* لیست سرویس‌های قابل ارائه */}
      <div className="space-y-4 mb-16">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h2 className="font-bold text-sm text-slate-900">خدمات و راهکارهای قابل استقرار</h2>
          <span className="text-[11px] font-mono text-slate-400">CORE SOLUTIONS</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {services.map((s) => (
            <div 
              key={s.id}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${s.color}`}>
                    {s.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">{s.price}</span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-[11px] text-slate-500">
                  {s.features.map((f, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{f}</span>
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate(s.target)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all shrink-0 flex items-center justify-center gap-1.5"
              >
                <span>{s.actionText}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* دعوت به اقدام */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="font-bold text-sm sm:text-base">نیاز به راهکار سفارشی یا مشاوره فنی در پروژه دارید؟</h3>
          <p className="text-xs text-slate-400 mt-0.5">آماده همکاری با مهندسین مشاور، پیمانکاران و آزمایشگاه‌های فنی</p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-xs transition-all shrink-0"
        >
          ثبت استعلام و شروع گفتگو
        </button>
      </div>
    </div>
  );
}
