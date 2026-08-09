const Testimonial = require('../models/Testimonial');

exports.getPublicTestimonials = async (req, res) => {
  const items = await Testimonial.find({ visible: true }).sort({ order: 1 });
  res.json(items);
};

exports.getAdminTestimonials = async (req, res) => {
  const items = await Testimonial.find().sort({ order: 1 });
  res.json(items);
};

exports.createTestimonial = async (req, res) => {
  const count = await Testimonial.countDocuments();
  const item = await Testimonial.create({ ...req.body, order: req.body.order ?? count });
  res.status(201).json(item);
};

exports.updateTestimonial = async (req, res) => {
  const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

exports.deleteTestimonial = async (req, res) => {
  const item = await Testimonial.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Testimonial deleted' });
};
