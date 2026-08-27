import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // دریافت رویداد نصب از مرورگر
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // جلوگیری از نمایش پاپ‌آپ پیش‌فرض مرورگر
      setDeferredPrompt(e);
      setShowButton(true);
    };

    // مخفی کردن دکمه پس از نصب موفق
    const handleAppInstalled = () => {
      setShowButton(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // نمایش پاپ‌آپ نصب سیستم‌عامل
    deferredPrompt.prompt();

    // بررسی انتخاب کاربر (تایید یا لغو)
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowButton(false);
    }
    
    // پاکسازی رویداد
    setDeferredPrompt(null);
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={handleInstallClick}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white px-5 py-3 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.3)] font-bold text-sm transition-all border border-amber-400/30"
        >
          <Download size={18} />
          <span>نصب اپلیکیشن</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
