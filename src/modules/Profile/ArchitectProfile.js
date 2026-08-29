import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Download, Award, Shield, Cpu, ExternalLink, CheckCircle2, Sparkles, Terminal } from 'lucide-react';
import { useSovereign } from '../../context/SovereignContext';
import { audioEngine } from '../../services/audioEngine';

const ArchitectProfile = () => {
  const { coins, rank, unlockedItems } = useSovereign();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportData = () => {
    if (audioEngine?.playSfx) audioEngine.playSfx('granted');

    const journalData = localStorage.getItem('pc_tactical_journal');
    const backupObject = {
      system: 'PRIME CROWN SOVEREIGN OS',
      architect: 'Mohammad Tajdari',
      exportDate: new Date().toISOString(),
      stats: {
        coins: coins,
        rank: rank,
        unlockedAssetsCount: unlockedItems.length,
        unlockedIds: unlockedItems
      },
      journalEntries: journalData ? JSON.parse(journalData) : []
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupObject, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `prime_crown_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const getRankBadge = (r) => {
    switch (r) {
      case 'SOVEREIGN': return { title: 'حاکم مطلق سیستم', code: 'SOV-LVL-4', color: 'text-amber-300 border-amber-300/30' };
      case 'ARCHITECT': return { title: 'معمار ارشد زیرساخت', code: 'ARCH-LVL-3', color: 'text-yellow-400 border-yellow-400/30' };
      case 'STRATEGIST': return { title: 'استراتژیست ارشد', code: 'STRAT-LVL-2', color: 'text-gold border-gold/30' };
      default: return { title: 'کاربر ارتقایافته', code: 'INITIATE-LVL-1', color: 'text-white/60 border-white/20' };
    }
  };

  const rankData = getRankBadge(rank);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 text-right" dir="rtl">
      {/* Profile Card */}
      <div className="glass p-6 sm:p-10 rounded-3xl border border-gold/20 text-center relative overflow-hidden space-y-6">
        {/* Avatar Emblem */}
        <div className="relative inline-block mx-auto">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-gold/20 via-gold to-yellow-200/40 shadow-[0_0_30px_rgba(212,175,55,0.25)]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center border border-black">
              <span className="font-serif text-3xl sm:text-4xl font-black gold-text select-none">MT</span>
            </div>
          </div>
          <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-black shadow-[0_0_10px_#22c55e]" title="سامانه فعال" />
        </div>

        {/* Identity Headings */}
        <div>
          <span className="text-gold text-[9px] sm:text-[10px] tracking-[0.4em] uppercase font-mono block mb-1">
            LEAD ARCHITECT PROFILE
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-1.5">
            مهندس محمد تاجداری
          </h1>
          <p className="text-[11px] sm:text-xs font-mono text-gold tracking-widest uppercase" dir="ltr">
            CIVIL ENGINEER & AI SOFTWARE ARCHITECT
          </p>
        </div>

        {/* Philosophy Statement */}
        <div className="max-w-xl mx-auto bg-black/40 p-5 rounded-2xl border border-white/10 text-xs sm:text-sm text-white/70 leading-relaxed font-light italic">
          "ترکیب مهندسی دقیق ساخت‌وساز، الگوریتم‌های هوش مصنوعی و معماری نرم‌افزار برای دستیابی به نهایت بهره‌وری و خوداتکایی."
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto pt-2">
          <a
            href="mailto:primecrown.contact@gmail.com"
            className="py-3 px-5 glass hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-2 transition-all"
          >
            <Mail className="w-4 h-4 text-gold" />
            <span>تماس ایمیلی</span>
          </a>

          <button
            onClick={handleExportData}
            className="py-3 px-5 bg-gold text-black hover:bg-gold-light rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>پشتیبان‌گیری داده‌ها (JSON)</span>
          </button>
        </div>

        <AnimatePresence>
          {downloadSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center justify-center gap-2 max-w-md mx-auto"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>فایل پشتیبان کامل با موفقیت تولید و دانلود شد.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* System Status & Architecture Specs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="glass p-5 rounded-2xl border border-white/10 text-center">
          <Shield className="w-5 h-5 text-gold mx-auto mb-2" />
          <span className="text-[10px] text-white/40 block mb-1">مرتبه حاکمیتی</span>
          <span className="text-xs font-bold text-white block">{rankData.title}</span>
          <span className="text-[9px] font-mono text-gold block mt-1">{rankData.code}</span>
        </div>

        <div className="glass p-5 rounded-2xl border border-white/10 text-center">
          <Award className="w-5 h-5 text-gold mx-auto mb-2" />
          <span className="text-[10px] text-white/40 block mb-1">اسناد گشوده‌شده</span>
          <span className="text-base font-bold font-mono text-white block">{unlockedItems.length} / ۴</span>
          <span className="text-[9px] text-white/40 block mt-1">آرشیو محرمانه</span>
        </div>

        <div className="glass p-5 rounded-2xl border border-white/10 text-center">
          <Terminal className="w-5 h-5 text-gold mx-auto mb-2" />
          <span className="text-[10px] text-white/40 block mb-1">معماری سیستم‌عامل</span>
          <span className="text-xs font-mono text-white block">React + PWA v2.0</span>
          <span className="text-[9px] font-mono text-green-400 block mt-1">STATUS: OPTIMAL</span>
        </div>
      </div>
    </div>
  );
};

export default ArchitectProfile;
