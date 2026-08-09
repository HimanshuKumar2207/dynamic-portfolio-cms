import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import Reveal from '../Reveal';
import api from '../../api/axios';

const inputClass =
  'w-full bg-transparent border-b border-line focus:border-teal outline-none py-3 text-sm placeholder:text-soft/70 transition-colors';

const ContactFormSection = ({ content = {} }) => {
  const { eyebrow, title, subtitle } = content;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await api.post('/contact', form);
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className="max-w-content mx-auto px-6 md:px-8 py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          {eyebrow && (
            <Reveal>
              <span className="eyebrow mb-5">{eyebrow}</span>
            </Reveal>
          )}
          {title && (
            <Reveal delay={0.05}>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy">{title}</h2>
            </Reveal>
          )}
          {subtitle && (
            <Reveal delay={0.1}>
              <p className="mt-4 text-soft max-w-sm leading-relaxed">{subtitle}</p>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.15}>
          {status === 'sent' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-teal/30 bg-teal-light/30 p-8 flex flex-col items-start gap-3"
            >
              <CheckCircle2 className="text-teal" size={28} />
              <p className="text-navy font-medium">Message sent — thank you.</p>
              <p className="text-sm text-soft">I read every message myself and usually reply within two business days.</p>
              <button onClick={() => setStatus('idle')} className="text-sm text-teal-dark link-underline mt-2">
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your name"
                  className={inputClass}
                />
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="Email address"
                  className={inputClass}
                />
              </div>
              <input
                name="subject"
                value={form.subject}
                onChange={onChange}
                placeholder="Subject (optional)"
                className={inputClass}
              />
              <textarea
                required
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="What's the problem you're solving?"
                rows={5}
                className={inputClass + ' resize-none'}
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-60">
                {status === 'sending' ? 'Sending…' : 'Send message'} <Send size={15} />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
};

export default ContactFormSection;
