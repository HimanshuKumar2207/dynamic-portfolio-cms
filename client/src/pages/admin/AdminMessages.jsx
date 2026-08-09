import React, { useEffect, useState } from 'react';
import { Trash2, Mail, MailOpen } from 'lucide-react';
import api from '../../api/axios';
import Loader from '../../components/Loader';

const AdminMessages = () => {
  const [messages, setMessages] = useState(null);
  const [openId, setOpenId] = useState(null);

  const load = async () => {
    const { data } = await api.get('/contact');
    setMessages(data);
  };

  useEffect(() => { load(); }, []);

  const open = async (m) => {
    setOpenId(openId === m._id ? null : m._id);
    if (!m.read) {
      await api.put(`/contact/${m._id}`, { read: true });
      load();
    }
  };

  const remove = async (m) => {
    if (!window.confirm('Delete this message?')) return;
    await api.delete(`/contact/${m._id}`);
    load();
  };

  if (messages === null) return <Loader label="Loading messages" />;

  return (
    <div>
      <div className="mb-8">
        <span className="eyebrow mb-3">Inbox</span>
        <h1 className="font-display text-3xl font-semibold text-navy">Messages</h1>
        <p className="text-soft mt-2 text-sm">Submissions from the Contact form on your site.</p>
      </div>

      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m._id} className="border border-line bg-white rounded-sm">
            <button onClick={() => open(m)} className="w-full flex items-center gap-4 p-4 text-left">
              <span className="text-soft shrink-0">
                {m.read ? <MailOpen size={16} /> : <Mail size={16} className="text-teal-dark" />}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-sm ${m.read ? 'text-ink' : 'font-semibold text-navy'}`}>{m.name}</span>
                  <span className="text-xs text-soft">{m.email}</span>
                </div>
                {m.subject && <p className="text-xs text-soft mt-0.5 truncate">{m.subject}</p>}
              </div>
              <span className="font-mono text-[11px] text-soft/70 shrink-0">
                {new Date(m.createdAt).toLocaleDateString()}
              </span>
            </button>
            {openId === m._id && (
              <div className="px-4 pb-4 pt-1 border-t border-line ml-9">
                <p className="text-sm text-ink/90 whitespace-pre-wrap leading-relaxed">{m.message}</p>
                <div className="flex gap-4 mt-4">
                  <a href={`mailto:${m.email}`} className="text-xs text-teal-dark link-underline">Reply by email</a>
                  <button onClick={() => remove(m)} className="text-xs text-soft hover:text-red-600 inline-flex items-center gap-1">
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {messages.length === 0 && <p className="text-sm text-soft font-mono">No messages yet.</p>}
      </div>
    </div>
  );
};

export default AdminMessages;
