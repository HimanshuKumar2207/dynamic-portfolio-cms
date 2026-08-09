const Section = require('../models/Section');

// Public: only visible sections for a page, in order
exports.getPublicSections = async (req, res) => {
  const { page } = req.query;
  const filter = { visible: true };
  if (page) filter.page = page;
  const sections = await Section.find(filter).sort({ order: 1 });
  res.json(sections);
};

// Admin: all sections for a page, including hidden ones
exports.getAdminSections = async (req, res) => {
  const { page } = req.query;
  const filter = {};
  if (page) filter.page = page;
  const sections = await Section.find(filter).sort({ order: 1 });
  res.json(sections);
};

exports.createSection = async (req, res) => {
  const count = await Section.countDocuments({ page: req.body.page });
  const section = await Section.create({ ...req.body, order: req.body.order ?? count });
  res.status(201).json(section);
};

exports.updateSection = async (req, res) => {
  const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!section) return res.status(404).json({ message: 'Section not found' });
  res.json(section);
};

exports.deleteSection = async (req, res) => {
  const section = await Section.findByIdAndDelete(req.params.id);
  if (!section) return res.status(404).json({ message: 'Section not found' });
  res.json({ message: 'Section deleted' });
};

// Bulk reorder: [{ id, order }, ...]
exports.reorderSections = async (req, res) => {
  const { items } = req.body;
  await Promise.all(
    items.map((item) => Section.findByIdAndUpdate(item.id, { order: item.order }))
  );
  res.json({ message: 'Order updated' });
};
