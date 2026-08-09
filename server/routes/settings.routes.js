const router = require('express').Router();
const { getSettings, updateSettings } = require('../controllers/settings.controller');
const { protect } = require('../middleware/auth');

router.get('/', getSettings);
router.put('/', protect, updateSettings);

module.exports = router;
