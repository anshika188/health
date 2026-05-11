import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, ClipboardCheck, Clock, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const AuditManagement = () => {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAudits = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/audits');
      setAudits(data);
    } catch (error) {
      toast.error('Failed to load audits');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudits();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Audit Tracking</h2>
          <p className="text-slate-400 text-sm">Monitor audit schedules, findings, and corrective actions</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Schedule Audit
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center py-20 text-slate-500">Loading audits...</div>
        ) : audits.length === 0 ? (
          <div className="text-center py-20 text-slate-500">No audits found</div>
        ) : audits.map((audit) => (
          <div key={audit.id} className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-indigo-500/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${
                audit.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 
                audit.status === 'In-Progress' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-500/10 text-slate-400'
              }`}>
                <ClipboardCheck size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{audit.audit_name}</h4>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-slate-400 flex items-center gap-1">
                    <Calendar size={14} /> {audit.audit_date}
                  </span>
                  <span className="text-sm text-slate-400 flex items-center gap-1">
                    <Clock size={14} /> {audit.department}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-2">
              <div className="flex items-center gap-4">
                <span className={`flex items-center gap-1 text-sm font-bold ${
                  audit.severity === 'Critical' ? 'text-rose-500' :
                  audit.severity === 'High' ? 'text-orange-500' : 'text-emerald-500'
                }`}>
                  <AlertCircle size={16} /> {audit.severity} Severity
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold
                  ${audit.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 
                    audit.status === 'In-Progress' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-500/20 text-slate-400'}
                `}>
                  {audit.status}
                </span>
              </div>
              <p className="text-sm text-slate-400 italic">Auditor: {audit.auditor}</p>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-all">
                View Details
              </button>
              {audit.status !== 'Completed' && (
                <button className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 rounded-lg text-sm font-medium transition-all">
                  Update
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditManagement;
