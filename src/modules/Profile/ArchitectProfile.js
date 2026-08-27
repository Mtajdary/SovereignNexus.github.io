import React from 'react';
import { Award, BookOpen, Layers, Code2, HardHat, Mail, CheckCircle2 } from 'lucide-react';

export default function ArchitectProfile() {
  return (
    <div className="max-w-3xl mx-auto px-4 space-y-6 text-right font-sans" dir="rtl">
      {/* سربرگ شناسنامه */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
        <span className="text-[10px] font-mono text-slate-400 block uppercase">ENGINEERING PROFILE &amp; BIO</span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">درباره و سوابق تخصصی</h2>
        <p className="text-xs text-slate-500 leading-relaxed">خلاصه پیشینه تحصیلی، تجارب نظارت کارگاهی و پژوهش‌های یادگیری عمیق</p>
      </div>

      {/* کارت سوابق تحصیلی */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>سوابق تحصیلی و دانشگاهی</span>
        </h3>
        <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
          <div className="flex items-start gap-2">
            <span className="text-emerald-500 font-bold mt-0.5">&bull;</span>
            <div>
              <strong>کارشناسی مهندسی عمران</strong> - دانشگاه ولایت
              <p className="text-[11px] text-slate-500 mt-0.5">تمرکز بر محاسبات سازه، مکانیک خاک و روسازی معابر</p>
            </div>
          </div>
          <div className="flex items-start gap-2 pt-1 border-t border-slate-100">
            <span className="text-emerald-500 font-bold mt-0.5">&bull;</span>
            <div>
              <strong>پذیرش پژوهشی مقطع کارشناسی ارشد</strong> - Universiti Putra Malaysia (UPM)
              <p className="text-[11px] text-slate-500 mt-0.5">پژوهش در زمینه بینایی ماشین و پایش سلامت سازه‌ها</p>
            </div>
          </div>
        </div>
      </div>

      {/* مهارت‌های فنی و ابزارها */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
          <Code2 className="w-4 h-4 text-emerald-600" />
          <span>مهارت‌ها و ابزارهای تخصصی</span>
        </h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
            <span className="font-bold text-slate-900 block">مهندسی عمران و نظارت</span>
            <span className="text-[11px] text-slate-500 block">نشریه ۱۰۱، آیین‌نامه آبا، آزمایش‌های تراکم خاک، کنترل کیفیت بتن</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
            <span className="font-bold text-slate-900 block">هوش مصنوعی و نرم‌افزار</span>
            <span className="text-[11px] text-slate-500 block">PyTorch، بینایی ماشین، مدل ResNet-18، جاوااسکریپت، React و PWA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
