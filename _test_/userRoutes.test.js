const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');

// Мокаем middleware и контроллеры
jest.mock('../middlewares/authMiddleware', () => jest.fn((req, res, next) => next()));
jest.mock('../middlewares/authorizeAdmin', () => jest.fn((req, res, next) => next()));
jest.mock('../controllers/UserController', () => ({
    getUsers: jest.fn((req, res) => res.status(200).json({ message: 'getUsers called' })),
    getUserAvatar: jest.fn((req, res) => res.status(200).json({ message: 'getUserAvatar called' })),
    editUser: jest.fn((req, res) => res.status(200).json({ message: 'editUser called' })),
    deleteUser: jest.fn((req, res) => res.status(200).json({ message: 'deleteUser called' })),
}));

// Настраиваем Express-приложение для теста
const app = express();
app.use(express.json());
app.use('/', userRoutes);

describe('User Routes', () => {
    test('GET /users calls getUsers controller', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('getUsers called');
    });

    test('GET /user/avatar calls getUserAvatar controller', async () => {
        const res = await request(app).get('/user/avatar');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('getUserAvatar called');
    });

    test('PUT /users/:id calls editUser controller', async () => {
        const res = await request(app)
            .put('/users/123')
            .send({ name: 'Updated Name' });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('editUser called');
    });

    test('DELETE /users/:id calls deleteUser controller', async () => {
        const res = await request(app).delete('/users/123');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('deleteUser called');
    });
});
