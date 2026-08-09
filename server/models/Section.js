const mongoose = require('mongoose');

// This is the heart of the "fully dynamic" system.
// Every page (home / about / work / contact) is just an ordered list of
// Sections. Each Section has a `type` (which React component renders it)
// and a free-form `content` object whose shape depends on that type.
// The admin panel's Page Editor lets an admin add, edit, reorder, hide,
// or delete any section on any page without touching code.
const SectionSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
      enum: ['home', 'about', 'work', 'contact'],
      index: true
    },
    type: {
      type: String,
      required: true,
      enum: [
        'hero',
        'textImage',
        'stats',
        'cards',
        'timeline',
        'testimonials',
        'workGrid',
        'cta',
        'contactForm',
        'richText'
      ]
    },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
    content: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

SectionSchema.index({ page: 1, order: 1 });

module.exports = mongoose.model('Section', SectionSchema);
