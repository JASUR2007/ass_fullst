const express = require('express');
const router = express.Router();
const { getAnalytics } = require('../controllers/analyticsController');
const authMiddleware = require('../middlewares/authMiddleware');// если есть авторизация

router.get('/analytics', authMiddleware, getAnalytics);

module.exports = router;
