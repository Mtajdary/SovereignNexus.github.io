import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSovereign } from '../../context/SovereignContext';
import { Lock, Unlock, CheckCircle2, Sparkles, BookOpen, Shield, Zap, Eye, HardHat } from 'lucide-react';

export default function VaultEngine() {
  const { points = 1250, setPoints } = useSovereign() || {};
  const [unlockedItems, setUnlockedItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pc_unlocked_vault')) || [1];
    } catch {
      return [1];
    }
  });

  const [activeProtocol, setActiveProtocol] = useState(null);

  const protocols = [
    {
      id: 1,
      cost: 0,
      role: 'FOUNDATION',
      title: 'پروتکل نظارت و مدیریت میدانی کارگاه',
      icon: HardHat,
      desc: 'اصول مستندسازی روزانه، آزمون‌های کنترل تراکم ژئوتکنیک و تطبیق صورت‌جلسات با استانداردهای نظام مهندسی و راه‌سازی.',
      content: 'مراحل بازرسی لایه‌های زیرسازی: ۱. تعیین درصد رطوبت بهینه و حداکثر وزن مخصوص خشک خاک ۲. اجرای لایه متراکم با ضخامت حداکثر ۱۵ سانتی‌متر ۳. انجام تست مخروط ماسه و آزمایش تراکم نسبی (حداقل ۹۵٪ الی ۱۰۰٪ طبق مشخصات نشریه ۱۰۱).'
    },
    {
      id: 2,
      cost: 450,
      role: 'AI VISION',
      title: 'الگوریتم پایش هوشمند ترک‌های بتن (ResNet-18)',
      icon: Eye,
      desc: 'پروتکل پردازش تصویر و استفاده از شبکه‌های عصبی عمیق جهت طبقه‌بندی خودکار و شناسایی ابعاد آسیب‌های سازه‌ای.',
      content: 'مدل‌سازی با PyTorch: تصاویر برش‌خورده بتن با ابعاد ۲۲۴x۲۲۴ نرمال‌سازی شده و از طریق ترنسفر لرنینگ بر روی مدل ResNet-18 آموزش داده می‌شوند تا دقت تشخیص ترک‌های مویی به بیش از ۹۸٪ برسد.'
    },
    {
      id: 3,
      cost: 750,
      role: 'SYSTEMS',
      title: 'معماری سامانه‌های خودگردان و آفلاین (PWA Architecture)',
      icon: Zap,
      desc: 'الگوی توسعه نرم‌افزارهای مهندسی با قابلیت کشینگ هوشمند Service Worker و ذخیره‌سازی محلی بدون نیاز به اتصال شبکه.',
      content: 'استراتژی کشینگ: استقرار لایه Cache-First برای استایل‌ها و استراکچر برنامه، و Network-First برای همگام‌سازی لاگ‌ها و داده‌های ابری با IndexedDB و LocalStorage.'
    }
  ];

  const handleUnlock = (item) => {
    if (unlockedItems.includes(item.id)) {
      setActiveProtocol(item);
      return;
    }
    if (points >= item.cost) {
      const nextPoints = points - item.cost;
      const nextUnlocked = [...unlockedItems, item.id];
      setPoints(nextPoints);
      setUnlockedItems(nextUnlocked);
      localStorage.setItem('pc_unlocked_vault', JSON.stringify(nextUnlocked));
      setActiveProtocol(item);
    } else {
      alert('امتیاز هوشمندی کافی نیست!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-6 text-right" dir="rtl">
      {/* هدر بخش خزانه */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-2">
            <Sparkles className="w-3 h-3" />
            <span>KNOWLEDGE VAULT</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900">خزانه دانش و پروتکل‌های عملیاتی</h2>
          <p className="text-xs text-gray-500 mt-1">پروتکل‌های راهبردی مهندسی، بینایی ماشین و سیستم‌سازی</p>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center sm:text-right shrink-0">
          <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase block">امتیاز در دسترس</span>
          <span className="text-2xl font-black font-mono text-emerald-700">{points} PTS</span>
        </div>
      </div>

      {/* لیست پروتکل‌ها با عملکرد واقعی بازگشایی */}
      <div className="grid grid-cols-1 gap-4">
        {protocols.map((item) => {
          const isUnlocked = unlockedItems.includes(item.id);
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className={`p-6 rounded-3xl bg-white border transition-all ${
                isUnlocked ? 'border-emerald-300 shadow-sm' : 'border-gray-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-2xl ${isUnlocked ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                        {item.role}
                      </span>
                      {isUnlocked && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> در دسترس
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-base text-gray-900">{item.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-xl">{item.desc}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleUnlock(item)}
                  className={`w-full sm:w-auto px-5 py-2.5 rounded-full font-bold text-xs transition-all flex items-center justify-center gap-2 shrink-0 ${
                    isUnlocked
                      ? 'bg-gray-900 hover:bg-black text-white shadow-sm'
                      : 'bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-[0_4px_12px_rgba(34,197,94,0.3)]'
                  }`}
                >
                  {isUnlocked ? (
                    <>
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>مطالعه سند</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>آزادسازی ({item.cost} امتیاز)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* مدال مطالعه محتوای بازگشایی‌شده */}
      <AnimatePresence>
        {activeProtocol && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full border border-gray-200 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  DOCUMENT ACCESS
                </span>
                <button
                  onClick={() => setActiveProtocol(null)}
                  className="text-gray-400 hover:text-gray-800 text-sm font-bold"
                >
                  بستن ✕
                </button>
              </div>

              <h3 className="font-bold text-base text-gray-900">{activeProtocol.title}</h3>
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">
                {activeProtocol.content}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
