import React from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';

const Footer = () => {
  const { settings } = useSite();
  const links = [...(settings.navLinks || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/80">
      <div className="max-w-content mx-auto px-6 md:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="font-display text-2xl text-white font-semibold mb-3">
            {settings.logoText || settings.siteName}
          </div>
          <p className="text-sm leading-relaxed max-w-xs">{settings.footerText}</p>
        </div>

        <div>
          <div className="eyebrow text-teal mb-4">Navigate</div>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-sm hover:text-teal transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="eyebrow text-teal mb-4">Connect</div>
          <ul className="space-y-2">
            {settings.contactEmail && (
              <li>
                <a href={`mailto:${settings.contactEmail}`} className="text-sm hover:text-teal transition-colors">
                  {settings.contactEmail}
                </a>
              </li>
            )}
            {(settings.socialLinks || []).map((s) => (
              <li key={s.platform}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm hover:text-teal transition-colors"
                >
                  {s.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-content mx-auto px-6 md:px-8 py-6 flex flex-col md:flex-row justify-between gap-2 text-xs font-mono text-white/50">
          <span>© {year} {settings.siteName}. All rights reserved.</span>
          <span>{settings.footerNote}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
