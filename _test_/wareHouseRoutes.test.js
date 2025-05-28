const request = require('supertest');
const express = require('express');
const wareHouseRoutes = require('../routes/wareHouse');

// Мокаем контроллеры
jest.mock('../controllers/wareHouse', () => ({
    createWareHouse: jest.fn((req, res) => res.status(201).json({ message: 'createWareHouse called' })),
    getWareHouse: jest.fn((req, res) => res.status(200).json({ message: 'getWareHouse called' })),
    updateWareHouse: jest.fn((req, res) => res.status(200).json({ message: 'updateWareHouse called' })),
    deleteWareHouse: jest.fn((req, res) => res.status(200).json({ message: 'deleteWareHouse called' })),
}));

// Настраиваем Express-приложение для тестирования
const app = express();
app.use(express.json());
app.use('/api/warehouses', wareHouseRoutes);

describe('Warehouse Routes', () => {
    test('GET /api/warehouses calls getWareHouse', async () => {
        const res = await request(app).get('/api/warehouses');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('getWareHouse called');
    });

    test('POST /api/warehouses calls createWareHouse', async () => {
        const res = await request(app).post('/api/warehouses').send({ name: 'Central' });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('createWareHouse called');
    });

    test('PUT /api/warehouses/:id calls updateWareHouse', async () => {
        const res = await request(app).put('/api/warehouses/1').send({ name: 'Updated' });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('updateWareHouse called');
    });

    test('DELETE /api/warehouses/:id calls deleteWareHouse', async () => {
        const res = await request(app).delete('/api/warehouses/1');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('deleteWareHouse called');
    });
});
