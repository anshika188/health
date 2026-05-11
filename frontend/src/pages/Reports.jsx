import React from 'react';
import { FileText, Download, PieChart, BarChart2, Calendar } from 'lucide-react';

const Reports = () => {
  const reports = [
    { id: 1, name: 'Q2 Compliance Audit Summary', type: 'PDF', date: '2026-05-01', icon: <FileText className="text-blue-400" /> },
    { id: 2, name: 'Risk Assessment Matrix', type: 'CSV', date: '2026-04-28', icon: <BarChart2 className="text-emerald-400" /> },
    { id: 3, name: 'Departmental Performance', type: 'PDF', date: '2026-04-15', icon: <PieChart className="text-purple-400" /> },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Reports Library</h2>
          <p className="text-slate-400 text-sm">Generate and download compliance & audit reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-card p-8 flex flex-col items-center text-center group cursor-pointer hover:border-indigo-500/50 transition-all">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
            <Download size={32} />
          </div>
          <h4 className="text-lg font-bold">Generate New Report</h4>
          <p className="text-slate-400 text-sm mt-2">Custom filter and export to PDF/CSV</p>
        </div>

        {reports.map((report) => (
          <div key={report.id} className="glass-card p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/5">
                {report.icon}
              </div>
              <div>
                <h4 className="font-bold text-white">{report.name}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-slate-300">{report.type}</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar size={12} /> {report.date}
                  </span>
                </div>
              </div>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
              <Download size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
