import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { ShieldCheck, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password);
      toast.success('Access Granted. Redirecting...');
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication Failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#020617]">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md glass-card p-12 space-y-10 relative z-10 border-white/[0.08]"
      >
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="inline-flex p-4 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-2xl shadow-indigo-500/40 mb-2"
          >
            <ShieldCheck size={40} />
          </motion.div>
          <div>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Nexus ID</h2>
            <p className="text-slate-500 text-sm font-bold tracking-[0.2em] uppercase mt-2">Enterprise Security Layer</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Identity Endpoint</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input
                type="email"
                required
                className="input-field w-full pl-12"
                placeholder="user@enterprise.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Access Protocol</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input
                type="password"
                required
                className="input-field w-full pl-12"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary py-4 group flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <span className="tracking-widest uppercase text-sm">Initialize Access</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-4">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
            Unauthorized?{' '}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300 transition-colors underline decoration-2 underline-offset-4">
              Request credentials
            </Link>
          </p>
        </div>
      </motion.div>
      
      {/* Version Tag */}
      <div className="absolute bottom-8 right-8 text-slate-800 text-[10px] font-black tracking-widest">
        SYSTEM V2.4.0-STABLE
      </div>
    </div>
  );
};

export default Login;
