const express = require('express');
const router = express.Router();
const sparePartController = require('../controllers/sparePartController');

router.post('/spare-parts', sparePartController.createSparePart);

router.get('/spare-parts', sparePartController.getAllSpareParts);

module.exports = router;
