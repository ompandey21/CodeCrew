const router = require('express').Router();
const protect = require('../middleware/auth.middleware');
const { getProjectMessages } = require('../controllers/chat.controller');

router.get('/:projectId', protect, getProjectMessages);

module.exports = router;

