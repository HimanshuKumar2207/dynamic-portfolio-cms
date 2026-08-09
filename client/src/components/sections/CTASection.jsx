import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../Reveal';

const CTASection = ({ content = {} }) => {
  const { title, subtitle, buttonText, buttonLink } = content;

  return (
    <section className="max-w-content mx-auto px-6 md:px-8 py-20 md:py-24">
      <Reveal className="relative bg-navy px-8 py-16 md:px-16 md:py-20 text-center overflow-hidden">
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-teal/20 blur-3xl" aria-hidden="true" />
        <h2 className="relative font-display text-3xl md:text-4xl font-semibold text-white max-w-2xl mx-auto">
          {title}
        </h2>
        {subtitle && (
          <p className="relative mt-4 text-white/70 max-w-lg mx-auto">{subtitle}</p>
        )}
        {buttonText && (
          <Link
            to={buttonLink || '/contact'}
            className="relative mt-8 inline-flex items-center gap-2 bg-teal text-white px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-teal-dark transition-colors duration-300 rounded-sm"
          >
            {buttonText} <ArrowRight size={16} />
          </Link>
        )}
      </Reveal>
    </section>
  );
};

export default CTASection;
