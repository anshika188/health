import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ComplianceManagement from './pages/ComplianceManagement';
import AuditManagement from './pages/AuditManagement';
import RiskAnalysis from './pages/RiskAnalysis';
import Reports from './pages/Reports';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="h-screen w-screen flex items-center justify-center text-white">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen">
      {user && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        {user && <Navbar />}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/compliance" element={<ProtectedRoute><ComplianceManagement /></ProtectedRoute>} />
            <Route path="/audits" element={<ProtectedRoute><AuditManagement /></ProtectedRoute>} />
            <Route path="/risk" element={<ProtectedRoute><RiskAnalysis /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
