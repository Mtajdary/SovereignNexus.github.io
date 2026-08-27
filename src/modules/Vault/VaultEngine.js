import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSovereign } from '../../context/SovereignContext';
import { Lock, Unlock, Download, ShieldAlert, Zap, Globe, Cpu, CheckCircle2, X } from 'lucide-react';

const INTEL_ASSETS = [
  {
    id: `v1`,
    title: `80/20 MENTAL ARCHITECTURE`,
    cost: 450,
    tier: `STRATEGIST`,
    desc: `چارچوب تفکر استراتژیک برای اولویت‌بندی تسک‌های حیاتی و حذف ۸۰٪ هدررفت انرژی ذهنی.`,
    content: `پروتکل اجرایی:
۱. هر صبح تنها ۲ تسک حیاتی با بالاترین اهرم ارزش را مشخص کنید.
۲. ورود به شبکه‌های اجتماعی و پیام‌ها را تا اتمام تسک اول ممنوع کنید.
۳. شاخص پیشرفت را فقط با خروجی‌های ملموس اندازه‌گیری نمایید.`,
    icon: Zap
  },
  {
    id: `v2`,
    title: `BIO-CIRCADIAN CODES`,
    cost: 750,
    tier: `STRATEGIST`,
    desc: `مهندسی زمان‌بندی بیولوژیک، بهینه‌سازی ریتم خواب و اوج ترشح انتقال‌دهنده‌های عصبی.`,
    content: `کدهای بیولوژیک:
- دریافت نور مستقیم خورشید ظرف ۳۰ دقیقه پس از بیداری
- عدم مصرف کافئین تا ۹۰ دقیقه پس از بیدار شدن برای تثبیت آدنوزین
- بلوک تمرکز ۹۰ دقیقه‌ای در اوج نوسان دمای بدن.`,
    icon: Globe
  },
  {
    id: `v3`,
    title: `SOVEREIGN WEALTH & LEVERAGE`,
    cost: 1500,
    tier: `ARCHITECT`,
    desc: `پروتکل‌های ایجاد دارایی‌های دیجیتال، مهارت‌های فنی دارای اهرم و استقلال مالی.`,
    content: `نقشه راه ثروت حاکمیتی:
- کدنویسی و ابزارهای نرم‌افزاری به عنوان اهرم بدون نیاز به نیروی انسانی
- انتشار محتوا و ساخت برند شخصی تخصصی
- سرمایه‌گذاری پیوسته در یادگیری مهارت‌های کمیاب.`,
    icon: ShieldAlert
  }
];

export default function VaultEngine() {
  const { points = 0, unlockVaultItem, unlockedItems = [] } = useSovereign() || {};
  const [selectedAsset, setSelectedAsset] = useState(null);

  const handleUnlock = (asset) => {
    if (points >= asset.cost && unlockVaultItem) {
      unlockVaultItem(asset.id, asset.cost);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-gray-800/60 p-4 rounded-xl border border-gray-700">
        <div>
          <h2 className="text-xl font-bold text-white">خزانه دانش و پروتکل‌ها</h2>
          <p className="text-sm text-gray-400">دارایی‌های فکری استراتژیک برای ارتقای رتبه</p>
        </div>
        <div className="bg-amber-500/20 text-amber-400 px-4 py-2 rounded-lg font-mono font-bold">
          امتیاز شما: {points}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {INTEL_ASSETS.map((asset) => {
          const Icon = asset.icon;
          const isUnlocked = unlockedItems.includes(asset.id);

          return (
            <div
              key={asset.id}
              className={`p-5 rounded-2xl border transition-all ${
                isUnlocked
                  ? 'bg-gray-800/80 border-cyan-500/40'
                  : 'bg-gray-900/60 border-gray-800'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-800 rounded-xl text-cyan-400">
                  <Icon size={24} />
                </div>
                <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded font-mono">
                  {asset.tier}
                </span>
              </div>

              <h3 className="font-bold text-white mb-2">{asset.title}</h3>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed line-clamp-2">
                {asset.desc}
              </p>

              {isUnlocked ? (
                <button
                  onClick={() => setSelectedAsset(asset)}
                  className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Unlock size={16} /> مشاهده محتوا
                </button>
              ) : (
                <button
                  onClick={() => handleUnlock(asset)}
                  disabled={points < asset.cost}
                  className={`w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 ${
                    points >= asset.cost
                      ? 'bg-amber-600 hover:bg-amber-500 text-white'
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Lock size={16} /> آزادسازی ({asset.cost} امتیاز)
                </button>
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-gray-900 border border-cyan-500/40 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-cyan-400">{selectedAsset.title}</h3>
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="bg-gray-800/60 p-4 rounded-xl text-sm leading-relaxed text-gray-200 whitespace-pre-line font-mono mb-4">
                {selectedAsset.content}
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-sm"
              >
                بستن
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
