import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);

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

  if (isInstalled || !deferredPrompt || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-1 bg-gray-900 text-white p-1 rounded-full shadow-lg border border-gray-700">
      <button
        onClick={handleInstall}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-black text-xs font-bold transition-all"
      >
        <Download className="w-3.5 h-3.5 text-emerald-400" />
        <span>نصب وب‌اپ</span>
      </button>
      <button 
        onClick={() => setDismissed(true)}
        className="p-1.5 hover:bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
