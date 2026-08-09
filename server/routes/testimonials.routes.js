const router = require('express').Router();
const {
  getPublicTestimonials,
  getAdminTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} = require('../controllers/testimonials.controller');
const { protect } = require('../middleware/auth');

router.get('/', getPublicTestimonials);
router.get('/admin', protect, getAdminTestimonials);
router.post('/', protect, createTestimonial);
router.put('/:id', protect, updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

module.exports = router;
