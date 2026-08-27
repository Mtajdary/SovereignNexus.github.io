import React, { useState } from 'react';
import { Eye, HardHat, Cpu, ChevronDown, ChevronUp, CheckCircle2, FileText, Code2, Layers, BookOpen } from 'lucide-react';

export default function ProjectsSection() {
  const [expandedId, setExpandedId] = useState(1);

  const projects = [
    {
      id: 1,
      title: 'تشخیص و طبقه‌بندی خودکار ترک‌های بتن با یادگیری عمیق (PyTorch & ResNet-18)',
      category: 'هوش مصنوعی و بینایی ماشین (SHM)',
      icon: Eye,
      color: 'text-sky-700 bg-sky-50 border-sky-200',
      summary: 'توسعه پایپ‌لاین بینایی ماشین جهت پایش سلامت سازه‌ها و تفکیک خودکار تصاویر سطوح بتنی ترک‌خورده و سالم با دقت ۹۸.۴٪.',
      dossier: {
        abstract: 'ارزیابی چشمی ترک‌های سازه‌ای بتن در پروژه‌های بزرگ زیرساخت و پل‌ها علاوه بر هزینه‌بر بودن، تحت تأثیر خطای انسانی قرار دارد. این پروژه با به‌کارگیری تکنیک Transfer Learning بر روی معماری ResNet-18، پایپ‌لاینی خودکار برای طبقه‌بندی و ارزیابی ترک‌ها ارائه می‌دهد.',
        architecture: [
          'ستون فقرات مدل (Backbone): استفاده از لایه‌های Convolutional مدل ResNet-18 آموزش‌دیده روی ImageNet به عنوان استخراج‌کننده ویژگی‌های مرزی و گرادیان‌های بافت بتن.',
          'پیش‌پردازش داده‌ها: تغییر ابعاد تصاویر به ۲۲۴×۲۲۴ پیکسل، نرمال‌سازی کانال‌های رنگی با مقادیر استاندارد ImageNet و اعمال افزونگی داده (Random Horizontal/Vertical Flip & Color Jittering).',
          'لایه طبقه‌بندی (Classifier): تعویض لایه پایانی Linear با ساختار اختصاصی شامل Dropout(0.3) و خروجی دو کلاسه با تابع فعال‌سازی Softmax.',
          'هایپرپارامترهای بهینه‌سازی: تابع هزینه Cross-Entropy Loss با الگوریتم AdamW (نرخ یادگیری 1e-4 و وزن جریمه 1e-2) و زمان‌بندی CosineAnnealingLR.'
        ],
        results: [
          'دقت اعتبارسنجی (Validation Accuracy): ۹۸.۴ درصد بر روی مجموعه داده حاوی ۴۰,۰۰۰ تصویر بتن.',
          'زمان استنتاج میانگین (Inference Latency): ۱۴.۲ میلی‌ثانیه بر روی پردازنده گرافیکی (GPU) و ۳۸ میلی‌ثانیه بر روی CPU استاندارد.',
          'کاهش خطای مثبت کاذب (False Positives) در مواجهه با خط و خش‌های سطحی و ناهمواری‌های غیرسازه‌ای.'
        ]
      }
    },
    {
      id: 2,
      title: 'سامانه نرم‌افزاری «همراه ناظر» (HamrahNazer PWA Suite)',
      category: 'توسعه وب‌اپلیکیشن و نرم‌افزارهای مهندسی',
      icon: Cpu,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      summary: 'پلتفرم تحت وب پیش‌رونده جهت محاسبات کارگاهی، مستندسازی آزمایش‌های ژئوتکنیک و تنظیم فرم‌های نظارتی در شرایط آفلاین.',
      dossier: {
        abstract: 'مهندسان ناظر در کارگاه‌های عمرانی دورافتاده اغلب با عدم دسترسی پایدار به شبکه اینترنت مواجه هستند. سامانه همراه ناظر با معماری آفلاین‌محور و استانداردهای PWA، انجام محاسبات میدانی و ثبت آزمون‌ها را در هر شرایطی ممکن می‌سازد.',
        architecture: [
          'مدیریت حافظه پنهان (Cache Strategy): به‌کارگیری Service Worker با الگوی Stale-While-Revalidate برای دارایی‌های ایستا و استراتژی Cache First برای فرم‌های محاسباتی.',
          'پایگاه داده محلی (Client-Side Storage): ذخیره‌سازی ساختاریافته صورت‌جلسات، نتایج آزمون‌های تراکم و گزارش‌های روزانه با IndexedDB و همگام‌سازی دوطرفه خودکار (Background Sync).',
          'موتور محاسباتی درجا: پیاده‌سازی الگوریتم‌های استاندارد نشریه ۱۰۱ شامل محاسبات تراکم نسبی، دانسیته خشک خاک و رده مقاومتی بتن بدون وابستگی به سرور.',
          'خروجی چاپی خودکار: قابلیت تبدیل مستقیم داده‌های فرم به فایل‌های آماده چاپ و استاندارد مهندسی.'
        ],
        results: [
          'کاهش ۹۰ درصدی زمان ثبت و پردازش اطلاعات آزمایشگاهی در محل کارگاه.',
          'حذف خطاهای محاسباتی دستی اپراتورها در تبدیل واحدهای جک بتن‌شکن و دانسیته خاک.',
          'قابلیت نصب مستقیم روی دستگاه‌های Android، iOS و رایانه‌های ویندوزی بدون نیاز به استور.'
        ]
      }
    },
    {
      id: 3,
      title: 'نظارت مقیم بر پروژه‌های آماده‌سازی زیرساخت، عملیات خاکی و معابر',
      category: 'مهندسی عمران، نظارت مقیم و ژئوتکنیک',
      icon: HardHat,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      summary: 'هدایت فنی و نظارت عالیه بر عملیات خاکی سنگین، تراکم بستر، لایه‌های اساس/زیراساس و جدول‌گذاری مطابق نشریه ۱۰۱.',
      dossier: {
        abstract: 'نظارت مقیم مهندسی مستلزم کنترل دقیق تطابق نقشه‌های اجرایی، راستی‌آزمایی آزمون‌های مکانیک خاک، نظارت بر کارکرد ناوگان ماشین‌آلات و رعایت مشخصات فنی عمومی راه‌سازی است.',
        architecture: [
          'کنترل بستر خاکی (Subgrade): نظارت بر کوبش لایه‌های ۱۵ تا ۲۰ سانتی‌متری با تنظیم رطوبت بهینه خاک و اخذ تراکم حداقل ۹۵٪ پروکتور اصلاح‌شده.',
          'لایه‌های زیراساس و اساس (Subbase & Base): کنترل دانه‌بندی مصالح شکسته کوهی، تست‌های سایش لوس‌آنجلس، هم‌ارز ماسه‌ای (SE > 30) و احراز تراکم ۱۰۰٪.',
          'تطبیق رقوم نقشه‌برداری: کنترل شیب‌های طولی و عرضی معابر، بر و کف جدول‌گذاری‌ها و کانیوها جهت هدایت هیدرولیکی آب‌های سطحی.',
          'کنترل کیفیت بتن درجا: نظارت بر طرح اختلاط، آزمایش اسلامپ و کنترل شرایط عمل‌آوری (کیورینگ) قطعات پیش‌ساخته و بتن‌ریزی‌های سازه‌ای.'
        ],
        results: [
          'تنظیم و تأیید بیش از صدها صورت‌جلسه کارکرد، آزمایش ژئوتکنیک و مقادیر احجام عملیات خاکی.',
          'پیشگیری از نشست‌های نامتقارن و ترک‌های روسازی از طریق کنترل سخت‌گیرانه تراکم لایه‌ها.',
          'همکاری و تطبیق مستقیم داده‌ها با آزمایشگاه فنی و مکانیک خاک و مشاور کارفرما.'
        ]
      }
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-6 text-right font-sans" dir="rtl">
      {/* سربرگ */}
      <div className="clay-card p-6 sm:p-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/80 border border-blue-300 text-blue-900 text-xs font-bold shadow-xs">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>PROJECT DOSSIERS &amp; ENGINEERING PAPERS</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">پروژه‌های شاخص و پژوهش‌های فنی تفصیلی</h2>
        <p className="text-xs text-slate-500 leading-relaxed">مطالعه عمیق مستندات معماری، ساختار کدها، داده‌های آزمایشگاهی و نتایج حاصله</p>
      </div>

      <div className="space-y-4">
        {projects.map((p) => {
          const Icon = p.icon;
          const isExpanded = expandedId === p.id;

          return (
            <div key={p.id} className="clay-card p-6 transition-all space-y-4">
              <div 
                className="flex items-start justify-between gap-3 cursor-pointer select-none"
                onClick={() => setExpandedId(isExpanded ? null : p.id)}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`p-3 rounded-2xl border ${p.color} shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 font-mono block uppercase">{p.category}</span>
                    <h3 className="font-black text-sm sm:text-base text-slate-900 mt-1">{p.title}</h3>
                  </div>
                </div>
                <button className="text-slate-400 p-1 hover:text-slate-900 transition-colors">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {p.summary}
              </p>

              {/* محتوای گسترده و تفصیلی پس از باز شدن */}
              {isExpanded && (
                <div className="pt-4 border-t border-slate-100 space-y-4 text-xs text-slate-700 leading-relaxed">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <strong className="text-slate-900 block font-bold">شرح و اهداف پروژه (Abstract):</strong>
                    <p className="text-slate-600 leading-relaxed">{p.dossier.abstract}</p>
                  </div>

                  <div className="space-y-2">
                    <strong className="text-slate-900 block font-bold flex items-center gap-1.5">
                      <Code2 className="w-4 h-4 text-emerald-600" />
                      <span>معماری فنی و جزئیات پیاده‌سازی (Technical Architecture):</span>
                    </strong>
                    <ul className="space-y-1.5 pr-2">
                      {p.dossier.architecture.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-600">
                          <span className="text-emerald-500 font-bold mt-0.5">&bull;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <strong className="text-slate-900 block font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      <span>نتایج و دستاوردهای مهندسی (Key Findings):</span>
                    </strong>
                    <ul className="space-y-1.5 pr-2">
                      {p.dossier.results.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-600">
                          <span className="text-blue-500 font-bold mt-0.5">&bull;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
