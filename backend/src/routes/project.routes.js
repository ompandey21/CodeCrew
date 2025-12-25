const router = require('express').Router();
const protect = require('../middleware/auth.middleware');
const { createProject, getMyProjects, requestJoin, approveJoin, leaveProject, updateProject, removeMember, deleteProject, transferLeadership, declineJoin } = require('../controllers/project.controller');

router.post('/', protect, createProject);
router.post('/join', protect, requestJoin);
router.post('/approve', protect, approveJoin);
router.post('/decline', protect, declineJoin);
router.post('/leave', protect, leaveProject);
router.put('/', protect, updateProject);
router.get('/my', protect, getMyProjects);
router.post('/remove-member', protect, removeMember);
router.delete('/', protect, deleteProject);
router.post('/transfer-leader', protect, transferLeadership);







module.exports = router;

