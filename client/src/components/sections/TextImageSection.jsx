import React from 'react';
import { Check } from 'lucide-react';
import Reveal from '../Reveal';
import { assetUrl } from '../../api/axios';

const TextImageSection = ({ content = {} }) => {
  const { eyebrow, title, body, image, imagePosition = 'right', bullets = [] } = content;
  const imageFirst = imagePosition === 'left';

  return (
    <section className="max-w-content mx-auto px-6 md:px-8 py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <Reveal className={imageFirst ? 'md:order-1' : 'md:order-2'}>
          <div className="aspect-[4/3] w-full bg-teal-light/60 border border-line rounded-sm overflow-hidden flex items-center justify-center">
            {image ? (
              <img src={assetUrl(image)} alt={title} className="w-full h-full object-cover" />
            ) : (
              <span className="font-mono text-xs text-teal-dark/60">[ image ]</span>
            )}
          </div>
        </Reveal>

        <div className={imageFirst ? 'md:order-2' : 'md:order-1'}>
          {eyebrow && (
            <Reveal>
              <span className="eyebrow mb-5">{eyebrow}</span>
            </Reveal>
          )}
          {title && (
            <Reveal delay={0.05}>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy leading-tight">
                {title}
              </h2>
            </Reveal>
          )}
          {body && (
            <Reveal delay={0.1}>
              <p className="mt-5 text-soft leading-relaxed">{body}</p>
            </Reveal>
          )}
          {bullets.length > 0 && (
            <Reveal delay={0.15}>
              <ul className="mt-6 space-y-3">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-ink/90">
                    <Check size={16} className="text-teal mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
};

export default TextImageSection;
