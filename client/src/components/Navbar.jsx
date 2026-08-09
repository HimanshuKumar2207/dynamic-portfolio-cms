import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const Navbar = () => {
  const { settings } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [...(settings.navLinks || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-paper/85 backdrop-blur-md border-b border-line' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-content mx-auto px-6 md:px-8 flex items-center justify-between h-20">
        <Link to="/" className="font-display text-xl font-semibold tracking-tight text-navy">
          {settings.logoImage ? (
            <img src={settings.logoImage} alt={settings.siteName} className="h-8" />
          ) : (
            settings.logoText || settings.siteName
          )}
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `link-underline text-sm font-medium tracking-wide ${
                  isActive ? 'text-teal-dark' : 'text-ink/80 hover:text-navy'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <Link to="/contact" className="hidden md:inline-flex btn-primary">
          Let's talk
        </Link>

        <button
          className="md:hidden text-navy"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-paper border-b border-line overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-ink py-1"
                >
                  {link.label}
                </NavLink>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary justify-center mt-2">
                Let's talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
