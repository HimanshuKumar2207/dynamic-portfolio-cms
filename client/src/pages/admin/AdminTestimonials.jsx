import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, Save, X } from 'lucide-react';
import api from '../../api/axios';
import Loader from '../../components/Loader';
import ImageUploadField from '../../components/admin/ImageUploadField';

const EMPTY = { name: '', role: '', company: '', quote: '', avatar: '' };
const inputClass = 'w-full border border-line px-3 py-2.5 text-sm rounded-sm focus:border-teal outline-none';
const labelClass = 'block text-xs font-medium text-soft mb-2';

const AdminTestimonials = () => {
  const [items, setItems] = useState(null);
  const [editing, setEditing] = useState(null); // null | 'new' | id
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await api.get('/testimonials/admin');
    setItems(data);
  };

  useEffect(() => { load(); }, []);

  const startAdd = () => { setForm(EMPTY); setEditing('new'); };
  const startEdit = (t) => { setForm(t); setEditing(t._id); };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing === 'new') {
        await api.post('/testimonials', form);
      } else {
        await api.put(`/testimonials/${editing}`, form);
      }
      setEditing(null);
      load();
    } finally {
      setSaving(false);
    }
  };

  const toggleVisible = async (t) => {
    await api.put(`/testimonials/${t._id}`, { visible: !t.visible });
    load();
  };

  const remove = async (t) => {
    if (!window.confirm(`Delete testimonial from "${t.name}"?`)) return;
    await api.delete(`/testimonials/${t._id}`);
    load();
  };

  if (items === null) return <Loader label="Loading testimonials" />;

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-6 flex-wrap">
        <div>
          <span className="eyebrow mb-3">Social proof</span>
          <h1 className="font-display text-3xl font-semibold text-navy">Testimonials</h1>
        </div>
        {!editing && (
          <button onClick={startAdd} className="btn-primary"><Plus size={15} /> New testimonial</button>
        )}
      </div>

      {editing && (
        <form onSubmit={save} className="border border-line bg-white rounded-sm p-6 mb-8 space-y-5 max-w-xl">
          <div className="grid sm:grid-cols-2 gap-5">
            <div><label className={labelClass}>Name</label><input required className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><label className={labelClass}>Role</label><input className={inputClass} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></div>
            <div><label className={labelClass}>Company</label><input className={inputClass} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
          </div>
          <div><label className={labelClass}>Quote</label><textarea required rows={4} className={inputClass} value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} /></div>
          <ImageUploadField label="Avatar (optional)" value={form.avatar} onChange={(v) => setForm({ ...form, avatar: v })} />
          <div className="flex gap-3 pt-3 border-t border-line">
            <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60"><Save size={15} /> Save</button>
            <button type="button" onClick={() => setEditing(null)} className="btn-secondary"><X size={15} /> Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {items.map((t) => (
          <div key={t._id} className="border border-line bg-white rounded-sm p-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-navy">{t.name}</h3>
                {!t.visible && <span className="text-[10px] uppercase tracking-widest text-soft/70">Hidden</span>}
              </div>
              <p className="text-xs text-soft mt-0.5">{t.role}{t.company ? ` · ${t.company}` : ''}</p>
              <p className="text-sm text-ink/80 mt-1.5 truncate max-w-xl">"{t.quote}"</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => toggleVisible(t)} className="p-2 text-soft hover:text-navy">
                {t.visible ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <button onClick={() => startEdit(t)} className="p-2 text-soft hover:text-teal-dark"><Pencil size={16} /></button>
              <button onClick={() => remove(t)} className="p-2 text-soft hover:text-red-600"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-soft font-mono">No testimonials yet.</p>}
      </div>
    </div>
  );
};

export default AdminTestimonials;
