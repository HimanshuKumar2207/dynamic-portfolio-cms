const router = require('express').Router();
const {
  getPublicSections,
  getAdminSections,
  createSection,
  updateSection,
  deleteSection,
  reorderSections
} = require('../controllers/sections.controller');
const { protect } = require('../middleware/auth');

router.get('/', getPublicSections);
router.get('/admin', protect, getAdminSections);
router.post('/', protect, createSection);
router.put('/reorder', protect, reorderSections);
router.put('/:id', protect, updateSection);
router.delete('/:id', protect, deleteSection);

module.exports = router;
