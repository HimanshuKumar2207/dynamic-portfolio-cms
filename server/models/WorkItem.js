const mongoose = require('mongoose');

const WorkItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, default: 'Product Strategy' },
    client: { type: String, default: '' },
    role: { type: String, default: '' },
    year: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    gallery: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    summary: { type: String, default: '' },
    problem: { type: String, default: '' },
    approach: { type: String, default: '' },
    outcome: { type: String, default: '' },
    metrics: {
      type: [
        {
          label: { type: String, required: true },
          value: { type: String, required: true }
        }
      ],
      default: []
    },
    externalLink: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('WorkItem', WorkItemSchema);
