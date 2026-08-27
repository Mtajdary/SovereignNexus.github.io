import React, { useState } from 'react';
import { FileDown, Printer, Mail, Send, CheckCircle2, Phone, MapPin, Award, HardHat, Eye, Cpu } from 'lucide-react';

export default function ContactResumeSuite() {
  const [formData, setFormData] = useState({ name: '', org: '', email: '', service: 'civil-supervision', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', org: '', email: '', service: 'civil-supervision', message: '' });
    }, 4000);
  };

  const handlePrintResume = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-8 text-right font-sans" dir="rtl">
      {/* سربرگ ماژول */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
            <FileDown className="w-3.5 h-3.5 text-emerald-600" />
            <span>OFFICIAL DOSSIER &amp; INQUIRY</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">رزومه رسمی مهندسی و ارتباط مستقیم</h2>
          <p className="text-xs text-gray-500 mt-0.5">دریافت نسخه چاپی کارنامه حرفه‌ای یا ثبت درخواست همکاری و مشاوره فنی</p>
        </div>

        <button
          onClick={handlePrintResume}
          className="px-5 py-2.5 rounded-full bg-gray-900 hover:bg-black text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2 shrink-0"
        >
          <Printer className="w-4 h-4 text-emerald-400" />
          <span>پرینت / دانلود PDF رزومه</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ۱. پیش‌نمایش مستند رزومه رسمی قابل پرینت */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-5" id="printable-resume">
          <div className="border-b border-gray-200 pb-4">
            <span className="text-[10px] font-mono text-gray-400 block uppercase">ENGINEERING DOSSIER</span>
            <h3 className="text-xl font-black text-gray-900 mt-0.5">محمد تاجداری</h3>
            <p className="text-xs text-gray-600 font-mono mt-1">کارشناس مهندسی عمران &bull; پژوهشگر بینایی ماشین و AI</p>
          </div>

          <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
            <div>
              <strong className="text-gray-900 block mb-1">خلاصه سوابق حرفه‌ای:</strong>
              <p className="text-[11px] text-gray-600">
                مهندس ناظر مقیم با سابقه هدایت عملیات خاکی، لایه‌های زیراساس/اساس، کنترل تراکم و نظارت بر پروژه‌های آماده‌سازی زیرساخت؛ همراه با تخصص در مدل‌سازی یادگیری عمیق (PyTorch) جهت پایش هوشمند سازه‌ها و توسعه ابزارهای نرم‌افزاری مهندسی.
              </p>
            </div>

            <div className="border-t border-gray-100 pt-2 space-y-2">
              <strong className="text-gray-900 block">سوابق تحصیلی و دانشگاهی:</strong>
              <div className="text-[11px] text-gray-600 space-y-1">
                <p>&bull; <strong>کارشناسی مهندسی عمران</strong> - دانشگاه ولایت</p>
                <p>&bull; <strong>پذیرش پژوهشی مقطع کارشناسی ارشد</strong> - دانشگاه پوترا مالزی (UPM)</p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-2 space-y-2">
              <strong className="text-gray-900 block">پروژه‌های شاخص:</strong>
              <ul className="text-[11px] text-gray-600 space-y-1">
                <li>• توسعه مدل هوش مصنوعی تشخیص ترک بتن با دقت ۹۸٪ (ResNet-18)</li>
                <li>• طراحی و توسعه سامانه همراه ناظر (HamrahNazer PWA)</li>
                <li>• نظارت مقیم عملیات خاکی و آماده‌سازی اراضی و معابر</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ۲. فرم ثبت درخواست همکاری و مشاوره */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-base font-bold text-gray-900">ثبت پیام و استعلام فنی پروژه</h3>
            <p className="text-xs text-gray-500 mt-0.5">جهت مشاوره نظارت کارگاهی، پروژه‌های پردازش تصویر یا توسعه سامانه</p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-sm text-emerald-950">پیام شما با موفقیت ثبت شد</h4>
              <p className="text-xs text-emerald-800">در کوتاه‌ترین زمان ممکن از طریق ایمیل یا اطلاعات تماس با شما ارتباط برقرار خواهد شد.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-700 block mb-1 font-bold">نام و نام خانوادگی / سازمان:</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: مهندسین مشاور / نام کارفرما"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-gray-700 block mb-1 font-bold">ایمیل یا شماره تماس جهت پاسخ:</label>
                <input
                  type="text"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com یا 0912..."
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-gray-700 block mb-1 font-bold">حوزه درخواست:</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-700 focus:outline-none"
                >
                  <option value="civil-supervision">نظارت مقیم و مدیریت اجرای پروژه عمرانی</option>
                  <option value="ai-shm">پایش سلامت سازه و پردازش تصویر (AI / SHM)</option>
                  <option value="software-dev">توسعه نرم‌افزار و سامانه‌های تحت وب مهندسی</option>
                </select>
              </div>

              <div>
                <label className="text-gray-700 block mb-1 font-bold">شرح خلاصه پروژه یا پیام:</label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="جزئیات و نیازهای فنی پروژه خود را شرح دهید..."
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ارسال درخواست همکاری</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
