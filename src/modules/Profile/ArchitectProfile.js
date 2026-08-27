import React from 'react';
import { Shield, HardHat, Eye, Cpu, Award, GraduationCap, CheckCircle } from 'lucide-react';

export default function ArchitectProfile() {
  return (
    <div className="max-w-3xl mx-auto px-4 space-y-6 text-right" dir="rtl">
      {/* کارت معرفی اصلی */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
            <Shield className="w-8 h-8" />
          </div>
          <div className="space-y-1 text-center sm:text-right">
            <h2 className="text-2xl font-black text-gray-900">محمد تاجداری</h2>
            <p className="text-xs font-mono text-gray-500">کارشناس مهندسی عمران &bull; پژوهشگر بینایی ماشین و توسعه‌دهنده نرم‌افزار</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-2 border-t border-gray-100">
          متولد ۱۳۷۱، دانش‌آموخته مهندسی عمران از دانشگاه ولایت و دارای پذیرش پژوهشی در دانشگاه پوترا مالزی (UPM). علاقه‌مند به ترکیب مهندسی سنتی ژئوتکنیک و سازه با فناوری‌های یادگیری عمیق برای ارتقای استانداردهای کنترل کیفیت در صنعت ساخت‌وساز.
        </p>
      </div>

      {/* مهارت‌های اصلی */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-gray-900">زمینه‌های تخصصی و تسلط فنی</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs">
              <HardHat className="w-4 h-4" />
              <span>مهندسی عمران</span>
            </div>
            <ul className="text-[11px] text-gray-600 space-y-1.5 leading-relaxed">
              <li>• نظارت مقیم کارگاهی و کنترل لایه‌های خاکی</li>
              <li>• آزمایش‌های مکانیک خاک و تراکم نسبی</li>
              <li>• بررسی نقشه‌ها و صورت‌جلسات فنی کارگاه</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2">
            <div className="flex items-center gap-2 text-sky-700 font-bold text-xs">
              <Eye className="w-4 h-4" />
              <span>بینایی ماشین و هوش مصنوعی</span>
            </div>
            <ul className="text-[11px] text-gray-600 space-y-1.5 leading-relaxed">
              <li>• مدل‌سازی یادگیری عمیق با PyTorch</li>
              <li>• سیستم‌های پایش سلامت سازه (SHM)</li>
              <li>• طبقه‌بندی و تشخیص خودکار ترک‌های بتن</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
              <Cpu className="w-4 h-4" />
              <span>توسعه نرم‌افزار</span>
            </div>
            <ul className="text-[11px] text-gray-600 space-y-1.5 leading-relaxed">
              <li>• فرانت‌اند مدرن با React.js و Tailwind</li>
              <li>• مهندسی وب‌اپلیکیشن‌های پیش‌رونده (PWA)</li>
              <li>• برنامه‌نویسی و اسکریپت‌نویسی پایتون</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
