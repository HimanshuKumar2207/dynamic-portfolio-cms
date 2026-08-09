import React from 'react';
import ImageUploadField from './ImageUploadField';

const base = 'w-full border border-line px-3 py-2 text-sm rounded-sm focus:border-teal outline-none bg-white';

// Renders one form control based on a field's `type`. Shared by the
// section editor, work item editor, testimonials editor and settings page.
const FieldInput = ({ field, value, onChange }) => {
  const { key, label, type, options, rows } = field;

  if (type === 'textarea') {
    return (
      <div>
        <label className="block text-xs font-medium text-soft mb-2">{label}</label>
        <textarea
          className={base}
          rows={rows || 4}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  if (type === 'select') {
    return (
      <div>
        <label className="block text-xs font-medium text-soft mb-2">{label}</label>
        <select className={base} value={value || options[0]} onChange={(e) => onChange(e.target.value)}>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
    );
  }

  if (type === 'checkbox') {
    return (
      <label className="flex items-center gap-2 text-sm text-ink pt-6">
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="accent-teal" />
        {label}
      </label>
    );
  }

  if (type === 'number') {
    return (
      <div>
        <label className="block text-xs font-medium text-soft mb-2">{label}</label>
        <input
          type="number"
          className={base}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        />
      </div>
    );
  }

  if (type === 'image') {
    return <ImageUploadField label={label} value={value} onChange={onChange} />;
  }

  return (
    <div>
      <label className="block text-xs font-medium text-soft mb-2">{label}</label>
      <input className={base} value={value || ''} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

export default FieldInput;
