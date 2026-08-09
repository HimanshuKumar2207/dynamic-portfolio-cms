import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Star, ChevronUp, ChevronDown } from 'lucide-react';
import api from '../../api/axios';
import Loader from '../../components/Loader';

const AdminWorkList = () => {
  const [items, setItems] = useState(null);

  const load = async () => {
    const { data } = await api.get('/work');
    setItems(data);
  };

  useEffect(() => { load(); }, []);

  const remove = async (item) => {
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    await api.delete(`/work/${item._id}`);
    load();
  };

  const move = async (index, dir) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
    await Promise.all(next.map((it, i) => api.put(`/work/${it._id}`, { order: i })));
  };

  if (items === null) return <Loader label="Loading case studies" />;

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-6 flex-wrap">
        <div>
          <span className="eyebrow mb-3">Portfolio</span>
          <h1 className="font-display text-3xl font-semibold text-navy">Case studies</h1>
          <p className="text-soft mt-2 text-sm max-w-lg">
            These power the Work Grid section wherever it's set to pull from the collection.
          </p>
        </div>
        <Link to="/admin/work-items/new" className="btn-primary">
          <Plus size={15} /> New case study
        </Link>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={item._id} className="border border-line bg-white rounded-sm p-4 flex items-center gap-4">
            <div className="flex flex-col shrink-0">
              <button onClick={() => move(i, -1)} className="text-soft hover:text-navy" aria-label="Move up">
                <ChevronUp size={15} />
              </button>
              <button onClick={() => move(i, 1)} className="text-soft hover:text-navy" aria-label="Move down">
                <ChevronDown size={15} />
              </button>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-medium text-navy truncate">{item.title}</h3>
                {item.featured && (
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-teal-dark bg-teal-light/50 px-2 py-0.5 rounded-sm">
                    <Star size={10} /> Featured
                  </span>
                )}
              </div>
              <p className="text-xs text-soft mt-1">{item.category} · /{item.slug}</p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <Link to={`/admin/work-items/${item._id}`} className="p-2 text-soft hover:text-teal-dark" title="Edit">
                <Pencil size={16} />
              </Link>
              <button onClick={() => remove(item)} className="p-2 text-soft hover:text-red-600" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-soft font-mono">No case studies yet — add your first one.</p>
        )}
      </div>
    </div>
  );
};

export default AdminWorkList;
