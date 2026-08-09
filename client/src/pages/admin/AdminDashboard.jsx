import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, MessageSquareQuote, Mail, ArrowUpRight } from 'lucide-react';
import api from '../../api/axios';
import Loader from '../../components/Loader';

const Card = ({ icon: Icon, label, value, to }) => (
  <Link
    to={to}
    className="border border-line bg-white p-6 rounded-sm hover:border-teal transition-colors group flex flex-col gap-4"
  >
    <div className="flex items-center justify-between">
      <div className="w-9 h-9 rounded-sm bg-teal-light/50 flex items-center justify-center text-teal-dark">
        <Icon size={17} />
      </div>
      <ArrowUpRight size={16} className="text-soft/40 group-hover:text-teal-dark transition-colors" />
    </div>
    <div>
      <div className="font-mono text-3xl text-navy font-medium">{value}</div>
      <div className="text-sm text-soft mt-1">{label}</div>
    </div>
  </Link>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let active = true;
    Promise.all([
      api.get('/sections/admin'),
      api.get('/work'),
      api.get('/testimonials/admin'),
      api.get('/contact')
    ]).then(([sections, work, testimonials, messages]) => {
      if (!active) return;
      setStats({
        sections: sections.data.length,
        work: work.data.length,
        testimonials: testimonials.data.length,
        messages: messages.data.length,
        unread: messages.data.filter((m) => !m.read).length
      });
    }).catch(() => {});
    return () => { active = false; };
  }, []);

  if (!stats) return <Loader label="Loading dashboard" />;

  return (
    <div>
      <div className="mb-10">
        <span className="eyebrow mb-3">Overview</span>
        <h1 className="font-display text-3xl font-semibold text-navy">Dashboard</h1>
        <p className="text-soft mt-2 text-sm">
          Everything on the public site is generated from the content below — edit any of it and the
          site updates immediately.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card icon={FileText} label="Total sections across all pages" value={stats.sections} to="/admin/pages/home" />
        <Card icon={Briefcase} label="Case studies published" value={stats.work} to="/admin/work-items" />
        <Card icon={MessageSquareQuote} label="Testimonials" value={stats.testimonials} to="/admin/testimonials" />
        <Card
          icon={Mail}
          label={`Messages${stats.unread ? ` (${stats.unread} unread)` : ''}`}
          value={stats.messages}
          to="/admin/messages"
        />
      </div>

      <div className="mt-10 border border-line bg-white p-6 rounded-sm">
        <h2 className="font-display text-lg font-semibold text-navy mb-4">Quick links</h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <Link to="/admin/pages/home" className="text-teal-dark link-underline">Edit Home page sections →</Link>
          <Link to="/admin/pages/about" className="text-teal-dark link-underline">Edit About page sections →</Link>
          <Link to="/admin/pages/work" className="text-teal-dark link-underline">Edit Work page sections →</Link>
          <Link to="/admin/pages/contact" className="text-teal-dark link-underline">Edit Contact page sections →</Link>
          <Link to="/admin/work-items" className="text-teal-dark link-underline">Manage case studies →</Link>
          <Link to="/admin/settings" className="text-teal-dark link-underline">Edit nav, logo & footer →</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
