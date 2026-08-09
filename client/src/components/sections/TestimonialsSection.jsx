import React, { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';
import Reveal from '../Reveal';
import api, { assetUrl } from '../../api/axios';

const TestimonialsSection = ({ content = {} }) => {
  const { eyebrow, title, sourceMode = 'collection', items: manualItems = [] } = content;
  const [items, setItems] = useState(manualItems);

  useEffect(() => {
    if (sourceMode !== 'collection') return;
    let active = true;
    api.get('/testimonials').then(({ data }) => {
      if (active) setItems(data);
    }).catch(() => {});
    return () => { active = false; };
  }, [sourceMode]);

  if (!items || items.length === 0) return null;

  return (
    <section className="max-w-content mx-auto px-6 md:px-8 py-20 md:py-28">
      {(eyebrow || title) && (
        <div className="mb-14 max-w-lg">
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
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <Reveal
            key={t._id || i}
            delay={i * 0.08}
            className="border border-line p-7 flex flex-col bg-surface"
          >
            <Quote size={20} className="text-teal mb-4" />
            <p className="text-sm text-ink/90 leading-relaxed flex-1">"{t.quote}"</p>
            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-line">
              {t.avatar ? (
                <img src={assetUrl(t.avatar)} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-teal-light flex items-center justify-center font-mono text-xs text-teal-dark">
                  {t.name?.[0]}
                </div>
              )}
              <div>
                <div className="text-sm font-medium text-navy">{t.name}</div>
                <div className="text-xs text-soft">
                  {t.role}{t.company ? ` · ${t.company}` : ''}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
