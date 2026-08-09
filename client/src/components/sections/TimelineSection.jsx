import React from 'react';
import Reveal from '../Reveal';

const TimelineSection = ({ content = {} }) => {
  const { eyebrow, title, items = [] } = content;

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

      <div className="relative border-l border-line ml-1">
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 0.08} className="relative pl-8 pb-12 last:pb-0">
            <span className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-teal" />
            <div className="font-mono text-xs text-teal-dark tracking-wide">{item.year}</div>
            <h3 className="mt-2 font-display text-xl font-semibold text-navy">{item.title}</h3>
            {item.company && <div className="text-sm text-soft mt-0.5">{item.company}</div>}
            {item.description && (
              <p className="mt-3 text-sm text-ink/80 leading-relaxed max-w-2xl">{item.description}</p>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default TimelineSection;
