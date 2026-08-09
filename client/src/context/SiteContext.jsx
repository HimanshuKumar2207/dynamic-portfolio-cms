import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

// Global site settings (nav, logo, footer, socials, etc.) fetched once and
// shared across the whole public site — this is what makes the Navbar and
// Footer "fully dynamic" from the admin panel.
const SiteContext = createContext(null);

const FALLBACK = {
  siteName: 'Portfolio',
  logoText: 'PM.',
  tagline: '',
  navLinks: [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Work', path: '/work' },
    { label: 'Contact', path: '/contact' }
  ],
  socialLinks: [],
  footerText: '',
  footerNote: ''
};

export const SiteProvider = ({ children }) => {
  const [settings, setSettings] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const { data } = await api.get('/settings');
      setSettings(data);
    } catch (err) {
      // Keep fallback settings if the API isn't reachable yet
      console.warn('Could not load site settings, using defaults.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <SiteContext.Provider value={{ settings, loading, refresh }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => useContext(SiteContext);
