import React, { useState } from 'react';
import CivilToolsSuite from '../CivilTools/CivilToolsSuite';
import AIVisionLab from '../AILab/AIVisionLab';
import StructuralSimSuite from '../StructuralSim/StructuralSimSuite';
import SiteCommandCenter from '../SiteCommand/SiteCommandCenter';
import DailyReportGenerator from '../DailyReport/DailyReportGenerator';
import PerformanceHub from '../Performance/PerformanceHub';
import { Calculator, Eye, Activity, HardHat, FileText, Gauge } from 'lucide-react';

export default function EngineeringSuite({ initialTool = 'civil-tools' }) {
  const [activeTool, setActiveTool] = useState(initialTool);

  const tools = [
    { id: 'civil-tools', label: 'محاسبات ژئوتکنیک و بتن', icon: Calculator },
    { id: 'structural-sim', label: 'شبیه‌ساز تنش سازه', icon: Activity },
    { id: 'ai-lab', label: 'بینایی ماشین و پایش ترک', icon: Eye },
    { id: 'site-command', label: 'پایش شرایط کارگاه', icon: HardHat },
    { id: 'daily-report', label: 'گزارش‌ساز روزانه', icon: FileText },
    { id: 'performance', label: 'پایش معماری سیستم', icon: Gauge },
  ];

  return (
    <div className="space-y-6">
      {/* زیرمنوی کپسولی انتخاب ابزار مهندسی */}
      <div className="max-w-4xl mx-auto px-4" dir="rtl">
        <div className="p-1.5 rounded-full bg-gray-200/80 border border-gray-300/60 flex items-center gap-1 overflow-x-auto no-scrollbar shadow-inner">
          {tools.map((t) => {
            const Icon = t.icon;
            const isActive = activeTool === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTool(t.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gray-900 text-white shadow-xs'
                    : 'text-gray-700 hover:text-gray-950 hover:bg-white/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* نمایش کامپوننت فعال */}
      {activeTool === 'civil-tools' && <CivilToolsSuite />}
      {activeTool === 'structural-sim' && <StructuralSimSuite />}
      {activeTool === 'ai-lab' && <AIVisionLab />}
      {activeTool === 'site-command' && <SiteCommandCenter />}
      {activeTool === 'daily-report' && <DailyReportGenerator />}
      {activeTool === 'performance' && <PerformanceHub />}
    </div>
  );
}
