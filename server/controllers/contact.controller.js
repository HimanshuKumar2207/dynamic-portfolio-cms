const ContactMessage = require('../models/ContactMessage');

exports.submitMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email and message are required' });
  }
  const doc = await ContactMessage.create({ name, email, subject, message });
  res.status(201).json({ message: 'Message sent — thank you!', id: doc._id });
};

exports.getMessages = async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(messages);
};

exports.updateMessage = async (req, res) => {
  const msg = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!msg) return res.status(404).json({ message: 'Not found' });
  res.json(msg);
};

exports.deleteMessage = async (req, res) => {
  const msg = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!msg) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Message deleted' });
};
