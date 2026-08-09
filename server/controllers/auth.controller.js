const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email: email?.toLowerCase().trim() });
  if (!admin || !(await admin.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  res.json({
    token: genToken(admin._id),
    admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
  });
};

exports.me = async (req, res) => {
  res.json(req.admin);
};
