import React from 'react';
import HeroSection from './sections/HeroSection';
import TextImageSection from './sections/TextImageSection';
import StatsSection from './sections/StatsSection';
import CardsSection from './sections/CardsSection';
import TimelineSection from './sections/TimelineSection';
import TestimonialsSection from './sections/TestimonialsSection';
import WorkGridSection from './sections/WorkGridSection';
import CTASection from './sections/CTASection';
import ContactFormSection from './sections/ContactFormSection';
import RichTextSection from './sections/RichTextSection';

// Maps a Section document's `type` field to the component that renders it.
// This is the piece that makes the whole site "fully dynamic": add a new
// Section document from the admin panel and it appears on the page
// automatically, in the right order, with no code changes.
const REGISTRY = {
  hero: HeroSection,
  textImage: TextImageSection,
  stats: StatsSection,
  cards: CardsSection,
  timeline: TimelineSection,
  testimonials: TestimonialsSection,
  workGrid: WorkGridSection,
  cta: CTASection,
  contactForm: ContactFormSection,
  richText: RichTextSection
};

const SectionRenderer = ({ section }) => {
  const Component = REGISTRY[section.type];
  if (!Component) return null;
  return <Component content={section.content} />;
};

export default SectionRenderer;
