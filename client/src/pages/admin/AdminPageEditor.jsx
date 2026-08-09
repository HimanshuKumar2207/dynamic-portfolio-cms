import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Plus, Pencil, Trash2, ChevronUp, ChevronDown, Eye, EyeOff
} from 'lucide-react';
import api from '../../api/axios';
import Loader from '../../components/Loader';
import SectionForm from '../../components/admin/SectionForm';
import { SECTION_TYPES } from '../../config/sectionFields';

const PAGE_LABELS = { home: 'Home', about: 'About', work: 'Work', contact: 'Contact' };

const AdminPageEditor = () => {
  const { slug } = useParams();
  const [sections, setSections] = useState(null);
  const [editing, setEditing] = useState(null); // { mode: 'new'|'edit', type, id?, initialContent }
  const [newType, setNewType] = useState(SECTION_TYPES[0].value);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setSections(null);
    const { data } = await api.get('/sections/admin', { params: { page: slug } });
    setSections(data);
  };

  useEffect(() => {
    setEditing(null);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const toggleVisible = async (section) => {
    await api.put(`/sections/${section._id}`, { visible: !section.visible });
    load();
  };

  const remove = async (section) => {
    if (!window.confirm('Delete this section? This cannot be undone.')) return;
    await api.delete(`/sections/${section._id}`);
    load();
  };

  const move = async (index, dir) => {
    const target = index + dir;
    if (target < 0 || target >= sections.length) return;
    const next = [...sections];
    [next[index], next[target]] = [next[target], next[index]];
    setSections(next);
    await api.put('/sections/reorder', {
      items: next.map((s, i) => ({ id: s._id, order: i }))
    });
  };

  const startAdd = () => {
    setError('');
    setEditing({ mode: 'new', type: newType, initialContent: {} });
  };

  const startEdit = (section) => {
    setError('');
    setEditing({ mode: 'edit', type: section.type, id: section._id, initialContent: section.content || {} });
  };

  const save = async (content) => {
    setSaving(true);
    setError('');
    try {
      if (editing.mode === 'new') {
        await api.post('/sections', { page: slug, type: editing.type, content });
      } else {
        await api.put(`/sections/${editing.id}`, { content });
      }
      setEditing(null);
      load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not save section');
    } finally {
      setSaving(false);
    }
  };

  const typeLabel = (t) => SECTION_TYPES.find((s) => s.value === t)?.label || t;
  const previewText = (s) => s.content?.title || s.content?.eyebrow || '(no title set)';

  return (
    <div>
      <div className="mb-8">
        <span className="eyebrow mb-3">Page editor</span>
        <h1 className="font-display text-3xl font-semibold text-navy">{PAGE_LABELS[slug] || slug} page</h1>
        <p className="text-soft mt-2 text-sm">
          Add, reorder, hide, or edit the sections that make up this page. Changes are live immediately.
        </p>
      </div>

      {sections === null ? (
        <Loader label="Loading sections" />
      ) : (
        <div className="space-y-3 mb-10">
          {sections.map((s, i) => (
            <div key={s._id} className="border border-line bg-white rounded-sm p-4 flex items-center gap-4">
              <div className="flex flex-col shrink-0">
                <button onClick={() => move(i, -1)} className="text-soft hover:text-navy" aria-label="Move up">
                  <ChevronUp size={15} />
                </button>
                <button onClick={() => move(i, 1)} className="text-soft hover:text-navy" aria-label="Move down">
                  <ChevronDown size={15} />
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-teal-dark bg-teal-light/50 px-2 py-0.5 rounded-sm">
                    {typeLabel(s.type)}
                  </span>
                  {!s.visible && (
                    <span className="text-[10px] uppercase tracking-widest text-soft/70">Hidden</span>
                  )}
                </div>
                <p className="text-sm text-ink mt-1.5 truncate">{previewText(s)}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => toggleVisible(s)}
                  className="p-2 text-soft hover:text-navy"
                  title={s.visible ? 'Hide section' : 'Show section'}
                >
                  {s.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button onClick={() => startEdit(s)} className="p-2 text-soft hover:text-teal-dark" title="Edit">
                  <Pencil size={16} />
                </button>
                <button onClick={() => remove(s)} className="p-2 text-soft hover:text-red-600" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {sections.length === 0 && (
            <p className="text-sm text-soft font-mono">No sections yet — add the first one below.</p>
          )}
        </div>
      )}

      {!editing && (
        <div className="border border-dashed border-line rounded-sm p-5 flex items-center gap-3 flex-wrap">
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            className="border border-line px-3 py-2 text-sm rounded-sm bg-white"
          >
            {SECTION_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <button onClick={startAdd} className="btn-secondary">
            <Plus size={15} /> Add section
          </button>
        </div>
      )}

      {editing && (
        <div className="border border-line bg-white rounded-sm p-6 mt-6">
          <h2 className="font-display text-lg font-semibold text-navy mb-5">
            {editing.mode === 'new' ? 'New section' : 'Edit section'}
          </h2>
          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
          <SectionForm
            type={editing.type}
            initialContent={editing.initialContent}
            onSave={save}
            onCancel={() => setEditing(null)}
            saving={saving}
          />
        </div>
      )}
    </div>
  );
};

export default AdminPageEditor;
