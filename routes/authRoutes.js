const express = require('express');
const { register, login } = require('../controllers/authController');
const upload = require('../utils/multer-config');
const router = express.Router();

router.post('/register', upload.single('image'), register);
router.post('/login', login);
router.post('/logout', (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' })
})

module.exports = router;
