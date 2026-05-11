import React from 'react';
import { Bell, Search, User, Mail } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="h-24 flex items-center justify-between px-10 bg-transparent">
      <div>
        <h2 className="text-3xl font-bold text-white">Hello, {user?.name.split(' ')[0]}</h2>
        <p className="text-slate-500 text-sm">Welcome back!</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
            <Search size={16} />
          </span>
          <input 
            type="text" 
            placeholder="Search" 
            className="input-search w-64 pl-10"
          />
        </div>

        <button className="p-3 bg-[#24243e] rounded-2xl text-slate-400 hover:text-white transition-colors">
          <Mail size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500 flex items-center justify-center overflow-hidden border-2 border-[#24243e]">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
              alt="avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
