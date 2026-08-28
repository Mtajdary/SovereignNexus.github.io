import React from 'react';
import { Mail, Github, Globe, Award, Code, CheckCircle, Download } from 'lucide-react';
import { useSovereign } from '../../context/SovereignContext';

const ArchitectProfile = () => {
  const { coins, rank, exportState } = useSovereign();

  const skills = [
    { name: 'Front-end Architecture (React, Tailwind, PWA)', level: '95%' },
    { name: 'Deep Learning & Computer Vision (PyTorch, ResNet)', level: '85%' },
    { name: 'Civil Infrastructure & Road Engineering', level: '90%' },
    { name: 'System Optimization & Automation', level: '90%' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 text-right space-y-10">
      <div className="glass p-10 md:p-14 rounded-[40px] border border-gold/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 blur-[120px] pointer-events-none" />

        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          <div className="w-44 h-44 rounded-full border-2 border-gold/40 p-2 flex-shrink-0 gold-glow">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gold/30 via-black to-black flex items-center justify-center font-serif text-5xl text-gold font-bold">
              MT
            </div>
          </div>

          <div className="flex-1">
            <span className="text-[10px] font-mono text-gold tracking-[0.4em] uppercase block mb-2">LEAD ARCHITECT PROFILE</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold mb-2">مهندس محمد تاجداری</h2>
            <p className="text-gold text-xs tracking-widest font-mono uppercase mb-6">
              Civil Engineer & AI Software Architect
            </p>
            <p className="text-sm text-white/70 leading-relaxed font-light italic mb-8">
              "ترکیب مهندسی دقیق ساخت‌وساز، الگوریتم‌های هوش مصنوعی و معماری نرم‌افزار برای دستیابی به نهایت بهره‌وری و خوداتکایی."
            </p>

            <div className="flex flex-wrap gap-4 justify-end">
              <a
                href="mailto:mohammadtajdariii@gmail.com"
                className="px-5 py-2.5 bg-white/5 border border-white/10 hover:border-gold text-white text-xs rounded-xl transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-gold" />
                <span>تماس ایمیلی</span>
              </a>
              <button
                onClick={exportState}
                className="px-5 py-2.5 bg-gold text-black font-bold text-xs rounded-xl gold-glow hover:bg-gold-light transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>پشتیبان‌گیری کامل داده‌های سایت (JSON)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Skills & Matrix */}
      <div className="glass p-8 md:p-10 rounded-[32px] border border-white/10 space-y-6">
        <h3 className="font-serif text-xl text-white font-bold">ماتریس مهارت‌های استراتژیک</h3>
        <div className="space-y-4 font-mono">
          {skills.map((s) => (
            <div key={s.name} className="space-y-1">
              <div className="flex justify-between text-xs text-white/80">
                <span className="text-gold">{s.level}</span>
                <span>{s.name}</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gold rounded-full" style={{ width: s.level }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchitectProfile;
