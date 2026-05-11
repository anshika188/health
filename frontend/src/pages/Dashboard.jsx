import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { Activity, CreditCard, ChevronRight, MoreHorizontal, ShieldCheck } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/dashboard/stats');
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-10 text-white">Loading...</div>;

  const COLORS = ['#6c5ce7', '#ff7eb3', '#f39c12', '#00f2ff'];

  return (
    <AnimatedPage>
      <div className="flex flex-col lg:flex-row gap-8 pb-10">
        
        {/* Main Section */}
        <div className="flex-1 space-y-8">
          
          {/* Banner Card */}
          <div className="glass-card p-8 bg-gradient-to-br from-[#24243e] to-[#1a1a2e] relative overflow-hidden h-52 flex flex-col justify-center">
            <div className="z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Automate Compliance<br/>Monitoring</h3>
              <p className="text-slate-500 text-sm mb-6">Real-time risk scoring and mitigation</p>
              <div className="flex gap-2">
                <div className="w-10 h-6 bg-slate-700 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white/20 rounded-full" />
                </div>
                <div className="w-10 h-6 bg-slate-700 rounded-lg" />
              </div>
            </div>
            {/* 3D-like decorative element placeholder */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
            <div className="absolute right-20 top-1/2 -translate-y-1/2 w-16 h-16 bg-blue-accent rounded-2xl rotate-12 opacity-50 flex items-center justify-center">
               <Activity className="text-white" size={32} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Top Activities List */}
            <div className="glass-card-dark p-8">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-white">Department Risks</h4>
                <MoreHorizontal size={20} className="text-slate-500" />
              </div>
              <div className="space-y-6">
                {[
                  { name: 'IT Security', date: '01 May, 1:30 pm', value: 80, color: 'bg-blue-accent' },
                  { name: 'Financials', date: '28 Apr, 10:00 am', value: 36, color: 'bg-pink-accent' },
                  { name: 'Operations', date: '25 Apr, 4:20 pm', value: 15, color: 'bg-orange-accent' },
                  { name: 'Human Resources', date: '20 Apr, 9:00 am', value: 10, color: 'bg-green-accent' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">{item.name}</p>
                      <p className="text-[10px] text-slate-500">{item.date}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-full border-4 border-slate-800 flex items-center justify-center text-[10px] font-bold ${item.color.replace('bg-', 'text-')}`}>
                      {item.value}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Credit-Card style Status Cards */}
            <div className="space-y-4">
              <div className="glass-card p-6 bg-pink-accent h-[155px] relative overflow-hidden group">
                <div className="flex justify-between items-start mb-8">
                   <ShieldCheck className="text-white opacity-40" size={24} />
                   <div className="w-8 h-8 rounded-full bg-white/20" />
                </div>
                <p className="text-white text-xs font-bold tracking-widest mb-1">**** 5678</p>
                <div className="flex justify-between items-end">
                   <p className="text-white text-[10px] font-bold opacity-80 uppercase">Critical Records</p>
                   <p className="text-white text-lg font-black">12 Issues</p>
                </div>
                <div className="absolute -right-4 bottom-4 w-24 h-24 bg-white/10 rounded-full group-hover:scale-125 transition-transform" />
              </div>

              <div className="glass-card p-6 bg-blue-accent h-[155px] relative overflow-hidden group">
                <div className="flex justify-between items-start mb-8">
                   <CreditCard className="text-white opacity-40" size={24} />
                   <div className="w-8 h-8 rounded-full bg-white/20" />
                </div>
                <p className="text-white text-xs font-bold tracking-widest mb-1">**** 9012</p>
                <div className="flex justify-between items-end">
                   <p className="text-white text-[10px] font-bold opacity-80 uppercase">Pending Audits</p>
                   <p className="text-white text-lg font-black">04 Tasks</p>
                </div>
                <div className="absolute -right-4 bottom-4 w-24 h-24 bg-white/10 rounded-full group-hover:scale-125 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="w-full lg:w-80 space-y-8">
          
          {/* Line Chart Widget */}
          <div className="glass-card-dark p-8 h-[350px] flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-white">Compliance</h4>
              <select className="bg-transparent border-none text-xs text-slate-500 focus:outline-none">
                <option>Month</option>
              </select>
            </div>
            <div className="mb-4">
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Average Score</p>
               <p className="text-2xl font-black text-white">$2,254.00</p>
            </div>
            <div className="flex-1 -mx-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { day: 'M', val: 4000 },
                  { day: 'T', val: 3000 },
                  { day: 'W', val: 5000 },
                  { day: 'T', val: 2780 },
                  { day: 'F', val: 4890 },
                  { day: 'S', val: 2390 },
                  { day: 'S', val: 3490 },
                ]}>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#16162a', border: 'none', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="val" 
                    stroke="#fff" 
                    strokeWidth={4} 
                    dot={{ fill: '#fff', strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Doughnut Chart Widget */}
          <div className="glass-card-dark p-8 flex flex-col items-center text-center">
            <div className="relative w-40 h-40 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Utility', value: 45 },
                      { name: 'Taxi', value: 25 },
                      { name: 'Food', value: 30 },
                    ]}
                    innerRadius={50}
                    outerRadius={65}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    <Cell fill="#f39c12" />
                    <Cell fill="#ff7eb3" />
                    <Cell fill="#6c5ce7" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-black text-white">85%</span>
              </div>
            </div>
            <div className="w-full space-y-4">
               {[
                 { name: 'Regulatory', val: '$847.00', color: 'bg-orange-accent' },
                 { name: 'Operational', val: '$586.50', color: 'bg-pink-accent' },
                 { name: 'Internal', val: '$685.50', color: 'bg-purple-accent' },
               ].map(item => (
                 <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${item.color}`} />
                       <span className="text-xs text-slate-500 font-bold">{item.name}</span>
                    </div>
                    <span className="text-xs text-white font-black">{item.val}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

      </div>
    </AnimatedPage>
  );
};

export default Dashboard;
