const express = require('express');
const router = express.Router();
const testunitController = require('../controllers/testunit');

router.get('/', testunitController.getAll);
router.get('/:id', testunitController.getById);
router.post('/', testunitController.create);
router.put('/:id', testunitController.update);
router.delete('/:id', testunitController.delete);

module.exports = router;
