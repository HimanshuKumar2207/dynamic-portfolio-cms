import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import api, { assetUrl } from '../api/axios';
import Loader from '../components/Loader';
import Reveal from '../components/Reveal';
import CTASection from '../components/sections/CTASection';

const WorkDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    setItem(null);
    setNotFound(false);
    window.scrollTo({ top: 0 });
    api.get(`/work/${slug}`)
      .then(({ data }) => { if (active) setItem(data); })
      .catch(() => { if (active) setNotFound(true); });
    return () => { active = false; };
  }, [slug]);

  if (notFound) {
    return (
      <div className="max-w-content mx-auto px-6 md:px-8 py-40 text-center">
        <p className="font-mono text-sm text-soft mb-4">Case study not found.</p>
        <button onClick={() => navigate('/work')} className="btn-secondary">Back to work</button>
      </div>
    );
  }

  if (!item) return <Loader label="Loading case study" />;

  return (
    <article>
      <section className="max-w-content mx-auto px-6 md:px-8 pt-36 pb-16">
        <Reveal>
          <Link to="/work" className="inline-flex items-center gap-2 text-sm text-soft hover:text-teal-dark transition-colors mb-10">
            <ArrowLeft size={15} /> All work
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <span className="eyebrow mb-5">{item.category}</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-3xl md:text-5xl font-semibold text-navy max-w-3xl leading-tight">
            {item.title}
          </h1>
        </Reveal>
        {item.summary && (
          <Reveal delay={0.15}>
            <p className="mt-5 text-lg text-soft max-w-2xl leading-relaxed">{item.summary}</p>
          </Reveal>
        )}

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-8 font-mono text-xs text-soft">
            {item.client && <div><span className="text-ink/40 block mb-1">Client</span>{item.client}</div>}
            {item.role && <div><span className="text-ink/40 block mb-1">Role</span>{item.role}</div>}
            {item.year && <div><span className="text-ink/40 block mb-1">Year</span>{item.year}</div>}
            {item.externalLink && (
              <a href={item.externalLink} target="_blank" rel="noreferrer" className="text-teal-dark inline-flex items-center gap-1 hover:underline">
                Visit live <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </Reveal>
      </section>

      {item.coverImage && (
        <Reveal className="max-w-content mx-auto px-6 md:px-8">
          <div className="aspect-[16/9] w-full overflow-hidden border border-line">
            <img src={assetUrl(item.coverImage)} alt={item.title} className="w-full h-full object-cover" />
          </div>
        </Reveal>
      )}

      {item.metrics?.length > 0 && (
        <section className="max-w-content mx-auto px-6 md:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {item.metrics.map((m, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="font-mono text-2xl md:text-3xl text-teal-dark font-medium">{m.value}</div>
              <div className="mt-1 text-xs text-soft">{m.label}</div>
            </Reveal>
          ))}
        </section>
      )}

      <section className="max-w-content mx-auto px-6 md:px-8 py-8 grid md:grid-cols-3 gap-10">
        {[
          ['The problem', item.problem],
          ['The approach', item.approach],
          ['The outcome', item.outcome]
        ].filter(([, v]) => v).map(([label, text], i) => (
          <Reveal key={label} delay={i * 0.08}>
            <h3 className="font-display text-lg font-semibold text-navy mb-3">{label}</h3>
            <p className="text-sm text-soft leading-relaxed">{text}</p>
          </Reveal>
        ))}
      </section>

      {item.tags?.length > 0 && (
        <div className="max-w-content mx-auto px-6 md:px-8 pb-16 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span key={t} className="font-mono text-xs border border-line px-3 py-1 text-soft">
              {t}
            </span>
          ))}
        </div>
      )}

      <CTASection
        content={{
          title: 'Want to see the underlying data?',
          subtitle: 'Every case study can be walked through live.',
          buttonText: 'Get in touch',
          buttonLink: '/contact'
        }}
      />
    </article>
  );
};

export default WorkDetail;
