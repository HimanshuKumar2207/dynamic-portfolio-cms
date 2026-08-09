import React from 'react';
import Reveal from '../Reveal';
import useCountUp from '../../hooks/useCountUp';

const StatBlock = ({ label, value, suffix, index }) => {
  const { ref, display } = useCountUp(value);
  return (
    <Reveal delay={index * 0.06} className="border-l border-white/15 pl-6 first:border-l-0 first:pl-0">
      <div ref={ref} className="font-mono text-4xl md:text-5xl text-white font-medium">
        {display}
        <span className="text-teal">{suffix}</span>
      </div>
      <div className="mt-2 text-sm text-white/60">{label}</div>
    </Reveal>
  );
};

const StatsSection = ({ content = {} }) => {
  const { eyebrow, title, items = [] } = content;

  return (
    <section className="bg-navy">
      <div className="max-w-content mx-auto px-6 md:px-8 py-20 md:py-24">
        {(eyebrow || title) && (
          <div className="mb-14 max-w-lg">
            {eyebrow && (
              <Reveal>
                <span className="eyebrow text-teal mb-4">{eyebrow}</span>
              </Reveal>
            )}
            {title && (
              <Reveal delay={0.05}>
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-white">{title}</h2>
              </Reveal>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <StatBlock key={i} index={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
