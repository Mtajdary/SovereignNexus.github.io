import React, { useState } from 'react';
import { Eye, HardHat, Cpu, ChevronDown, ChevronUp } from 'lucide-react';

export default function ProjectsSection() {
  const [expandedId, setExpandedId] = useState(1);

  const projects = [
    {
      id: 1,
      title: 'تشخیص خودکار ترک‌های بتن با شبکه‌های عصبی عمیق (PyTorch)',
      category: 'هوش مصنوعی و بینایی ماشین',
      icon: Eye,
      color: 'text-sky-700 bg-sky-50 border-sky-200',
      summary: 'طراحی پایپ‌لاین طبقه‌بندی تصویر بر پایه مدل انتقال یادگیری ResNet-18 جهت ارزیابی و تفکیک خودکار تصاویر سطوح بتنی ترک‌خورده و بدون آسیب.',
      details: 'در این پروژه با آموزش مدل بر روی مجموعه داده‌های تصاویر بتن در شرایط نوری مختلف، شبکه‌ای آموزش داده شد که با دقت بالا قادر است ترک‌های سطحی را در کوتاه‌ترین زمان شناسایی کرده و ریسک خطای انسانی در بازرسی‌های چشمی را به حداقل برساند.'
    },
    {
      id: 2,
      title: 'سامانه نظارتی «همراه ناظر» (HamrahNazer PWA)',
      category: 'توسعه نرم‌افزار مهندسی',
      icon: Cpu,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      summary: 'وب‌اپلیکیشن کاربردی جهت تسهیل محاسبات کارگاهی، ثبت نتایج آزمایش‌های بتن و خاک، و مستندسازی روزانه برای مهندسین ناظر مقیم.',
      details: 'این سامانه با بهره‌گیری از استانداردهای Progressive Web App طراحی شده و مهندسین را قادر می‌سازد در کارگاه‌های دورافتاده بدون نیاز به اینترنت، فرم‌های کنترلی را تکمیل، ذخیره و پس از اتصال به شبکه با پایگاه داده همگام کنند.'
    },
    {
      id: 3,
      title: 'نظارت مقیم پروژه‌های آماده‌سازی اراضی و معابر',
      category: 'مهندسی عمران و نظارت کارگاهی',
      icon: HardHat,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      summary: 'هدایت فنی عملیات خاکی سنگین، لایه‌های زیراساس و اساس، کنترل تراکم خاک و جدول‌گذاری در پروژه‌های آماده‌سازی زیرساخت شهری و راه‌سازی.',
      details: 'شامل کنترل تطابق اجرایی نقشه‌های توپوگرافی و مسیر، راستی‌آزمایی نتایج آزمایشگاه مکانیک خاک، نظارت بر تراکم لایه‌ها بر اساس مشخصات نشریه ۱۰۱ و تنظیم صورت‌جلسات کارکرد ماشین‌آلات.'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 space-y-4 text-right" dir="rtl">
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-gray-200 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900">پروژه‌ها و پژوهش‌های فنی</h2>
        <p className="text-xs text-gray-500 mt-0.5">مرور جزئیات فنی پروژه‌های توسعه داده‌شده در زمینه عمران، یادگیری عمیق و وب</p>
      </div>

      <div className="space-y-3">
        {projects.map((p) => {
          const Icon = p.icon;
          const isExpanded = expandedId === p.id;

          return (
            <div key={p.id} className="p-5 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-3">
              <div 
                className="flex items-start justify-between gap-3 cursor-pointer select-none"
                onClick={() => setExpandedId(isExpanded ? null : p.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-2xl border ${p.color} shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-500 font-mono block">{p.category}</span>
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 mt-0.5">{p.title}</h3>
                  </div>
                </div>
                <button className="text-gray-400 p-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {p.summary}
              </p>

              {isExpanded && (
                <div className="pt-3 border-t border-gray-100 text-xs text-gray-700 leading-relaxed bg-gray-50/80 p-3.5 rounded-2xl">
                  {p.details}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
