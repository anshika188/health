import React from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, ShieldAlert } from 'lucide-react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts';

const RiskAnalysis = () => {
  const radarData = [
    { subject: 'Security', A: 120, B: 110, fullMark: 150 },
    { subject: 'Finance', A: 98, B: 130, fullMark: 150 },
    { subject: 'HR', A: 86, B: 130, fullMark: 150 },
    { subject: 'Operations', A: 99, B: 100, fullMark: 150 },
    { subject: 'Legal', A: 85, B: 90, fullMark: 150 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Risk Intelligence</h2>
          <p className="text-slate-400 text-sm">Advanced risk scoring and heatmap analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 col-span-2 h-[500px] flex flex-col">
          <h4 className="text-lg font-semibold mb-6">Risk Heatmap</h4>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#ffffff10" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" />
                <PolarRadiusAxis stroke="#94a3b8" />
                <Radar name="Current Risk" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                <Radar name="Previous Month" dataKey="B" stroke="#a855f7" fill="#a855f7" fillOpacity={0.3} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 border-l-4 border-rose-500">
            <div className="flex items-center gap-3 text-rose-400 mb-2">
              <ShieldAlert size={20} />
              <span className="font-bold">Critical Alert</span>
            </div>
            <p className="text-sm text-slate-300">Data protection policy in HR department is overdue for review by 14 days.</p>
            <button className="mt-4 text-xs font-bold text-indigo-400 hover:text-indigo-300 underline">Resolve Now</button>
          </div>

          <div className="glass-card p-6">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Risk Trends</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">IT Security</span>
                <span className="text-emerald-400 flex items-center gap-1 text-sm">
                  <TrendingDown size={14} /> 12%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Financial Reporting</span>
                <span className="text-rose-400 flex items-center gap-1 text-sm">
                  <TrendingUp size={14} /> 5%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;
