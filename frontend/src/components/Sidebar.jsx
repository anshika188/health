import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  ClipboardList, 
  AlertTriangle, 
  FileText, 
  Settings,
  User,
  Zap,
  LogOut
} from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Cards', path: '/compliance', icon: <ShieldCheck size={20} /> },
    { name: 'Statistics', path: '/audits', icon: <ClipboardList size={20} /> },
    { name: 'Premium', path: '/risk', icon: <Zap size={20} /> },
    { name: 'Profile', path: '/reports', icon: <User size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-24 md:w-64 flex flex-col h-screen py-8 px-4 bg-[#1a1a2e] border-r border-white/5">
      <div className="flex items-center justify-center md:justify-start gap-3 px-4 mb-12">
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-blue-accent rounded-sm" />
          <div className="w-3 h-3 bg-pink-accent rounded-full" />
          <div className="w-3 h-3 bg-orange-accent transform rotate-45" />
        </div>
        <h1 className="hidden md:block text-xl font-bold tracking-tight text-white">Compliance</h1>
      </div>

      <nav className="flex-1 space-y-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center justify-center md:justify-start gap-4 px-4 py-3 rounded-2xl transition-all duration-300
              ${isActive 
                ? 'sidebar-item-active' 
                : 'text-slate-500 hover:text-slate-300'}
            `}
          >
            {item.icon}
            <span className="hidden md:block font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-2">
        <div className="glass-card p-4 text-center space-y-3 bg-indigo-900/20 rounded-3xl border-indigo-500/20">
          <p className="text-[10px] text-slate-400 font-bold leading-tight">Use our Premium features now!</p>
          <div className="flex justify-center">
             <Zap className="text-orange-accent fill-orange-accent animate-bounce" size={24} />
          </div>
          <button className="w-full py-2 bg-[#6c5ce7] rounded-xl text-[10px] font-bold text-white shadow-lg">Get Premium</button>
        </div>

        <button 
          onClick={logout}
          className="mt-6 flex items-center justify-center md:justify-start gap-4 px-6 py-4 w-full rounded-2xl text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-300 font-bold group"
        >
          <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
