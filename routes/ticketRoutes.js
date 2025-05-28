const express = require('express');
const { createTicket, getTickets, getIdTickets, deleteTicket, updateTicket } = require('../controllers/ticketController');
const router = express.Router();

// router.post('/create', createTicket);
router.get('/', getTickets);
router.get('/id', getIdTickets);
router.post('/', createTicket);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);
module.exports = router;
