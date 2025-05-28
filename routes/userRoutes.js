const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authMiddleware');
const authorizeAdmin = require('../middlewares/authorizeAdmin');
const { getUsers, getUserAvatar, editUser, deleteUser } = require('../controllers/UserController');

router.get('/users', authenticate, authorizeAdmin, getUsers);
router.get('/user/avatar', authenticate, getUserAvatar);
router.put('/users/:id', authenticate, authorizeAdmin, editUser);
router.delete('/users/:id', authenticate, authorizeAdmin, deleteUser);

module.exports = router;
