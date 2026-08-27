import React, { useState, useEffect } from 'react';
import { Download, Check } from 'lucide-react';

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setDeferredPrompt(null);
    }
  };

  if (isInstalled || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50">
      <button
        onClick={handleInstall}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-900 hover:bg-black text-white text-xs font-bold shadow-lg transition-all"
      >
        <Download className="w-3.5 h-3.5 text-emerald-400" />
        <span>نصب نسخه وب‌اپ</span>
      </button>
    </div>
  );
}
