import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Reveal from '../Reveal';
import useCountUp from '../../hooks/useCountUp';

const StatItem = ({ label, value, suffix }) => {
  const { ref, display } = useCountUp(value);
  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="font-mono text-2xl md:text-3xl text-navy font-medium">
        {display}
        <span className="text-teal">{suffix}</span>
      </span>
      <span className="text-xs text-soft tracking-wide">{label}</span>
    </div>
  );
};

const HeroSection = ({ content = {} }) => {
  const {
    eyebrow, title, subtitle,
    primaryButtonText, primaryButtonLink,
    secondaryButtonText, secondaryButtonLink,
    stats = []
  } = content;

  const words = (title || '').split(' ');

  return (
    <section className="relative pt-40 pb-24 md:pt-52 md:pb-32 max-w-content mx-auto px-6 md:px-8 overflow-hidden">
      <div
        className="pointer-events-none absolute -top-24 right-0 w-[420px] h-[420px] rounded-full bg-teal/10 blur-3xl"
        aria-hidden="true"
      />

      {eyebrow && (
        <Reveal>
          <span className="eyebrow mb-6">{eyebrow}</span>
        </Reveal>
      )}

      <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.08] tracking-tight text-navy max-w-4xl">
        {words.map((w, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mr-[0.28em]"
          >
            {w}
          </motion.span>
        ))}
      </h1>

      {subtitle && (
        <Reveal delay={0.15}>
          <p className="mt-7 text-lg text-soft max-w-xl leading-relaxed">{subtitle}</p>
        </Reveal>
      )}

      {(primaryButtonText || secondaryButtonText) && (
        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {primaryButtonText && (
              <Link to={primaryButtonLink || '#'} className="btn-primary">
                {primaryButtonText}
              </Link>
            )}
            {secondaryButtonText && (
              <Link to={secondaryButtonLink || '#'} className="btn-secondary">
                {secondaryButtonText}
              </Link>
            )}
          </div>
        </Reveal>
      )}

      {stats.length > 0 && (
        <Reveal delay={0.35}>
          <div className="mt-16 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-8">
            {stats.map((s, i) => (
              <StatItem key={i} label={s.label} value={s.value} suffix={s.suffix} />
            ))}
          </div>
        </Reveal>
      )}
    </section>
  );
};

export default HeroSection;
