const WorkItem = require('../models/WorkItem');

exports.getWorkItems = async (req, res) => {
  const filter = {};
  if (req.query.featured === 'true') filter.featured = true;
  const items = await WorkItem.find(filter).sort({ order: 1, createdAt: -1 });
  res.json(items);
};

exports.getWorkItemBySlug = async (req, res) => {
  const item = await WorkItem.findOne({ slug: req.params.slug });
  if (!item) return res.status(404).json({ message: 'Case study not found' });
  res.json(item);
};

exports.getWorkItemById = async (req, res) => {
  const item = await WorkItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

exports.createWorkItem = async (req, res) => {
  const count = await WorkItem.countDocuments();
  const item = await WorkItem.create({ ...req.body, order: req.body.order ?? count });
  res.status(201).json(item);
};

exports.updateWorkItem = async (req, res) => {
  const item = await WorkItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

exports.deleteWorkItem = async (req, res) => {
  const item = await WorkItem.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Case study deleted' });
};
