import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Cpu, HardHat, Mail } from 'lucide-react';

export default function ContactResumeSuite() {
  const [formData, setFormData] = useState({ name: '', email: '', service: 'ai-shm', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', service: 'ai-shm', message: '' });
    }, 4000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 space-y-6 text-right font-sans" dir="rtl">
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
        <span className="text-[10px] font-mono text-slate-400 block uppercase">PROJECT INQUIRY DESK</span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">ثبت استعلام و درخواست خدمات فنی</h2>
        <p className="text-xs text-slate-500 leading-relaxed">جهت مشاوره پایش سلامت سازه، توسعه نرم‌افزار مهندسی یا نظارت کارگاهی</p>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs">
        {submitted ? (
          <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-sm text-emerald-950">درخواست شما با موفقیت ثبت شد</h4>
            <p className="text-xs text-emerald-800">بررسی فنی انجام و از طریق اطلاعات تماس با شما ارتباط برقرار خواهد شد.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label htmlFor="name" className="text-slate-700 block mb-1 font-bold">نام شرکت / سازمان یا عنوان متقاضی: <span className="text-red-500">*</span></label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="مثال: شرکت مهندسین مشاور / آزمایشگاه مکانیک خاک"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-slate-700 block mb-1 font-bold">ایمیل یا شماره تماس جهت ارتباط: <span className="text-red-500">*</span></label>
              <input
                id="email"
                type="text"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="info@company.com یا شماره تماس"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="service" className="text-slate-700 block mb-1 font-bold">حوزه خدمات مورد نظر:</label>
              <select
                id="service"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none"
              >
                <option value="ai-shm">پایش هوشمند سازه و پردازش تصویر (AI SHM)</option>
                <option value="software-dev">توسعه نرم‌افزار مهندسی و سامانه‌های PWA</option>
                <option value="civil-qc">مشاوره نظارت مقیم و کنترل کیفیت ژئوتکنیک</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="text-slate-700 block mb-1 font-bold">شرح خلاصه نیاز یا مشخصات پروژه: <span className="text-red-500">*</span></label>
              <textarea
                id="message"
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="جزئیات فنی، حجم کار یا خروجی‌های مدنظر خود را شرح دهید..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-emerald-400" />
              <span>ارسال استعلام پروژه</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
