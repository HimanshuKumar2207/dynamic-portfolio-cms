import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../Reveal';
import api, { assetUrl } from '../../api/axios';

const WorkGridSection = ({ content = {} }) => {
  const {
    eyebrow, title, sourceMode = 'collection', featuredOnly = false,
    limit = 12, viewAllLink, items: manualItems = []
  } = content;
  const [items, setItems] = useState(manualItems);

  useEffect(() => {
    if (sourceMode !== 'collection') return;
    let active = true;
    api.get('/work', { params: featuredOnly ? { featured: true } : {} })
      .then(({ data }) => { if (active) setItems(data.slice(0, limit)); })
      .catch(() => {});
    return () => { active = false; };
  }, [sourceMode, featuredOnly, limit]);

  return (
    <section className="max-w-content mx-auto px-6 md:px-8 py-20 md:py-28">
      {(eyebrow || title || viewAllLink) && (
        <div className="mb-14 flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-lg">
            {eyebrow && (
              <Reveal>
                <span className="eyebrow mb-4">{eyebrow}</span>
              </Reveal>
            )}
            {title && (
              <Reveal delay={0.05}>
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy">{title}</h2>
              </Reveal>
            )}
          </div>
          {viewAllLink && (
            <Reveal delay={0.1}>
              <Link to={viewAllLink} className="link-underline text-sm font-medium text-teal-dark inline-flex items-center gap-1">
                View all work <ArrowUpRight size={15} />
              </Link>
            </Reveal>
          )}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {items.map((item, i) => (
          <Reveal key={item._id || item.slug || i} delay={i * 0.08}>
            <Link to={`/work/${item.slug}`} className="group block">
              <div className="aspect-[16/10] bg-teal-light/50 border border-line overflow-hidden relative">
                {item.coverImage ? (
                  <img
                    src={assetUrl(item.coverImage)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-xs text-teal-dark/60">
                    [ case study ]
                  </div>
                )}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight size={16} className="text-navy" />
                </div>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-semibold text-navy group-hover:text-teal-dark transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-soft">{item.category}</p>
                </div>
                {item.year && <span className="font-mono text-xs text-soft shrink-0">{item.year}</span>}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-sm text-soft font-mono">No case studies published yet.</p>
      )}
    </section>
  );
};

export default WorkGridSection;
