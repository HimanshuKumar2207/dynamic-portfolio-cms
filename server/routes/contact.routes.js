const router = require('express').Router();
const {
  submitMessage,
  getMessages,
  updateMessage,
  deleteMessage
} = require('../controllers/contact.controller');
const { protect } = require('../middleware/auth');

router.post('/', submitMessage);
router.get('/', protect, getMessages);
router.put('/:id', protect, updateMessage);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
