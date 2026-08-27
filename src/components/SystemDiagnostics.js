import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, HardDrive, Download } from 'lucide-react';

export default function SystemDiagnostics() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [storageUsage, setStorageUsage] = useState(0);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    try {
      let total = 0;
      for (let x in localStorage) {
        if (localStorage.hasOwnProperty(x)) {
          total += ((localStorage[x].length + x.length) * 2);
        }
      }
      setStorageUsage((total / 1024).toFixed(1));
    } catch (e) {}

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleExportAllData = () => {
    const data = {
      logs: JSON.parse(localStorage.getItem('mt_engineering_logs') || '[]'),
      exportedAt: new Date().toISOString(),
      platform: 'Prime Crown Engineering Lab'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prime_crown_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 mt-8" dir="rtl">
      <div className="p-4 rounded-3xl bg-white border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          {isOnline ? (
            <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold border border-emerald-200">
              <Wifi className="w-3.5 h-3.5" />
              <span>وضعیت سیستم: متصل (Online)</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full font-bold border border-amber-200">
              <WifiOff className="w-3.5 h-3.5" />
              <span>حالت کارگاهی آفلاین (PWA Standalone)</span>
            </span>
          )}

          <span className="flex items-center gap-1 text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full font-mono">
            <HardDrive className="w-3 h-3" />
            <span>حافظه محلی: {storageUsage} KB</span>
          </span>
        </div>

        <button
          onClick={handleExportAllData}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold transition-all"
        >
          <Download className="w-3.5 h-3.5 text-blue-600" />
          <span>پشتیبان‌گیری کامل داده‌ها (JSON)</span>
        </button>
      </div>
    </div>
  );
}
