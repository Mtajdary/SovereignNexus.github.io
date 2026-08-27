import React, { useState } from 'react';
import { BookOpen, Search, HardHat, Eye, Cpu, ChevronLeft, Bookmark, Activity, CheckCircle2 } from 'lucide-react';

export default function KnowledgeHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeDoc, setActiveDoc] = useState(null);

  const docs = [
    {
      id: 'DOC-101-GEO',
      category: 'civil',
      title: 'دستورالعمل جامع آزمایش تراکم خاک و مخروط ماسه (Sand Cone Method)',
      categoryLabel: 'مهندسی عمران و ژئوتکنیک',
      icon: HardHat,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      summary: 'مراحل گام‌به‌گام آزمایش مخروط ماسه بر پایه استاندارد ASTM D1556 و نحوه محاسبه درصد تراکم نسبی طبق نشریه ۱۰۱.',
      fullContent: `۱. مقدمه و مبانی استاندارد:
آزمایش مخروط ماسه متداول‌ترین روش جهت تعیین وزن مخصوص خشک برجا و کنترل درصد تراکم لایه‌های خاکی متراکم‌شده در راه‌سازی و آماده‌سازی اراضی است.

۲. تجهیزات مورد نیاز:
- دستگاه مخروط ماسه با شیر کنترل و قیف فلزی
- ماسه استاندارد کالیبره‌شده (ماسه اوتاوا یکنواخت عاری از خاکه)
- صفحه پایه فلزی، قلم و چکش، ترازوی حساس با دقت ۰.۱ گرم
- رطوبت‌سنج سریع (Speedy) یا آون آزمایشگاهی (۱۰۵ الی ۱۱۰ درجه)

۳. مراحل اجرایی آزمایش در محل کارگاه:
الف) تسطیح سطح لایه و قرار دادن صفحه پایه فلزی روی زمین کاملاً افقی.
ب) حفاری چاله آزمایش با قطر تقریبی صفحه و عمق کامل لایه کوبیده (معمولاً ۱۵ الی ۲۰ سانتی‌متر).
ج) جمع‌آوری کلیه خاک‌های خارج‌شده از چاله داخل کیسه پلاستیکی ناتراوا و وزن‌کشی دقیق (W_wet).
د) قرار دادن دستگاه مخروط ماسه با وزن اولیه معین روی صفحه و باز کردن شیر تا پر شدن کامل چاله و قیف.
هـ) بستن شیر، برداشتن دستگاه و وزن‌کشی باقیمانده ماسه جهت تعیین وزن ماسه ورودی به چاله.

۴. روابط و فرمول‌های محاسباتی:
- حجم چاله: V_hole = (W_sand_total - W_cone) / γ_sand
- وزن مخصوص مرطوب خاک: γ_wet = W_wet / V_hole
- وزن مخصوص خشک میدانی: γ_d = γ_wet / (1 + w/100)
- درصد تراکم نسبی (RC): RC = (γ_d / γ_d,max) × 100

۵. معیارهای پذیرش نشریه ۱۰۱:
- لایه خاکریز بستر: حداقل ۹۰٪ الی ۹۵٪
- ۱۵ سانتی‌متر فوقانی ساب‌گرید: حداقل ۱۰۰٪ تراکم پروکتور اصلاح‌شده
- لایه‌های زیراساس و اساس: حداقل ۱۰۰٪ تراکم پروکتور اصلاح‌شده.`
    },
    {
      id: 'DOC-ACI-CONC',
      category: 'civil',
      title: 'راهنمای نظارتی بتن‌ریزی در هوای گرم و پیشگیری از ترک‌های جمع‌شدگی',
      categoryLabel: 'مهندسی عمران و تکنولوژی بتن',
      icon: Activity,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      summary: 'تحلیل نرخ تبخیر سطحی مطابق ACI 305R و ضوابط آیین‌نامه بتن ایران (آبا) در دمای بالای ۳۵ درجه.',
      fullContent: `۱. خطرات بتن‌ریزی در اقلیم‌های گرم:
افزایش دمای محیط و وزش باد سبب تسریع هیدراتاسیون، افت سریع اسلامپ، افزایش آب مصرفی و نهایتاً تشکیل ترک‌های جمع‌شدگی پلاستیک (Plastic Shrinkage Cracking) پیش از گیرش نهایی می‌گردد.

۲. حد بحرانی نرخ تبخیر:
مطابق نمودار ACI 305R، در صورتی که نرخ تبخیر آب از سطح بتن از ۱.۰ کیلوگرم بر مترمربع در ساعت فراتر رود، اقدامات پیشگیرانه فوری الزامی است. در شرایط بتن‌های حاوی پوزولان یا میکروسیلیس، این حد بحرانی به ۰.۵ کیلوگرم کاهش می‌یابد.

۳. الزامات آیین‌نامه آبا جهت کنترل کیفیت:
- دمای بتن تازه در هنگام تخلیه نباید از ۳۲ درجه سانتی‌گراد فراتر رود.
- استفاده از یخ خردشده جایگزین بخشی از آب اختلاط بتن.
- سایه‌اندازی بر روی سنگدانه‌ها و دپوی مصالح و رنگ‌آمیزی سفید مخازن آب و تراک میکسرها.
- اجتناب از بتن‌ریزی در ساعات اوج تابش آفتاب (ترجیحاً بتن‌ریزی شبانه یا بامداد).

۴. الزامات کیورینگ (عمل‌آوری):
بلافاصله پس از پرداخت نهایی، پاشش ترکیبات غشایی تشکیل‌دهنده فیلم پیوسته (Curing Compounds) یا پوشاندن با گونی‌های چتایی کاملاً مرطوب و نایلون الزامی است.`
    },
    {
      id: 'DOC-AI-RESNET',
      category: 'ai',
      title: 'مستندات معماری ترنسفر لرنینگ ResNet-18 در پردازش تصویر بتن',
      categoryLabel: 'هوش مصنوعی و یادگیری عمیق',
      icon: Eye,
      color: 'text-sky-700 bg-sky-50 border-sky-200',
      summary: 'تحلیل اتصالات باقیمانده (Residual Blocks)، استخراج ویژگی‌های مورفولوژیکی ترک و نمودار ماتریس سردرگمی.',
      fullContent: `۱. تئوری اتصالات مانده (Residual Connections):
شبکه‌های عصبی عمیق معمولی با افزایش تعداد لایه‌ها با مشکل محو گرادیان (Vanishing Gradient) مواجه می‌شوند. ساختار ResNet با تعریف بلوک‌های باقی‌مانده (F(x) + x) جریان مستقیم گرادیان را به لایه‌های اولیه تسهیل می‌کند.

۲. پایپ‌لاین آموزش (Training Pipeline):
- مجموعه داده: ۴۰,۰۰۰ تصویر شامل ۲۰,۰۰۰ تصویر بتن ترک‌خورده و ۲۰,۰۰۰ تصویر بتن سالم.
- تفکیک داده‌ها: ۷۰٪ آموزش، ۱۵٪ اعتبارسنجی و ۱۵٪ تست مستقل.
- Loss Function: Cross-Entropy Loss جهت بهینه‌سازی احتمال حضور ترک.
- Optimizer: AdamW با نرخ کاهش وزن 0.01 برای پیشگیری از بیش‌برازش (Overfitting).

۳. ماتریس اعتبارسنجی (Confusion Matrix):
- True Positive (تشخیص صحیح ترک): ۹۸.۶٪
- True Negative (تشخیص صحیح سطح سالم): ۹۸.۲٪
- False Positive (تشخیص اشتباه خط‌وخش به عنوان ترک): ۱.۴٪
- False Negative (از قلم افتادن میکروترک): ۱.۸٪

۴. استقرار بهینه (Edge Deployment):
تنسورهای خروجی با فرمت ONNX جهت استنتاج سریع در بستر مرورگر وب و PWA کوانتایز گردیده‌اند.`
    },
    {
      id: 'DOC-SW-PWA',
      category: 'software',
      title: 'معماری ذخیره‌سازی محلی و همگام‌سازی ناهمگام در سامانه‌های وب مهندسی',
      categoryLabel: 'معماری نرم‌افزار و وب',
      icon: Cpu,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      summary: 'پیاده‌سازی IndexedDB، مدیریت صف‌های Background Sync و کشینگ هوشمند Service Worker.',
      fullContent: `۱. چالش‌های نرم‌افزارهای مهندسی در کارگاه:
قطع مکرر ارتباط اینترنت در محیط‌های کارگاهی باعث از دست رفتن داده‌های فرم‌های ثبت گزارش و نتایج آزمایش‌ها می‌شود.

۲. لایه‌های ذخیره‌سازی:
- لایه اول (Memory State): نگهداری موقت حالت‌های متغیر در React Context / Redux.
- لایه دوم (IndexedDB): پایگاه داده شی‌گرای مرورگر با ظرفیت چند گیگابایت جهت ذخیره محلی گزارش‌ها، تصاویر ضمیمه و محاسبات.
- لایه سوم (Sync Queue): صف اولویت‌دار درخواست‌ها؛ به محض برقراری سیگنال اینترنت، رویداد SyncManager درخواست‌های ذخیره‌شده را به سرور ابری ارسال می‌نماید.

۳. امنیت داده‌های کارگاهی:
اطلاعات ذخیره‌شده در حافظه مرورگر با استاندارد AES-256 کدگذاری شده و صرفاً با کلید مجاز کاربر قابل دسترسی است.`
    }
  ];

  const filteredDocs = docs.filter((doc) => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = doc.title.includes(searchQuery) || doc.summary.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-6 text-right font-sans" dir="rtl">
      {/* سربرگ */}
      <div className="clay-card p-6 sm:p-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-bold shadow-xs">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>TECHNICAL SPECIFICATIONS &amp; CODES</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">پایگاه جامع مشخصات فنی و استانداردهای مهندسی</h2>
        <p className="text-xs text-slate-500 leading-relaxed">مرجع تفصیلی دستورالعمل‌های ژئوتکنیک، نشریه ۱۰۱، ضوابط آبا و الگوریتم‌های هوش مصنوعی</p>
      </div>

      {/* جستجو و فیلتر */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute right-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو در مشخصات فنی، استانداردها و مقالات..."
            className="w-full pr-11 pl-4 py-2.5 rounded-full bg-white/90 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            همه حوزه‌ها
          </button>
          <button
            onClick={() => setSelectedCategory('civil')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
              selectedCategory === 'civil'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            عمران و ژئوتکنیک
          </button>
          <button
            onClick={() => setSelectedCategory('ai')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
              selectedCategory === 'ai'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            هوش مصنوعی
          </button>
          <button
            onClick={() => setSelectedCategory('software')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
              selectedCategory === 'software'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            معماری نرم‌افزار
          </button>
        </div>
      </div>

      {/* لیست اسناد فنی */}
      <div className="grid grid-cols-1 gap-4">
        {filteredDocs.map((doc) => {
          const Icon = doc.icon;
          return (
            <div
              key={doc.id}
              className="clay-card p-6 hover:border-emerald-400 transition-all space-y-3.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className={`p-3 rounded-2xl border ${doc.color} shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-400">{doc.id}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {doc.categoryLabel}
                      </span>
                    </div>
                    <h3 className="font-black text-sm sm:text-base text-slate-900 mt-1">{doc.title}</h3>
                  </div>
                </div>

                <button
                  onClick={() => setActiveDoc(doc)}
                  className="px-4 py-2 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-xs"
                >
                  <span>مطالعه کامل متن</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pr-1">
                {doc.summary}
              </p>
            </div>
          );
        })}
      </div>

      {/* مدال مطالعه محتوای تفصیلی سند */}
      {activeDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto text-right" dir="rtl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {activeDoc.id} &bull; {activeDoc.categoryLabel}
              </span>
              <button
                onClick={() => setActiveDoc(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            <h3 className="font-black text-base sm:text-lg text-slate-900 leading-snug">{activeDoc.title}</h3>
            
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap font-sans space-y-2">
              {activeDoc.fullContent}
            </div>

            <div className="pt-2 text-left">
              <button
                onClick={() => setActiveDoc(null)}
                className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all"
              >
                بستن و بازگشت
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
