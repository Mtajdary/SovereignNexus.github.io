import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSovereign } from '../../context/SovereignContext';
import { 
  Shield, 
  Cpu, 
  HardHat, 
  Eye, 
  CheckCircle2, 
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function ArchitectProfile() {
  const { points = 1250, userRank = 'SOVEREIGN ARCHITECT' } = useSovereign() || {};
  const [activeTab, setActiveTab] = useState('overview');

  const engineeringDomains = [
    {
      title: 'مهندسی عمران و نظارت پروژه',
      enTitle: 'Civil & Infrastructure Engineering',
      icon: HardHat,
      color: 'bg-amber-50 border-amber-200 text-amber-900',
      badge: 'bg-amber-100 text-amber-800 border-amber-200',
      skills: [
        'نظارت مقیم کارگاهی (Resident Engineer) و مدیریت اجرای پروژه',
        'کنترل کیفیت خاک، لایه‌های زیراساس/اساس و آزمون‌های تراکم',
        'نظارت بر عملیات خاکی سنگین، جدول‌گذاری و روسازی معابر',
        'تطبیق نقشه‌ها و صورت‌جلسات فنی با ضوابط راه و شهرسازی'
      ]
    },
    {
      title: 'هوش مصنوعی و بینایی ماشین',
      enTitle: 'AI & Computer Vision (SHM)',
      icon: Eye,
      color: 'bg-sky-50 border-sky-200 text-sky-900',
      badge: 'bg-sky-100 text-sky-800 border-sky-200',
      skills: [
        'پایش سلامت سازه‌ها (SHM) با الگوریتم‌های یادگیری عمیق',
        'پیاده‌سازی مدل‌های پردازش تصویر در PyTorch (مانند ResNet-18)',
        'تشخیص خودکار، دسته‌بندی و تحلیل آسیب‌های سطحی و ترک بتن',
        'پردازش داده‌های بصری و استخراج الگوهای رفتاری متریال'
      ]
    },
    {
      title: 'معماری نرم‌افزار و پلتفرم‌های وب',
      enTitle: 'Full-Stack Software Systems',
      icon: Cpu,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      skills: [
        'توسعه فرانت‌اند مدرن با React.js و معماری تک‌صفحه‌ای (SPA)',
        'مهندسی وب‌اپلیکیشن‌های پیش‌رونده (PWA) با کشینگ آفلاین',
        'طراحی سیستم‌های تعاملی و ابزارهای مهندسی نظیر همراه ناظر',
        'استقرار خودکار و مدیریت پلتفرم‌های ابری'
      ]
    }
  ];

  const operations = [
    {
      id: 'OP-01',
      title: 'Concrete Crack Detection via Deep Learning',
      category: 'Research & AI',
      badge: 'PyTorch / Vision',
      desc: 'سیستم پایش هوشمند با شبکه‌های عصبی کانولوشنی جهت شناسایی خودکار ترک‌های سازه‌ای بتن در پردازش تصاویر میدانی.'
    },
    {
      id: 'OP-02',
      title: 'سامانه نظارتی همراه ناظر (HamrahNazer)',
      category: 'Software Engine',
      badge: 'PWA / Civil Engine',
      desc: 'ابزار نرم‌افزاری اختصاصی جهت تسریع مستندسازی کارگاهی، محاسبه پارامترهای کنترل کیفیت بتن و مدیریت اسناد فنی.'
    },
    {
      id: 'OP-03',
      title: 'پروژه‌های نظارت مقیم آماده‌سازی اراضی و زیرساخت',
      category: 'Field Command',
      badge: 'Supervision & QC',
      desc: 'هدایت فنی و نظارت عالیه بر عملیات خاکی، آماده‌سازی بستر، تراکم خاک و اجرای زیرساخت‌های راه و شهرسازی.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-6 text-right" dir="rtl">
      {/* کارت اصلی معمار سیستم */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-right">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-400 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                <Shield className="w-9 h-9 text-blue-600" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>ARCHITECT PROFILE</span>
              </div>
              <h2 className="text-2xl font-black text-gray-900">محمد تاجداری</h2>
              <p className="text-xs font-mono text-gray-500">MOHAMMAD TAJDARI &bull; INFRASTRUCTURE &amp; AI ARCHITECT</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs">
                <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-mono text-[11px] font-semibold">
                  B.Sc. Civil Engineering
                </span>
                <span className="px-2.5 py-1 rounded-md bg-sky-100 text-sky-800 font-mono text-[11px] font-semibold">
                  Computer Vision &amp; AI
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 gap-2 text-left md:text-right">
            <div>
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase block">RANK</span>
              <span className="text-xs font-bold font-mono text-emerald-600">{userRank}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase block">INTEL CREDIT</span>
              <span className="text-sm font-black font-mono text-gray-900">{points} PTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* تب‌ها */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'overview'
              ? 'bg-[#22c55e] text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          حوزه‌های مهندسی (TRIAD)
        </button>
        <button
          onClick={() => setActiveTab('operations')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'operations'
              ? 'bg-[#22c55e] text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          سوابق و پروژه‌ها (OPERATIONS)
        </button>
      </div>

      {/* محتوای حوزه‌های مهندسی */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {engineeringDomains.map((dom, idx) => {
            const Icon = dom.icon;
            return (
              <div key={idx} className={`p-5 rounded-3xl border ${dom.color} space-y-4 shadow-sm flex flex-col justify-between`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-white rounded-xl shadow-xs border border-black/5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${dom.badge}`}>
                      DOMAIN 0{idx + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-gray-900">{dom.title}</h3>
                    <p className="text-[11px] font-mono text-gray-500">{dom.enTitle}</p>
                  </div>
                  <ul className="space-y-2 pt-1 text-xs text-gray-600 leading-relaxed">
                    {dom.skills.map((s, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* محتوای پروژه‌ها */}
      {activeTab === 'operations' && (
        <div className="space-y-3">
          {operations.map((op, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    {op.id}
                  </span>
                  <span className="text-xs font-mono text-gray-500">{op.category}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                    {op.badge}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-gray-900">{op.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{op.desc}</p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold self-end md:self-center">
                VERIFIED
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
