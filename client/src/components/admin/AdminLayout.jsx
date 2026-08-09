import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Briefcase, MessageSquareQuote,
  Mail, Settings, LogOut, ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/pages/home', label: 'Home page', icon: FileText },
  { to: '/admin/pages/about', label: 'About page', icon: FileText },
  { to: '/admin/pages/work', label: 'Work page', icon: FileText },
  { to: '/admin/pages/contact', label: 'Contact page', icon: FileText },
  { to: '/admin/work-items', label: 'Case studies', icon: Briefcase },
  { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { to: '/admin/messages', label: 'Messages', icon: Mail },
  { to: '/admin/settings', label: 'Site settings', icon: Settings }
];

const AdminLayout = () => {
  const { admin, logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-paper font-body">
      <aside className="w-64 shrink-0 bg-navy text-white flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="font-display text-lg font-semibold">Admin panel</div>
          <div className="text-xs text-white/50 mt-1">{admin?.email}</div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors ${
                  isActive ? 'bg-teal text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <Link to="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <ExternalLink size={16} /> View site
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <LogOut size={16} /> Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
