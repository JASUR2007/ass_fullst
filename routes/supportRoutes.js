const express = require('express');
const router = express.Router();
const supportController = require('../controllers/supportController');

router.post('/support-requests', supportController.createRequest);

router.get('/support-requests', supportController.getAllRequests);


module.exports = router;
