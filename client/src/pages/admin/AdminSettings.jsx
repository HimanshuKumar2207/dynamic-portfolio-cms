import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import api from '../../api/axios';
import Loader from '../../components/Loader';
import ImageUploadField from '../../components/admin/ImageUploadField';
import ListEditor from '../../components/admin/ListEditor';

const inputClass = 'w-full border border-line px-3 py-2.5 text-sm rounded-sm focus:border-teal outline-none';
const labelClass = 'block text-xs font-medium text-soft mb-2';

const NAV_ITEM_FIELDS = [
  { key: 'label', label: 'Label', type: 'text' },
  { key: 'path', label: 'Path (e.g. /about)', type: 'text' }
];
const SOCIAL_ITEM_FIELDS = [
  { key: 'platform', label: 'Platform', type: 'text' },
  { key: 'url', label: 'URL', type: 'text' }
];

const AdminSettings = () => {
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  useEffect(() => {
    api.get('/settings').then(({ data }) => setSettings(data));
  }, []);

  const set = (key, val) => setSettings((s) => ({ ...s, [key]: val }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put('/settings', settings);
      setSettings(data);
      setSavedAt(Date.now());
    } finally {
      setSaving(false);
    }
  };

  if (!settings) return <Loader label="Loading settings" />;

  return (
    <div>
      <div className="mb-8">
        <span className="eyebrow mb-3">Global</span>
        <h1 className="font-display text-3xl font-semibold text-navy">Site settings</h1>
        <p className="text-soft mt-2 text-sm">Controls the navbar, footer, and site identity everywhere.</p>
      </div>

      <form onSubmit={save} className="space-y-10 max-w-2xl">
        <section className="space-y-5">
          <h2 className="font-display text-lg font-semibold text-navy">Identity</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div><label className={labelClass}>Site name</label><input className={inputClass} value={settings.siteName} onChange={(e) => set('siteName', e.target.value)} /></div>
            <div><label className={labelClass}>Logo text</label><input className={inputClass} value={settings.logoText} onChange={(e) => set('logoText', e.target.value)} /></div>
          </div>
          <div><label className={labelClass}>Tagline</label><input className={inputClass} value={settings.tagline} onChange={(e) => set('tagline', e.target.value)} /></div>
          <ImageUploadField label="Logo image (optional — overrides logo text)" value={settings.logoImage} onChange={(v) => set('logoImage', v)} />
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-navy mb-4">Navigation</h2>
          <ListEditor
            label="Nav links"
            items={settings.navLinks}
            onChange={(v) => set('navLinks', v)}
            itemFields={NAV_ITEM_FIELDS}
          />
        </section>

        <section className="space-y-5">
          <h2 className="font-display text-lg font-semibold text-navy">Contact</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div><label className={labelClass}>Contact email</label><input className={inputClass} value={settings.contactEmail} onChange={(e) => set('contactEmail', e.target.value)} /></div>
            <div><label className={labelClass}>Contact phone</label><input className={inputClass} value={settings.contactPhone} onChange={(e) => set('contactPhone', e.target.value)} /></div>
          </div>
          <div><label className={labelClass}>Location</label><input className={inputClass} value={settings.location} onChange={(e) => set('location', e.target.value)} /></div>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-navy mb-4">Social links</h2>
          <ListEditor
            label="Social / external links"
            items={settings.socialLinks}
            onChange={(v) => set('socialLinks', v)}
            itemFields={SOCIAL_ITEM_FIELDS}
          />
        </section>

        <section className="space-y-5">
          <h2 className="font-display text-lg font-semibold text-navy">Footer</h2>
          <div><label className={labelClass}>Footer tagline</label><textarea rows={2} className={inputClass} value={settings.footerText} onChange={(e) => set('footerText', e.target.value)} /></div>
          <div><label className={labelClass}>Footer note (small print)</label><input className={inputClass} value={settings.footerNote} onChange={(e) => set('footerNote', e.target.value)} /></div>
        </section>

        <div className="flex items-center gap-4 pt-4 border-t border-line">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            <Save size={15} /> {saving ? 'Saving…' : 'Save settings'}
          </button>
          {savedAt && <span className="text-xs text-teal-dark font-mono">Saved</span>}
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
