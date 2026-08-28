import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Activity, Calendar, Zap } from 'lucide-react';

const weeklyData = [
  { day: 'شنبه', power: 45, focusHours: 3.5 },
  { day: 'یکشنبه', power: 58, focusHours: 4.2 },
  { day: 'دوشنبه', power: 52, focusHours: 3.8 },
  { day: 'سه‌شنبه', power: 75, focusHours: 5.5 },
  { day: 'چهارشنبه', power: 68, focusHours: 5.0 },
  { day: 'پنج‌شنبه', power: 88, focusHours: 6.8 },
  { day: 'جمعه', power: 96, focusHours: 7.2 },
];

const AnalyticsEngine = () => {
  const [chartType, setChartType] = useState('area');

  return (
    <div className="glass p-8 md:p-12 rounded-[36px] border border-white/10 backdrop-blur-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-gold" />
            <h3 className="font-serif text-2xl text-white font-bold">موتور آنالیز رشد عصبی (Neural Velocity)</h3>
          </div>
          <p className="text-xs text-white/50">پایش پیوسته ساعات تمرکز عمیق و شتاب پیشرفت شناختی هفتگی</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setChartType('area')}
              className={`px-4 py-1.5 rounded-lg transition-all ${chartType === 'area' ? 'bg-gold text-black font-bold' : 'text-white/60'}`}
            >
              پیوسته (امواج انرژی)
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-4 py-1.5 rounded-lg transition-all ${chartType === 'bar' ? 'bg-gold text-black font-bold' : 'text-white/60'}`}
            >
              میله‌ای (ساعات تمرکز)
            </button>
          </div>

          <div className="text-left font-mono">
            <span className="text-2xl font-bold text-green-400">+28.4%</span>
            <span className="text-[9px] text-white/40 block uppercase">Efficiency Delta</span>
          </div>
        </div>
      </div>

      <div className="h-80 w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#666" tick={{ fill: '#aaa', fontSize: 11 }} />
              <YAxis stroke="#666" tick={{ fill: '#aaa', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #D4AF37', borderRadius: '12px', color: '#fff' }}
                labelStyle={{ color: '#D4AF37', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="power" name="شاخص بازدهی" stroke="#D4AF37" fill="url(#goldGrad)" strokeWidth={3} />
            </AreaChart>
          ) : (
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" stroke="#666" tick={{ fill: '#aaa', fontSize: 11 }} />
              <YAxis stroke="#666" tick={{ fill: '#aaa', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #D4AF37', borderRadius: '12px', color: '#fff' }}
              />
              <Bar dataKey="focusHours" name="ساعات تمرکز" fill="#D4AF37" radius={[8, 8, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsEngine;
