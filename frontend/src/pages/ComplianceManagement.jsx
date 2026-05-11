import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Search, Filter, Edit2, Trash2, ShieldAlert, Download, MoreHorizontal } from 'lucide-react';
import { toast } from 'react-toastify';
import AnimatedPage from '../components/AnimatedPage';

const ComplianceManagement = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRecords = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/compliance');
      setRecords(data);
    } catch (error) {
      toast.error('Failed to load records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`http://localhost:5000/api/compliance/${id}`);
        toast.success('Record deleted');
        fetchRecords();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Delete failed');
      }
    }
  };

  const filteredRecords = records.filter(r => 
    r.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.regulation_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.assigned_officer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Compliant': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Non-Compliant': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'Pending': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <AnimatedPage>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">Compliance Registry</h2>
            <p className="text-slate-400 mt-1">Manage corporate regulatory frameworks and compliance health</p>
          </div>
          <div className="flex gap-3">
             <button className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                <Download size={18} /> Export
              </button>
            <button className="btn-primary flex items-center gap-2">
              <Plus size={18} /> New Record
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:w-1/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search by department, regulation, officer..."
              className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
            {['All Status', 'Compliant', 'Non-Compliant', 'Pending'].map((status) => (
              <button key={status} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap">
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Asset / Department</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Framework</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Risk</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Owner</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {loading ? (
                  <tr><td colSpan="6" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-slate-500 font-bold text-sm tracking-widest uppercase">Loading Assets...</span>
                    </div>
                  </td></tr>
                ) : filteredRecords.length === 0 ? (
                  <tr><td colSpan="6" className="px-8 py-20 text-center text-slate-500 italic font-medium">No records found matching your criteria.</td></tr>
                ) : filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-white/[0.03] transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-black">
                          {record.department.substring(0, 2)}
                        </div>
                        <span className="font-bold text-white tracking-tight">{record.department}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm text-slate-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">{record.regulation_type}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`status-badge border ${getStatusStyles(record.status)}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        {record.status}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <ShieldAlert size={16} className={
                          record.risk_level === 'Critical' ? 'text-rose-500' :
                          record.risk_level === 'High' ? 'text-orange-500' :
                          record.risk_level === 'Medium' ? 'text-amber-500' : 'text-emerald-500'
                        } />
                        <span className="text-sm font-bold text-slate-300">{record.risk_level}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-full bg-slate-700" />
                         <span className="text-sm text-slate-300">{record.assigned_officer}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <button className="p-2.5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all">
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(record.id)}
                          className="p-2.5 hover:bg-rose-500/10 rounded-xl text-slate-400 hover:text-rose-400 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-8 py-5 bg-white/[0.01] border-t border-white/5 flex items-center justify-between">
            <p className="text-xs text-slate-500 font-bold">Showing {filteredRecords.length} of {records.length} assets</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-slate-500 hover:text-white transition-all">PREVIOUS</button>
              <button className="px-4 py-2 rounded-xl bg-indigo-600 border border-indigo-500 text-[10px] font-black text-white shadow-lg shadow-indigo-500/20">NEXT</button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ComplianceManagement;
