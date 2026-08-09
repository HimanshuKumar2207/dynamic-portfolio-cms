import React from 'react';
import Reveal from '../Reveal';

const RichTextSection = ({ content = {} }) => {
  const { eyebrow, title, body = '' } = content;
  const paragraphs = body.split('\n').filter(Boolean);

  return (
    <section className="max-w-content mx-auto px-6 md:px-8 py-20 md:py-28">
      <div className="max-w-2xl">
        {eyebrow && (
          <Reveal>
            <span className="eyebrow mb-5">{eyebrow}</span>
          </Reveal>
        )}
        {title && (
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy mb-6">{title}</h2>
          </Reveal>
        )}
        {paragraphs.map((p, i) => (
          <Reveal key={i} delay={0.05 * i}>
            <p className="text-soft leading-relaxed mb-4">{p}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default RichTextSection;
