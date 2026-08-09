import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Trash2, Plus, ChevronUp, ChevronDown } from 'lucide-react';
import api from '../../api/axios';
import Loader from '../../components/Loader';
import ImageUploadField from '../../components/admin/ImageUploadField';

const EMPTY = {
  title: '', slug: '', category: '', client: '', role: '', year: '',
  coverImage: '', tags: [], summary: '', problem: '', approach: '', outcome: '',
  metrics: [], externalLink: '', featured: false
};

const slugify = (str) => str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const inputClass = 'w-full border border-line px-3 py-2.5 text-sm rounded-sm focus:border-teal outline-none';
const labelClass = 'block text-xs font-medium text-soft mb-2';

const AdminWorkForm = () => {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (isNew) return;
    api.get(`/work/id/${id}`).then(({ data }) => {
      setForm({ ...EMPTY, ...data });
      setSlugTouched(true);
      setLoading(false);
    });
  }, [id, isNew]);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const onTitleChange = (val) => {
    set('title', val);
    if (!slugTouched) set('slug', slugify(val));
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    set('tags', [...form.tags, tagInput.trim()]);
    setTagInput('');
  };
  const removeTag = (i) => set('tags', form.tags.filter((_, idx) => idx !== i));

  const addMetric = () => set('metrics', [...form.metrics, { label: '', value: '' }]);
  const updateMetric = (i, key, val) => {
    const next = [...form.metrics];
    next[i] = { ...next[i], [key]: val };
    set('metrics', next);
  };
  const removeMetric = (i) => set('metrics', form.metrics.filter((_, idx) => idx !== i));
  const moveMetric = (i, dir) => {
    const target = i + dir;
    if (target < 0 || target >= form.metrics.length) return;
    const next = [...form.metrics];
    [next[i], next[target]] = [next[target], next[i]];
    set('metrics', next);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (isNew) {
        await api.post('/work', form);
      } else {
        await api.put(`/work/${id}`, form);
      }
      navigate('/admin/work-items');
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not save case study — check the slug is unique.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!window.confirm('Delete this case study? This cannot be undone.')) return;
    await api.delete(`/work/${id}`);
    navigate('/admin/work-items');
  };

  if (loading) return <Loader label="Loading case study" />;

  return (
    <div>
      <div className="mb-8">
        <span className="eyebrow mb-3">Portfolio</span>
        <h1 className="font-display text-3xl font-semibold text-navy">
          {isNew ? 'New case study' : 'Edit case study'}
        </h1>
      </div>

      <form onSubmit={onSubmit} className="space-y-8 max-w-3xl">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Title</label>
            <input required className={inputClass} value={form.title} onChange={(e) => onTitleChange(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Slug (URL)</label>
            <input
              required
              className={inputClass}
              value={form.slug}
              onChange={(e) => { setSlugTouched(true); set('slug', slugify(e.target.value)); }}
            />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <input className={inputClass} value={form.category} onChange={(e) => set('category', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Year</label>
            <input className={inputClass} value={form.year} onChange={(e) => set('year', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Client</label>
            <input className={inputClass} value={form.client} onChange={(e) => set('client', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Your role</label>
            <input className={inputClass} value={form.role} onChange={(e) => set('role', e.target.value)} />
          </div>
        </div>

        <ImageUploadField label="Cover image" value={form.coverImage} onChange={(v) => set('coverImage', v)} />

        <div>
          <label className={labelClass}>Summary (shown on the Work grid)</label>
          <textarea rows={2} className={inputClass} value={form.summary} onChange={(e) => set('summary', e.target.value)} />
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>The problem</label>
            <textarea rows={5} className={inputClass} value={form.problem} onChange={(e) => set('problem', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>The approach</label>
            <textarea rows={5} className={inputClass} value={form.approach} onChange={(e) => set('approach', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>The outcome</label>
            <textarea rows={5} className={inputClass} value={form.outcome} onChange={(e) => set('outcome', e.target.value)} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Metrics</label>
          <div className="space-y-2">
            {form.metrics.map((m, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  placeholder="Label (e.g. Conversion)"
                  className={inputClass}
                  value={m.label}
                  onChange={(e) => updateMetric(i, 'label', e.target.value)}
                />
                <input
                  placeholder="Value (e.g. +9%)"
                  className={inputClass}
                  value={m.value}
                  onChange={(e) => updateMetric(i, 'value', e.target.value)}
                />
                <button type="button" onClick={() => moveMetric(i, -1)} className="text-soft hover:text-navy"><ChevronUp size={15} /></button>
                <button type="button" onClick={() => moveMetric(i, 1)} className="text-soft hover:text-navy"><ChevronDown size={15} /></button>
                <button type="button" onClick={() => removeMetric(i)} className="text-soft hover:text-red-600"><Trash2 size={15} /></button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addMetric} className="mt-2 text-xs inline-flex items-center gap-1 text-teal-dark hover:underline">
            <Plus size={13} /> Add metric
          </button>
        </div>

        <div>
          <label className={labelClass}>Tags</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {form.tags.map((t, i) => (
              <span key={i} className="inline-flex items-center gap-1 font-mono text-xs border border-line px-2.5 py-1 rounded-sm">
                {t}
                <button type="button" onClick={() => removeTag(i)} className="text-soft hover:text-red-600">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              className={inputClass}
              placeholder="Add a tag and press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
            />
            <button type="button" onClick={addTag} className="btn-secondary shrink-0">Add</button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>External link (optional)</label>
            <input className={inputClass} value={form.externalLink} onChange={(e) => set('externalLink', e.target.value)} />
          </div>
          <label className="flex items-center gap-2 text-sm text-ink pt-6">
            <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} className="accent-teal" />
            Feature on homepage
          </label>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center gap-3 pt-4 border-t border-line">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            <Save size={15} /> {saving ? 'Saving…' : 'Save case study'}
          </button>
          {!isNew && (
            <button type="button" onClick={remove} className="btn-secondary hover:!border-red-300 hover:!text-red-600">
              <Trash2 size={15} /> Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminWorkForm;
