import React, { useState } from 'react';
import { BookOpen, Search, Filter, HardHat, Eye, Cpu, FileText, ChevronLeft, Bookmark } from 'lucide-react';

export default function KnowledgeHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeDoc, setActiveDoc] = useState(null);

  const docs = [
    {
      id: 'DOC-101-01',
      category: 'civil',
      title: 'ضوابط تراکم و آماده‌سازی بستر خاکی (نشریه ۱۰۱)',
      categoryLabel: 'مهندسی عمران و ژئوتکنیک',
      icon: HardHat,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      summary: 'مشخصات فنی آزمایش‌های تراکم پروکتور، ضخامت لایه‌های کوبیده و معیارهای پذیرش خاک بستر.',
      fullContent: `۱. ضوابط بستر روسازی (Subgrade):
- خاک بستر باید حداقل تا عمق ۱۵ سانتی‌متر با رطوبت بهینه متراکم شده و حداقل ۹۵٪ الی ۱۰۰٪ تراکم پروکتور اصلاح‌شده (AASHTO T-180) را احراز نماید.
- لایه‌های خاکریز باید با حداکثر ضخامت کوبیده ۱۵ الی ۲۰ سانتی‌متر اجرا گردند.

۲. لایه زیراساس (Subbase):
- دانه‌بندی باید در محدوده پیوسته جدول نشریه ۱۰۱ قرار گیرد و فاقد مواد آلی باشد.
- ارزش ماسه‌ای (Sand Equivalent) نباید از ۳۰ کمتر باشد.
- ضریب باربری کالیفرنیا (CBR) آزمایشگاهی در تراکم ۱۰۰٪ باید حداقل ۳۰٪ باشد.`
    },
    {
      id: 'DOC-AI-02',
      category: 'ai',
      title: 'پایپ‌لاین ترنسفر لرنینگ در طبقه‌بندی ترک بتن (ResNet-18)',
      categoryLabel: 'هوش مصنوعی و بینایی ماشین',
      icon: Eye,
      color: 'text-sky-700 bg-sky-50 border-sky-200',
      summary: 'معماری استخراج ویژگی، تابع هزینه Cross-Entropy و بهینه‌ساز AdamW در تشخیص آسیب‌های سازه‌ای.',
      fullContent: `۱. پیش‌پردازش داده‌ها (Data Preprocessing):
- نرمال‌سازی تصاویر با میانگین [0.485, 0.456, 0.406] و انحراف معیار [0.229, 0.224, 0.225].
- اعمال Data Augmentation شامل چرخش‌های تصادفی و تنظیم کنتراست نوری برای شبیه‌سازی شرایط کارگاه.

۲. ساختار مدل و آموزش:
- لایه‌های اولیه به عنوان استخراج‌کننده الگوهای مرزی منجمد شده و لایه‌های پایانی (Fully Connected) فاین‌تیون می‌گردند.
- نرخ یادگیری اولیه: 1e-4 با نرخ کاهش دوره‌ای بر پایه Cosine Annealing.`
    },
    {
      id: 'DOC-SW-03',
      category: 'software',
      title: 'معماری همگام‌سازی آفلاین در PWAهای مهندسی',
      categoryLabel: 'معماری نرم‌افزار',
      icon: Cpu,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      summary: 'الگوی کشینگ دوگانه با Service Worker، صف‌های Background Sync و پایگاه داده IndexedDB.',
      fullContent: `۱. استراتژی ذخیره‌سازی داده‌های کارگاهی:
- در صورت قطع شبکه اینترنت در سایت کارگاه، تمام فرم‌های تکمیل‌شده در IndexedDB محلی ذخیره می‌شوند.
- بلافاصله پس از برقراری مجدد اتصال، ماژول SyncManager درخواست‌ها را به صورت دسته‌ای به سرور ارسال و وضعیت را تایید می‌کند.

۲. استراتژی کش دارایی‌های بصری:
- استفاده از استراتژی Stale-While-Revalidate برای استایل‌ها و کتابخانه‌ها جهت تضمین سرعت بارگذاری زیر ۱ ثانیه.`
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
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>ENGINEERING KNOWLEDGE HUB</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">پایگاه دانش، استانداردها و مشخصات فنی</h2>
          <p className="text-xs text-gray-500 mt-0.5">مرجع مستندات فنی راه‌سازی، الگوریتم‌های هوش مصنوعی و الگوهای نرم‌افزاری</p>
        </div>
      </div>

      {/* نوار جستجو و فیلترها */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو در مشخصات فنی و مقالات..."
            className="w-full pr-10 pl-4 py-2.5 rounded-full bg-white border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-emerald-500 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-gray-900 text-white shadow-xs'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            همه حوزه‌ها
          </button>
          <button
            onClick={() => setSelectedCategory('civil')}
            className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
              selectedCategory === 'civil'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            عمران و ژئوتکنیک
          </button>
          <button
            onClick={() => setSelectedCategory('ai')}
            className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
              selectedCategory === 'ai'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            هوش مصنوعی
          </button>
          <button
            onClick={() => setSelectedCategory('software')}
            className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
              selectedCategory === 'software'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            نرم‌افزار
          </button>
        </div>
      </div>

      {/* لیست اسناد فنی */}
      <div className="grid grid-cols-1 gap-3.5">
        {filteredDocs.map((doc) => {
          const Icon = doc.icon;
          return (
            <div
              key={doc.id}
              className="p-5 rounded-3xl bg-white border border-gray-200 shadow-xs hover:border-emerald-400 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-2xl border ${doc.color} shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-gray-500">{doc.id}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
                        {doc.categoryLabel}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 mt-1">{doc.title}</h3>
                  </div>
                </div>

                <button
                  onClick={() => setActiveDoc(doc)}
                  className="px-4 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all shrink-0 flex items-center gap-1"
                >
                  <span>مطالعه کامل</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {doc.summary}
              </p>
            </div>
          );
        })}
      </div>

      {/* مدال مطالعه محتوای تفصیلی سند */}
      {activeDoc && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-gray-200 shadow-xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                {activeDoc.id} &bull; {activeDoc.categoryLabel}
              </span>
              <button
                onClick={() => setActiveDoc(null)}
                className="text-gray-400 hover:text-gray-800 text-sm font-bold"
              >
                بستن ✕
              </button>
            </div>

            <h3 className="font-black text-base sm:text-lg text-gray-900">{activeDoc.title}</h3>
            
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-800 leading-relaxed whitespace-pre-wrap font-sans">
              {activeDoc.fullContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
