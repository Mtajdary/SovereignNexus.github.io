import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, ShieldCheck, Lock, Activity, Sparkles, Key } from 'lucide-react';
import { audioEngine } from '../../services/audioEngine';

const BiometricGate = ({ onAccessGranted }) => {
  const [status, setStatus] = useState('idle'); // idle | scanning | verifying | granted
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    audioEngine.playSfx('click');
    setStatus('scanning');
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStatus('verifying');
          audioEngine.playSfx('unlock');
          setTimeout(() => {
            setStatus('granted');
            audioEngine.playSfx('granted');
            setTimeout(() => onAccessGranted(), 1600);
          }, 800);
          return 100;
        }
        return p + 20;
      });
    }, 200);
  };

  const handleInstantBypass = () => {
    audioEngine.playSfx('granted');
    onAccessGranted();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-6 select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

      <AnimatePresence mode="wait">
        {status !== 'granted' ? (
          <motion.div
            key="gate"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="text-center max-w-md w-full glass p-10 rounded-[36px] border border-gold/20 shadow-2xl relative overflow-hidden"
          >
            <div className="flex justify-center items-center gap-2 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" />
              <span className="text-[9px] tracking-[0.4em] text-gold uppercase font-mono">SOVEREIGN BIOMETRIC PROTOCOL</span>
            </div>

            {/* Visual Scanner Area */}
            <div className="relative inline-block my-6 cursor-pointer" onClick={status === 'idle' ? startScan : undefined}>
              <motion.div
                animate={{
                  scale: status === 'scanning' ? [1, 1.1, 1] : [1, 1.03, 1],
                  opacity: status === 'scanning' ? [0.4, 0.8, 0.4] : 0.2
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 border-2 border-gold rounded-full"
              />
              <div className="p-10 border border-white/10 rounded-full bg-white/5 backdrop-blur-3xl relative">
                <Fingerprint
                  className={`w-24 h-24 transition-colors duration-500 ${
                    status === 'scanning' ? 'text-gold' : status === 'verifying' ? 'text-green-400' : 'text-white/30'
                  }`}
                />
              </div>

              {status === 'scanning' && (
                <motion.div
                  initial={{ top: '10%' }}
                  animate={{ top: '90%' }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-4 right-4 h-1 bg-gold shadow-[0_0_20px_#D4AF37] z-20 rounded-full"
                />
              )}
            </div>

            <h2 className="font-serif text-2xl tracking-[0.2em] mb-2 text-white uppercase">
              {status === 'idle' && 'احراز هویت بیومتریک'}
              {status === 'scanning' && `اسکن اثر انگشت کوانتومی (${progress}%)`}
              {status === 'verifying' && 'تأیید امضای رمزنگاری...'}
            </h2>

            <p className="text-[11px] text-white/50 leading-relaxed mb-8 font-light">
              سامانه اختصاصی فرماندهی ذهن و سیستم‌عامل استراتژیک PRIME CROWN
            </p>

            <button
              onClick={startScan}
              disabled={status !== 'idle'}
              className="w-full py-4 border border-gold/40 text-gold text-xs font-bold tracking-[0.3em] uppercase hover:bg-gold hover:text-black transition-all rounded-2xl gold-glow disabled:opacity-50"
            >
              {status === 'idle' ? 'شروع اسکن بیومتریک' : 'در حال اعتبارسنجی...'}
            </button>

            <div className="mt-6 flex justify-between items-center text-[10px] text-white/30 font-mono">
              <span>SECURITY: ENCRYPTED AES-256</span>
              <button onClick={handleInstantBypass} className="hover:text-gold transition-colors underline">
                ورود سریع
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="granted"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center glass p-12 rounded-[40px] border border-green-500/30"
          >
            <ShieldCheck className="w-24 h-24 text-green-400 mx-auto mb-6 drop-shadow-[0_0_25px_rgba(74,222,128,0.5)]" />
            <h2 className="font-serif text-3xl gold-text tracking-[0.3em] uppercase mb-3">دسترسی مجاز صادر شد</h2>
            <p className="text-white/60 text-xs tracking-widest uppercase">به مقر فرماندهی خوش آمدید، معمار تاجداری.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BiometricGate;
