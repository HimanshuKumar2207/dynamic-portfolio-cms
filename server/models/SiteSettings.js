const mongoose = require('mongoose');

// A single "singleton" document that drives the Navbar, Footer and global
// site identity. Everything here is editable from Admin > Settings.
const SiteSettingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: 'Alex Rivera' },
    logoText: { type: String, default: 'AR.' },
    logoImage: { type: String, default: '' },
    tagline: { type: String, default: 'Product Manager & Business Analyst' },

    navLinks: {
      type: [
        {
          label: { type: String, required: true },
          path: { type: String, required: true },
          order: { type: Number, default: 0 }
        }
      ],
      default: [
        { label: 'Home', path: '/', order: 0 },
        { label: 'About', path: '/about', order: 1 },
        { label: 'Work', path: '/work', order: 2 },
        { label: 'Contact', path: '/contact', order: 3 }
      ]
    },

    socialLinks: {
      type: [
        {
          platform: { type: String, required: true },
          url: { type: String, required: true }
        }
      ],
      default: []
    },

    contactEmail: { type: String, default: 'hello@example.com' },
    contactPhone: { type: String, default: '' },
    location: { type: String, default: '' },

    footerText: {
      type: String,
      default: 'Turning ambiguous problems into shipped, measurable outcomes.'
    },
    footerNote: {
      type: String,
      default: 'Built with the MERN stack. Every word on this site is editable from the admin panel.'
    },

    accentColor: { type: String, default: '#158C8C' },
    resumeUrl: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteSettings', SiteSettingsSchema);
