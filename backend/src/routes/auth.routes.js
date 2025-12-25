const router = require('express').Router();

const { register , login, googleAuth, logout, self } = require('../controllers/auth.controller');
const protect = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.post('/logout', protect, logout);
router.get('/self', protect, self);



module.exports= router;

