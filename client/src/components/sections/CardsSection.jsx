import React from 'react';
import Reveal from '../Reveal';

const CardsSection = ({ content = {} }) => {
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
        {items.map((item, i) => (
          <Reveal
            key={i}
            delay={i * 0.05}
            className="bg-surface p-8 hover:bg-teal-light/30 transition-colors duration-300 group"
          >
            <span className="font-mono text-xs text-teal-dark/70">{item.icon}</span>
            <h3 className="mt-4 font-display text-lg font-semibold text-navy group-hover:text-teal-dark transition-colors">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-soft leading-relaxed">{item.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default CardsSection;
