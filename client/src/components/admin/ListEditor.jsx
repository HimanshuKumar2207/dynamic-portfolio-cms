import React from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import FieldInput from './FieldInput';

// Edits an array field — either a simple array of strings (bullets) or an
// array of objects (stats, cards, timeline items, etc.) based on a
// per-type schema from sectionFields.js.
const ListEditor = ({ label, items = [], onChange, simple = false, itemFields = [] }) => {
  const update = (next) => onChange(next);

  const addItem = () => {
    const blank = simple ? '' : Object.fromEntries(itemFields.map((f) => [f.key, '']));
    update([...(items || []), blank]);
  };

  const removeItem = (i) => update(items.filter((_, idx) => idx !== i));

  const moveItem = (i, dir) => {
    const next = [...items];
    const target = i + dir;
    if (target < 0 || target >= next.length) return;
    [next[i], next[target]] = [next[target], next[i]];
    update(next);
  };

  const updateSimple = (i, val) => {
    const next = [...items];
    next[i] = val;
    update(next);
  };

  const updateObjectField = (i, key, val) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: val };
    update(next);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-medium text-soft">{label}</label>
        <button
          type="button"
          onClick={addItem}
          className="text-xs inline-flex items-center gap-1 text-teal-dark hover:underline"
        >
          <Plus size={13} /> Add
        </button>
      </div>

      <div className="space-y-3">
        {(items || []).map((item, i) => (
          <div key={i} className="border border-line rounded-sm p-4 bg-paper/50">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                {simple ? (
                  <input
                    className="w-full border border-line px-3 py-2 text-sm rounded-sm focus:border-teal outline-none bg-white"
                    value={item}
                    onChange={(e) => updateSimple(i, e.target.value)}
                  />
                ) : (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {itemFields.map((f) => (
                      <div key={f.key} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
                        <FieldInput field={f} value={item[f.key]} onChange={(v) => updateObjectField(i, f.key, v)} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <button type="button" onClick={() => moveItem(i, -1)} className="text-soft hover:text-navy" aria-label="Move up">
                  <ChevronUp size={15} />
                </button>
                <button type="button" onClick={() => moveItem(i, 1)} className="text-soft hover:text-navy" aria-label="Move down">
                  <ChevronDown size={15} />
                </button>
                <button type="button" onClick={() => removeItem(i)} className="text-soft hover:text-red-600" aria-label="Remove">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {(!items || items.length === 0) && (
          <p className="text-xs text-soft/70 font-mono">No items yet.</p>
        )}
      </div>
    </div>
  );
};

export default ListEditor;
