import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const { admin, login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (admin) return <Navigate to="/admin" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="font-display text-2xl font-semibold text-white">Admin panel</div>
          <p className="text-white/50 text-sm mt-2">Sign in to manage the site</p>
        </div>

        <form onSubmit={onSubmit} className="bg-white p-8 rounded-sm space-y-5">
          <div>
            <label className="block text-xs font-medium text-soft mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-line px-3 py-2.5 text-sm rounded-sm focus:border-teal outline-none"
              placeholder="admin@example.com"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-soft mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-line px-3 py-2.5 text-sm rounded-sm focus:border-teal outline-none"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
            <LogIn size={15} /> {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-white/40 text-xs mt-6 font-mono">
          Default credentials come from your server .env — see the README.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
