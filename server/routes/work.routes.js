const router = require('express').Router();
const {
  getWorkItems,
  getWorkItemBySlug,
  getWorkItemById,
  createWorkItem,
  updateWorkItem,
  deleteWorkItem
} = require('../controllers/work.controller');
const { protect } = require('../middleware/auth');

router.get('/', getWorkItems);
router.get('/id/:id', protect, getWorkItemById);
router.get('/:slug', getWorkItemBySlug);
router.post('/', protect, createWorkItem);
router.put('/:id', protect, updateWorkItem);
router.delete('/:id', protect, deleteWorkItem);

module.exports = router;
