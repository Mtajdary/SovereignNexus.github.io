import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSovereign } from '../../context/SovereignContext';
import { Lock, Unlock, Download, ShieldAlert, Zap, Globe, Cpu, CheckCircle2, X } from 'lucide-react';

const INTEL_ASSETS = [
  {
    id: 'v1',
    title: '80/20 MENTAL ARCHITECTURE',
    cost: 450,
    tier: 'STRATEGIST',
    desc: 'چارچوب تفکر استراتژیک برای اولویت‌بندی تسک‌های حیاتی و حذف ۸۰٪ هدررفت انرژی ذهنی.',
    content: `پروتکل اجرایی:
۱. هر صبح تنها ۲ تسک حیاتی با بالاترین اهرم ارزش را مشخص کنید.
۲. ورود به شبکه‌های اجتماعی و پیام‌ها را تا اتمام تسک اول ممنوع کنید.
۳. شاخص پیشرفت را فقط با خروجی‌های ملموس اندازه‌گیری نمایید.`,
    icon: Zap
  },
  {
    id: 'v2',
    title: 'BIO-CIRCADIAN CODES',
    cost: 750,
    tier: 'STRATEGIST',
    desc: 'مهندسی زمان‌بندی بیولوژیک، بهینه‌سازی ریتم خواب و اوج ترشح انتقال‌دهنده‌های عصبی تمرکز.',
    content: `کدهای بیولوژیک:
- دریافت نور مستقیم خورشید ظرف ۳۰ دقیقه پس از بیداری
- عدم مصرف کافئین تا ۹۰ دقیقه پس از بیدار شدن برای تثبیت آدنوزین
- بلوک تمرکز ۹۰ دقیقه‌ای در اوج نوسان دمای بدن.`,
    icon: Globe
  },
  {
    id: 'v3',
    title: 'SOVEREIGN WEALTH & LEVERAGE',
    cost: 1500,
    tier: 'ARCHITECT',
    desc: 'پروتکل‌های ایجاد دارایی‌های دیجیتال، مهارت‌های فنی دارای اهرم و استقلال مالی بلندمدت.',
    content: `نقشه راه ثروت حاکمیتی:
- کدنویسی و ابزارهای نرم‌افزاری به عنوان اهرم بدون نیاز به نیروی انسانی
- انتشار محتوا و ساخت برند شخصی تخصصی
- سرمایه‌گذاری پیوسته در یادگیری مهارت‌های کمیاب.`,
    icon: ShieldAlert
  },
  {
    id: 'v4',
    title: 'NEURAL DEEP-WORK ENGINE',
    cost: 2000,
    tier: 'SOVEREIGN',
    desc: 'دستیابی به ۴ ساعت غرقگی پیوسته بدون افت انرژی با امواج صوتی دوگوشی و تکنیک‌های عصب‌شناختی.',
    content: `پروتکل تمرکز ۴ ساعته:
- قطع کامل اتصالات شبکه در دستگاه اصلی
- استفاده از امواج ۴۰ هرتز گاما برای کارهای محاسباتی سنگین
- تجسم ۱۰ دقیقه‌ای سناریوی هدف پیش از شروع.`,
    icon: Cpu
  },
];

const VaultEngine = () => {
  const { coins, unlockedItems, spendCoins, setUnlockedItems } = useSovereign();
  const [selectedAsset, setSelectedAsset] = useState(null);

  const handleUnlock = (asset) => {
    if (spendCoins(asset.cost, `گشایش قفل سند ${asset.title}`)) {
      setUnlockedItems([...unlockedItems, asset.id]);
      setSelectedAsset(asset);
    } else {
      alert(`اعتبار کافی نیست! شما به ${asset.cost} سکه حاکمیتی نیاز دارید.`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 text-right space-y-10">
      <div className="relative w-full rounded-[36px] overflow-hidden glass p-10 md:p-12 border border-gold/20">
        <span className="text-gold text-[10px] tracking-[0.4em] uppercase font-mono block mb-2">CLASSIFIED ARCHIVE</span>
        <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold mb-4">
          گاوصندوق <span className="gold-text">حاکمیتی</span> (Sovereign Vault)
        </h2>
        <p className="text-white/60 text-sm max-w-2xl font-light">
          مجموعه اسناد، پروتکل‌ها و متدولوژی‌های استراتژیک قفل‌شده. این اسناد را با سکه‌های حاکمیتیِ به‌دست‌آمده از جلسات تمرکز بازگشایی کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {INTEL_ASSETS.map((asset) => {
          const isUnlocked = unlockedItems.includes(asset.id);
          const Icon = asset.icon;

          return (
            <motion.div
              key={asset.id}
              whileHover={{ y: -4 }}
              className="glass p-8 rounded-[32px] border border-white/10 hover:border-gold/30 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3.5 rounded-2xl ${isUnlocked ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-gold/10 text-gold border border-gold/30'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full ${isUnlocked ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-gold'}`}>
                    {isUnlocked ? 'گشوده شده (UNLOCKED)' : `نیاز به ${asset.cost} SC`}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white mb-3">{asset.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed mb-6 font-light">{asset.desc}</p>
              </div>

              <div>
                {isUnlocked ? (
                  <button
                    onClick={() => setSelectedAsset(asset)}
                    className="w-full py-3.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    مطالعه سند محرمانه
                  </button>
                ) : (
                  <button
                    onClick={() => handleUnlock(asset)}
                    className="w-full py-3.5 bg-gold text-black hover:bg-gold-light rounded-2xl text-xs font-bold tracking-widest uppercase transition-all gold-glow"
                  >
                    بازگشایی سند ({asset.cost} سکه)
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Asset Content Viewer Modal */}
      <AnimatePresence>
        {selectedAsset && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-8 md:p-12 rounded-[36px] max-w-2xl w-full border border-gold/40 relative text-right"
            >
              <button
                onClick={() => setSelectedAsset(null)}
                className="absolute top-6 left-6 text-white/40 hover:text-white focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                aria-label="بستن"
              >
                <X className="w-6 h-6" />
              </button>

              <span className="text-[9px] font-mono text-gold tracking-widest block mb-2">SOVEREIGN INTEL ASSET</span>
              <h3 className="font-serif text-2xl font-bold text-white mb-6">{selectedAsset.title}</h3>

              <div className="bg-black/60 p-6 rounded-2xl border border-white/10 mb-8 whitespace-pre-line text-sm text-white/90 leading-loose font-sans">
                {selectedAsset.content}
              </div>

              <button
                onClick={() => setSelectedAsset(null)}
                className="w-full py-3.5 bg-gold text-black font-bold text-xs rounded-xl gold-glow"
              >
                تأیید و بازگشت
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VaultEngine;
