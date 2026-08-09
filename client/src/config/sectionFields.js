// Config-driven form definitions. This is what lets the admin panel render
// a correct editing form for ANY section type without hard-coded UI per
// type — add a new type here (and a matching public component in
// SectionRenderer) and the admin form appears automatically.

export const SECTION_TYPES = [
  { value: 'hero', label: 'Hero' },
  { value: 'textImage', label: 'Text + Image' },
  { value: 'stats', label: 'Stats band' },
  { value: 'cards', label: 'Cards grid' },
  { value: 'timeline', label: 'Timeline' },
  { value: 'testimonials', label: 'Testimonials' },
  { value: 'workGrid', label: 'Work grid' },
  { value: 'cta', label: 'Call to action' },
  { value: 'contactForm', label: 'Contact form' },
  { value: 'richText', label: 'Rich text' }
];

const text = (key, label, extra = {}) => ({ key, label, type: 'text', ...extra });
const textarea = (key, label, extra = {}) => ({ key, label, type: 'textarea', ...extra });
const image = (key, label) => ({ key, label, type: 'image' });
const select = (key, label, options) => ({ key, label, type: 'select', options });
const checkbox = (key, label) => ({ key, label, type: 'checkbox' });
const number = (key, label) => ({ key, label, type: 'number' });

export const SECTION_CONFIG = {
  hero: {
    fields: [
      text('eyebrow', 'Eyebrow'),
      text('title', 'Title'),
      textarea('subtitle', 'Subtitle'),
      text('primaryButtonText', 'Primary button text'),
      text('primaryButtonLink', 'Primary button link'),
      text('secondaryButtonText', 'Secondary button text'),
      text('secondaryButtonLink', 'Secondary button link')
    ],
    list: {
      key: 'stats', label: 'Stats strip',
      itemFields: [text('label', 'Label'), text('value', 'Value'), text('suffix', 'Suffix (optional)')]
    }
  },
  textImage: {
    fields: [
      text('eyebrow', 'Eyebrow'),
      text('title', 'Title'),
      textarea('body', 'Body text'),
      image('image', 'Image'),
      select('imagePosition', 'Image position', ['left', 'right'])
    ],
    list: { key: 'bullets', label: 'Bullet points', simple: true }
  },
  stats: {
    fields: [text('eyebrow', 'Eyebrow'), text('title', 'Title')],
    list: {
      key: 'items', label: 'Stats',
      itemFields: [text('label', 'Label'), text('value', 'Value'), text('suffix', 'Suffix (optional)')]
    }
  },
  cards: {
    fields: [text('eyebrow', 'Eyebrow'), text('title', 'Title')],
    list: {
      key: 'items', label: 'Cards',
      itemFields: [text('icon', 'Icon / number label'), text('title', 'Title'), textarea('description', 'Description')]
    }
  },
  timeline: {
    fields: [text('eyebrow', 'Eyebrow'), text('title', 'Title')],
    list: {
      key: 'items', label: 'Timeline items',
      itemFields: [text('year', 'Year / range'), text('title', 'Title'), text('company', 'Company'), textarea('description', 'Description')]
    }
  },
  testimonials: {
    fields: [
      text('eyebrow', 'Eyebrow'),
      text('title', 'Title'),
      select('sourceMode', 'Source', ['collection', 'manual'])
    ],
    list: {
      key: 'items', label: 'Manual testimonials (only used if source = manual)',
      itemFields: [text('name', 'Name'), text('role', 'Role'), text('company', 'Company'), textarea('quote', 'Quote'), image('avatar', 'Avatar')]
    }
  },
  workGrid: {
    fields: [
      text('eyebrow', 'Eyebrow'),
      text('title', 'Title'),
      select('sourceMode', 'Source', ['collection', 'manual']),
      checkbox('featuredOnly', 'Featured only (collection mode)'),
      number('limit', 'Max items (collection mode)'),
      text('viewAllLink', '"View all" link (optional)')
    ],
    list: {
      key: 'items', label: 'Manual items (only used if source = manual)',
      itemFields: [text('title', 'Title'), text('slug', 'Link (slug, e.g. my-case-study)'), text('category', 'Category'), image('coverImage', 'Cover image'), text('year', 'Year')]
    }
  },
  cta: {
    fields: [text('title', 'Title'), textarea('subtitle', 'Subtitle'), text('buttonText', 'Button text'), text('buttonLink', 'Button link')]
  },
  contactForm: {
    fields: [text('eyebrow', 'Eyebrow'), text('title', 'Title'), textarea('subtitle', 'Subtitle')]
  },
  richText: {
    fields: [text('eyebrow', 'Eyebrow'), text('title', 'Title'), textarea('body', 'Body (one paragraph per line)', { rows: 8 })]
  }
};
