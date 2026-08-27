import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSovereign } from '../../context/SovereignContext';
import { 
  Shield, 
  Cpu, 
  HardHat, 
  Eye, 
  Award, 
  CheckCircle2, 
  Terminal, 
  Layers, 
  Activity, 
  Compass, 
  FileText, 
  ExternalLink,
  GitBranch,
  Sparkles
} from 'lucide-react';

export default function ArchitectProfile() {
  const { points = 0, userRank = 'SOVEREIGN ARCHITECT' } = useSovereign() || {};
  const [activeTab, setActiveTab] = useState('overview');

  const engineeringDomains = [
    {
      title: 'مهندسی عمران و نظارت پروژه',
      enTitle: 'Civil & Infrastructure Engineering',
      icon: HardHat,
      color: 'from-amber-500/20 to-amber-600/5',
      borderColor: 'border-amber-500/40',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
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
      color: 'from-cyan-500/20 to-cyan-600/5',
      borderColor: 'border-cyan-500/40',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
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
      color: 'from-emerald-500/20 to-emerald-600/5',
      borderColor: 'border-emerald-500/40',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      skills: [
        'توسعه فرانت‌اند مدرن با React.js و معماری تک‌صفحه‌ای (SPA)',
        'مهندسی وب‌اپلیکیشن‌های پیش‌رونده (PWA) با کشینگ آفلاین',
        'برنامه‌نویسی اسکریپتینگ پایتون و طراحی واسط کاربری (GUI)',
        'طراحی سیستم‌های تعاملی و ابزارهای مهندسی نظیر همراه ناظر'
      ]
    }
  ];

  const operationalDeployments = [
    {
      id: 'OP-01',
      title: 'Concrete Crack Detection via Deep Learning',
      category: 'Research & AI Deployment',
      badge: 'Vision AI / PyTorch',
      desc: 'سیستم پایش هوشمند با استفاده از شبکه‌های عصبی کانولوشنی جهت طبقه‌بندی و شناسایی خودکار ترک‌های سازه‌ای بتن با دقت بالا در پردازش تصاویر میدانی.',
      status: 'VERIFIED'
    },
    {
      id: 'OP-02',
      title: 'سامانه نظارتی همراه ناظر (HamrahNazer)',
      category: 'Software & Field Ops Tool',
      badge: 'PWA / Civil Engine',
      desc: 'ابزار نرم‌افزاری اختصاصی جهت تسریع مستندسازی کارگاهی، محاسبه پارامترهای کنترل کیفیت بتن و مدیریت اسناد فنی پروژه‌های عمرانی.',
      status: 'DEPLOYED'
    },
    {
      id: 'OP-03',
      title: 'پروژه‌های نظارت مقیم آماده‌سازی اراضی و زیرساخت',
      category: 'Infrastructure Field Command',
      badge: 'Supervision & QC',
      desc: 'هدایت فنی و نظارت عالیه بر عملیات خاکی، آماده‌سازی بستر، تراکم خاک و اجرای زیرساخت‌های راه و شهرسازی در پروژه‌های جنوب شرق کشور.',
      status: 'EXECUTED'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-8 font-sans">
      {/* هدر هویت و پرونده بیومتریک معمار */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-900/90 to-black border border-amber-500/30 p-6 md:p-8 shadow-[0_0_50px_rgba(245,158,11,0.08)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-right">
            <div className="relative">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-700 p-[2px] shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                <div className="w-full h-full bg-gray-950 rounded-2xl flex items-center justify-center overflow-hidden">
                  <Shield size={44} className="text-amber-400 animate-pulse" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-black text-[10px] font-mono font-black px-2 py-0.5 rounded-md flex items-center gap-1">
                <CheckCircle2 size={10} /> ACTIVE
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
                <Sparkles size={12} />
                <span>ARCHITECT DOSSIER | PRIME CROWN</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide">
                محمد تاجداری
              </h1>
              <p className="text-sm font-mono text-gray-400 tracking-wider">
                MOHAMMAD TAJDARI &bull; INFRASTRUCTURE & SYSTEMS ARCHITECT
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs">
                <span className="px-3 py-1 rounded-lg bg-gray-800/80 border border-gray-700 text-gray-300 font-mono">
                  B.Sc. Civil Engineering
                </span>
                <span className="px-3 py-1 rounded-lg bg-gray-800/80 border border-gray-700 text-cyan-300 font-mono">
                  Computer Vision & AI Researcher
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-row md:flex-col items-center md:items-end gap-3 w-full md:w-auto justify-between border-t md:border-t-0 border-gray-800 pt-4 md:pt-0">
            <div className="text-right">
              <span className="text-[10px] uppercase font-mono text-gray-400 tracking-widest block">SOVEREIGN RANK</span>
              <span className="text-sm font-mono font-bold text-amber-400">{userRank}</span>
            </div>
            <div className="text-left md:text-right">
              <span className="text-[10px] uppercase font-mono text-gray-400 tracking-widest block">INTEL CREDIT</span>
              <span className="text-lg font-mono font-black text-white">{points} PTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* تب‌های ناوبری پروفایل */}
      <div className="flex gap-2 border-b border-gray-800 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'overview'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          حوزه‌های مهندسی (TRIAD)
        </button>
        <button
          onClick={() => setActiveTab('deployments')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'deployments'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          سوابق و پروژه‌ها (OPERATIONS)
        </button>
      </div>

      {/* محتوای تب حوزه‌های مهندسی */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {engineeringDomains.map((domain, idx) => {
            const Icon = domain.icon;
            return (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-3xl bg-gradient-to-b ${domain.color} bg-gray-950 border ${domain.borderColor} flex flex-col justify-between space-y-6 shadow-lg`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-gray-900/90 rounded-2xl border border-gray-800 text-white">
                      <Icon size={24} />
                    </div>
                    <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${domain.badgeColor}`}>
                      DOMAIN 0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white">{domain.title}</h3>
                    <p className="text-xs font-mono text-gray-400 mt-0.5">{domain.enTitle}</p>
                  </div>

                  <ul className="space-y-2.5 pt-2">
                    {domain.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="text-xs text-gray-300 flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span>STATUS</span>
                  <span className="text-emerald-400 font-bold">OPERATIONAL</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* محتوای تب پروژه‌ها و سوابق عملیاتی */}
      {activeTab === 'deployments' && (
        <div className="space-y-4">
          {operationalDeployments.map((op, idx) => (
            <motion.div
              key={op.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 hover:border-amber-500/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {op.id}
                  </span>
                  <span className="text-xs font-mono text-gray-400">{op.category}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {op.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{op.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{op.desc}</p>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  {op.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* خلاصه تعهد و چشم‌انداز حاکمیتی */}
      <div className="p-6 rounded-2xl bg-gray-950 border border-gray-800 text-center space-y-2">
        <p className="text-xs font-mono text-amber-400 uppercase tracking-widest">
          SOVEREIGN PHILOSOPHY
        </p>
        <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
          «تلفیق استحکام مهندسی سازه و دقت الگوریتم‌های هوش مصنوعی؛ ساخت سیستم‌های ماندگار، زیرساخت‌های پایدار و دارایی‌های دیجیتال با بالاترین اهرم ارزش.»
        </p>
      </div>
    </div>
  );
}
