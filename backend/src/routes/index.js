const router = require('express').Router();

router.use('/auth', require('./auth.routes'));
router.use('/projects', require('./project.routes'));
router.use('/notifications', require('./notification.routes'));
router.use('/chat', require('./chat.routes'));
router.use('/tasks', require('./task.routes'));



module.exports = router;


