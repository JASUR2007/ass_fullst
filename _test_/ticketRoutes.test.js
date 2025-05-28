const request = require('supertest');
const express = require('express');
const ticketRoutes = require('../routes/ticketRoutes');

// Мокаем контроллеры
jest.mock('../controllers/ticketController', () => ({
    createTicket: jest.fn((req, res) => res.status(201).json({ message: 'createTicket called' })),
    getTickets: jest.fn((req, res) => res.status(200).json({ message: 'getTickets called' })),
    getIdTickets: jest.fn((req, res) => res.status(200).json({ message: 'getIdTickets called' })),
    updateTicket: jest.fn((req, res) => res.status(200).json({ message: 'updateTicket called' })),
    deleteTicket: jest.fn((req, res) => res.status(200).json({ message: 'deleteTicket called' })),
}));

// Создаём Express-приложение для тестов
const app = express();
app.use(express.json());
app.use('/api/tickets', ticketRoutes);

describe('Ticket Routes', () => {
    test('GET /api/tickets calls getTickets', async () => {
        const res = await request(app).get('/api/tickets');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('getTickets called');
    });

    test('GET /api/tickets/id calls getIdTickets', async () => {
        const res = await request(app).get('/api/tickets/id');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('getIdTickets called');
    });

    test('POST /api/tickets calls createTicket', async () => {
        const res = await request(app).post('/api/tickets').send({ title: 'Sample ticket' });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('createTicket called');
    });

    test('PUT /api/tickets/123 calls updateTicket', async () => {
        const res = await request(app).put('/api/tickets/123').send({ title: 'Updated ticket' });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('updateTicket called');
    });

    test('DELETE /api/tickets/123 calls deleteTicket', async () => {
        const res = await request(app).delete('/api/tickets/123');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('deleteTicket called');
    });
});
