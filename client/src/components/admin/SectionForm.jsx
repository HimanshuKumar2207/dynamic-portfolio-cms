import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import FieldInput from './FieldInput';
import ListEditor from './ListEditor';
import { SECTION_CONFIG, SECTION_TYPES } from '../../config/sectionFields';

// The full editor for a single Section document: simple fields + an
// optional list field, both driven entirely by SECTION_CONFIG[type].
const SectionForm = ({ type, initialContent = {}, onSave, onCancel, saving }) => {
  const [content, setContent] = useState(initialContent);
  const config = SECTION_CONFIG[type];

  if (!config) return <p className="text-sm text-red-600">Unknown section type.</p>;

  const setField = (key, value) => setContent((c) => ({ ...c, [key]: value }));

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSave(content); }}
      className="space-y-6"
    >
      <div className="text-xs font-mono uppercase tracking-widest text-teal-dark">
        {SECTION_TYPES.find((t) => t.value === type)?.label || type}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {config.fields.map((f) => (
          <div key={f.key} className={f.type === 'textarea' || f.type === 'image' ? 'sm:col-span-2' : ''}>
            <FieldInput field={f} value={content[f.key]} onChange={(v) => setField(f.key, v)} />
          </div>
        ))}
      </div>

      {config.list && (
        <ListEditor
          label={config.list.label}
          items={content[config.list.key] || []}
          onChange={(v) => setField(config.list.key, v)}
          simple={!!config.list.simple}
          itemFields={config.list.itemFields || []}
        />
      )}

      <div className="flex items-center gap-3 pt-4 border-t border-line">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          <Save size={15} /> {saving ? 'Saving…' : 'Save section'}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          <X size={15} /> Cancel
        </button>
      </div>
    </form>
  );
};

export default SectionForm;
