// Populates the database with realistic starter content so the site isn't
// empty on first run. Safe to re-run — it wipes and recreates content
// collections, but leaves nothing else on your machine untouched.
//
// Usage:  npm run seed   (run from the /server folder, after setting .env)

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const connectDB = require('../config/db');

const Admin = require('../models/Admin');
const SiteSettings = require('../models/SiteSettings');
const Section = require('../models/Section');
const WorkItem = require('../models/WorkItem');
const Testimonial = require('../models/Testimonial');

const run = async () => {
  await connectDB();

  console.log('Clearing existing content...');
  await Promise.all([
    SiteSettings.deleteMany({}),
    Section.deleteMany({}),
    WorkItem.deleteMany({}),
    Testimonial.deleteMany({})
  ]);

  // ---------- Admin user ----------
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await Admin.create({
      name: process.env.ADMIN_NAME || 'Admin',
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD || 'ChangeMe123!'
    });
    console.log(`Admin user created -> ${adminEmail}`);
  } else {
    console.log('Admin user already exists, skipping.');
  }

  // ---------- Site settings ----------
  await SiteSettings.create({
    siteName: 'Alex Rivera',
    logoText: 'AR.',
    tagline: 'Product Manager & Business Analyst',
    navLinks: [
      { label: 'Home', path: '/', order: 0 },
      { label: 'About', path: '/about', order: 1 },
      { label: 'Work', path: '/work', order: 2 },
      { label: 'Contact', path: '/contact', order: 3 }
    ],
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com' },
      { platform: 'Email', url: 'mailto:hello@alexrivera.io' }
    ],
    contactEmail: 'hello@alexrivera.io',
    contactPhone: '+1 (555) 012-4488',
    location: 'San Francisco, CA',
    footerText: 'Turning ambiguous problems into shipped, measurable outcomes.',
    footerNote: 'Built with the MERN stack. Every word on this site is editable from the admin panel.',
    accentColor: '#158C8C'
  });
  console.log('Site settings created.');

  // ---------- Work items ----------
  const work = await WorkItem.insertMany([
    {
      title: 'Reducing Checkout Abandonment',
      slug: 'checkout-abandonment',
      category: 'Product Strategy',
      client: 'Northloop Retail',
      role: 'Lead Product Manager',
      year: '2024',
      coverImage: '',
      tags: ['E-commerce', 'Funnel Analysis', 'A/B Testing'],
      summary: 'Diagnosed a leaking checkout funnel and shipped a redesign that recovered a meaningful share of abandoned carts.',
      problem: 'Checkout completion had quietly dropped 6 points quarter over quarter, and no one on the team agreed on why.',
      approach: 'Instrumented every checkout step, ran cohort analysis against device and payment type, then interviewed 14 customers who abandoned mid-flow. The data pointed to a single friction step: forced account creation.',
      outcome: 'Replaced forced sign-up with guest checkout and progressive account creation, tested against the existing flow for three weeks.',
      metrics: [
        { label: 'Cart abandonment', value: '-18%' },
        { label: 'Checkout conversion', value: '+9.2%' },
        { label: 'Time to launch', value: '5 weeks' }
      ],
      featured: true,
      order: 0
    },
    {
      title: 'Onboarding Overhaul for a B2B SaaS Platform',
      slug: 'saas-onboarding-overhaul',
      category: 'UX & Activation',
      client: 'Fieldstack',
      role: 'Senior Product Manager',
      year: '2023',
      coverImage: '',
      tags: ['SaaS', 'Activation', 'User Research'],
      summary: 'Rebuilt a five-step onboarding wizard around the single action that predicted long-term retention.',
      problem: 'Trial users were signing up but fewer than a third ever reached the "aha" moment inside the product.',
      approach: 'Ran a retention analysis across 20,000 accounts to isolate the one early action most correlated with 90-day retention, then redesigned onboarding to get every new user to that action in under five minutes.',
      outcome: 'Cut the onboarding flow from five steps to two, added contextual guidance, and rolled it out gradually across cohorts.',
      metrics: [
        { label: 'Activation rate', value: '+27%' },
        { label: 'Time to first value', value: '-64%' },
        { label: '90-day retention', value: '+11pts' }
      ],
      featured: true,
      order: 1
    },
    {
      title: 'Pricing Model Analysis & Rollout',
      slug: 'pricing-model-analysis',
      category: 'Business Analysis',
      client: 'Northloop Retail',
      role: 'Business Analyst',
      year: '2023',
      coverImage: '',
      tags: ['Pricing', 'Financial Modeling', 'Experimentation'],
      summary: 'Built a willingness-to-pay model and ran a phased price test that grew revenue without hurting churn.',
      problem: 'Pricing had not moved in three years despite rising costs, and leadership was wary of losing customers.',
      approach: 'Built a demand-curve model from historical purchase data and survey-based willingness-to-pay, then designed a phased regional test to de-risk the rollout.',
      outcome: 'Presented findings to the executive team and led a 12-week phased rollout with a built-in kill switch.',
      metrics: [
        { label: 'Net revenue', value: '+14%' },
        { label: 'Churn impact', value: '+0.3pts (within tolerance)' },
        { label: 'Regions tested', value: '4' }
      ],
      featured: true,
      order: 2
    },
    {
      title: 'Self-Serve Analytics Dashboard for Ops',
      slug: 'ops-analytics-dashboard',
      category: 'Internal Tools',
      client: 'Fieldstack',
      role: 'Product Manager',
      year: '2022',
      coverImage: '',
      tags: ['Analytics', 'Internal Tools', 'Stakeholder Alignment'],
      summary: 'Replaced 30+ hours a week of manual reporting with a self-serve dashboard built around the operations team\u2019s real questions.',
      problem: 'The ops team relied on analysts to manually pull reports, creating multi-day delays on routine questions.',
      approach: 'Shadowed the ops team for two weeks to catalog every recurring question, then prioritized a dashboard scope around the 80% that repeated weekly.',
      outcome: 'Shipped a self-serve dashboard with saved views and alerts, and sunset the manual reporting process entirely.',
      metrics: [
        { label: 'Analyst hours saved', value: '30+/week' },
        { label: 'Report turnaround', value: 'Days to minutes' },
        { label: 'Adoption', value: '92% of ops team' }
      ],
      featured: false,
      order: 3
    }
  ]);
  console.log(`${work.length} work items created.`);

  // ---------- Testimonials ----------
  await Testimonial.insertMany([
    {
      name: 'Priya Shah',
      role: 'VP of Product',
      company: 'Fieldstack',
      quote: 'Alex has a rare ability to turn a messy, ambiguous problem into a crisp plan the whole team can rally behind. The onboarding work alone changed our trajectory.',
      order: 0
    },
    {
      name: 'Marcus Webb',
      role: 'CEO',
      company: 'Northloop Retail',
      quote: 'Every recommendation came backed by data, not opinion. That pricing project was the most rigorous piece of analysis our leadership team had seen in years.',
      order: 1
    },
    {
      name: 'Dana Okafor',
      role: 'Design Lead',
      company: 'Fieldstack',
      quote: 'Working with Alex meant fewer meetings and better decisions. Problems arrived pre-framed, with the right questions already asked.',
      order: 2
    }
  ]);
  console.log('Testimonials created.');

  // ---------- Sections ----------
  const sections = [
    // HOME (5 sections)
    {
      page: 'home', type: 'hero', order: 0, visible: true,
      content: {
        eyebrow: 'Product Manager — Business Analyst',
        title: 'I turn ambiguous problems into shipped, measurable outcomes.',
        subtitle: 'Eight years bridging data and product strategy — framing the right question, then shipping the answer.',
        primaryButtonText: 'View case studies',
        primaryButtonLink: '/work',
        secondaryButtonText: 'Get in touch',
        secondaryButtonLink: '/contact',
        stats: [
          { label: 'Years experience', value: '8' },
          { label: 'Products shipped', value: '23' },
          { label: 'Avg. metric lift', value: '19%' }
        ]
      }
    },
    {
      page: 'home', type: 'textImage', order: 1, visible: true,
      content: {
        eyebrow: 'How I work',
        title: 'Frame the problem before you touch the solution.',
        body: 'Most roadmaps fail before a single line of code is written — the problem was never framed correctly. I start every engagement by getting the data and the stakeholders in the same room, so the eventual solution is obvious rather than argued over.',
        image: '',
        imagePosition: 'right',
        bullets: [
          'Frame the problem before the solution',
          'Validate with data, not opinion',
          'Ship, measure, and iterate in public'
        ]
      }
    },
    {
      page: 'home', type: 'stats', order: 2, visible: true,
      content: {
        eyebrow: 'Track record',
        title: 'Impact, in numbers',
        items: [
          { label: 'Revenue influenced', value: '4.2', suffix: 'M+' },
          { label: 'Experiments run', value: '65', suffix: '+' },
          { label: 'Teams led', value: '9', suffix: '' },
          { label: 'Avg. activation lift', value: '22', suffix: '%' }
        ]
      }
    },
    {
      page: 'home', type: 'workGrid', order: 3, visible: true,
      content: {
        eyebrow: 'Selected work',
        title: 'Recent case studies',
        sourceMode: 'collection',
        featuredOnly: true,
        limit: 3,
        viewAllLink: '/work'
      }
    },
    {
      page: 'home', type: 'cta', order: 4, visible: true,
      content: {
        title: 'Have a problem worth solving?',
        subtitle: 'I take on a small number of product and analysis engagements each quarter.',
        buttonText: 'Start a conversation',
        buttonLink: '/contact'
      }
    },

    // ABOUT (5 sections)
    {
      page: 'about', type: 'hero', order: 0, visible: true,
      content: {
        eyebrow: 'About',
        title: 'The analyst\u2019s rigor. The product manager\u2019s ownership.',
        subtitle: 'I\u2019ve spent eight years sitting at the intersection of data and product — this is how I got there, and how I work now.',
        primaryButtonText: 'See the work',
        primaryButtonLink: '/work',
        secondaryButtonText: '',
        secondaryButtonLink: '',
        stats: []
      }
    },
    {
      page: 'about', type: 'textImage', order: 1, visible: true,
      content: {
        eyebrow: 'Background',
        title: 'From spreadsheets to shipped product.',
        body: 'I started as a business analyst, building the models that told product teams what to build next — then got tired of handing off the recommendation and moved into product management to see it through. Today I move fluidly between the two: comfortable in SQL and a stakeholder deck in the same afternoon.',
        image: '',
        imagePosition: 'left',
        bullets: [
          'Former business analyst turned product manager',
          'Fluent in SQL, experimentation design, and roadmapping',
          'Based in San Francisco, working with teams everywhere'
        ]
      }
    },
    {
      page: 'about', type: 'timeline', order: 2, visible: true,
      content: {
        eyebrow: 'Experience',
        title: 'Where I\u2019ve worked',
        items: [
          { year: '2023 — Now', title: 'Senior Product Manager', company: 'Fieldstack', description: 'Own the activation and onboarding surface for a B2B SaaS platform used by 4,000+ companies.' },
          { year: '2021 — 2023', title: 'Product Manager', company: 'Northloop Retail', description: 'Led checkout and pricing initiatives across a $60M e-commerce business.' },
          { year: '2018 — 2021', title: 'Business Analyst', company: 'Northloop Retail', description: 'Built the financial and behavioral models that shaped product strategy for three consecutive years.' },
          { year: '2016 — 2018', title: 'Data Analyst', company: 'Brightline Insurance', description: 'Started a career in analytics, translating claims data into operational recommendations.' }
        ]
      }
    },
    {
      page: 'about', type: 'cards', order: 3, visible: true,
      content: {
        eyebrow: 'Toolkit',
        title: 'What I bring to a team',
        items: [
          { icon: '01', title: 'Product Strategy', description: 'Roadmapping, prioritization frameworks, and OKRs tied to real business outcomes.' },
          { icon: '02', title: 'Data & SQL', description: 'Comfortable querying raw data directly rather than waiting on a dashboard.' },
          { icon: '03', title: 'Experimentation', description: 'Designing and reading A/B tests without fooling myself about significance.' },
          { icon: '04', title: 'Stakeholder Alignment', description: 'Turning a room of disagreeing execs into a shared, written decision.' },
          { icon: '05', title: 'User Research', description: 'Qualitative interviews paired with quantitative evidence, never one alone.' },
          { icon: '06', title: 'Financial Modeling', description: 'Pricing, forecasting, and business cases that hold up under scrutiny.' }
        ]
      }
    },
    {
      page: 'about', type: 'testimonials', order: 4, visible: true,
      content: {
        eyebrow: 'References',
        title: 'What people say',
        sourceMode: 'collection'
      }
    },

    // WORK (4 sections)
    {
      page: 'work', type: 'hero', order: 0, visible: true,
      content: {
        eyebrow: 'Case studies',
        title: 'Selected work',
        subtitle: 'A handful of the problems I\u2019ve been trusted to solve, and what happened after.',
        primaryButtonText: '', primaryButtonLink: '',
        secondaryButtonText: '', secondaryButtonLink: '',
        stats: []
      }
    },
    {
      page: 'work', type: 'workGrid', order: 1, visible: true,
      content: {
        eyebrow: '',
        title: '',
        sourceMode: 'collection',
        featuredOnly: false,
        limit: 12,
        viewAllLink: ''
      }
    },
    {
      page: 'work', type: 'stats', order: 2, visible: true,
      content: {
        eyebrow: 'Process',
        title: 'How each engagement runs',
        items: [
          { label: 'Discovery', value: '1', suffix: ' week' },
          { label: 'Analysis', value: '2', suffix: ' weeks' },
          { label: 'Build & test', value: '4', suffix: '-8 weeks' },
          { label: 'Handoff', value: '1', suffix: ' week' }
        ]
      }
    },
    {
      page: 'work', type: 'cta', order: 3, visible: true,
      content: {
        title: 'Want the full write-up on any project?',
        subtitle: 'Every case study can be walked through live, with the underlying data.',
        buttonText: 'Get in touch',
        buttonLink: '/contact'
      }
    },

    // CONTACT (3 sections)
    {
      page: 'contact', type: 'hero', order: 0, visible: true,
      content: {
        eyebrow: 'Contact',
        title: 'Let\u2019s talk about your problem.',
        subtitle: 'Tell me what\u2019s not working yet — I read every message myself.',
        primaryButtonText: '', primaryButtonLink: '',
        secondaryButtonText: '', secondaryButtonLink: '',
        stats: []
      }
    },
    {
      page: 'contact', type: 'contactForm', order: 1, visible: true,
      content: {
        eyebrow: 'Say hello',
        title: 'Send a message',
        subtitle: 'I typically reply within two business days.'
      }
    },
    {
      page: 'contact', type: 'cards', order: 2, visible: true,
      content: {
        eyebrow: '',
        title: 'Other ways to reach me',
        items: [
          { icon: '@', title: 'Email', description: 'hello@alexrivera.io' },
          { icon: '#', title: 'Location', description: 'San Francisco, CA · working with teams everywhere' },
          { icon: 'in', title: 'LinkedIn', description: 'Connect for a faster reply' }
        ]
      }
    }
  ];

  await Section.insertMany(sections);
  console.log(`${sections.length} sections created across 4 pages.`);

  console.log('\nSeed complete.');
  console.log(`Admin login -> ${adminEmail} / ${existingAdmin ? '(existing password)' : (process.env.ADMIN_PASSWORD || 'ChangeMe123!')}`);
  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
