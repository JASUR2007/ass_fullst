    const express = require('express');
    const { createWareHouse, getWareHouse, deleteWareHouse, updateWareHouse } = require('../controllers/wareHouse');
    const router = express.Router();

    // router.post('/create', createTicket);
    router.get('/', getWareHouse);
    router.post('/', createWareHouse);
    router.put('/:id', updateWareHouse);
    router.delete('/:id', deleteWareHouse);
    module.exports = router;
