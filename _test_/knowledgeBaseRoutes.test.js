const request = require('supertest');
const express = require('express');
const knowledgeBaseRoutes = require('../routes/knowledgeBaseRoutes'); // путь к твоему router

// Мокаем контроллеры
jest.mock('../controllers/knowledgeBaseController', () => ({
    createKnowledgeBaseEntry: jest.fn((req, res) => res.status(201).json({ message: 'createKnowledgeBaseEntry called' })),
    getAllKnowledgeBaseEntries: jest.fn((req, res) => res.status(200).json({ message: 'getAllKnowledgeBaseEntries called' })),
    getKnowledgeBaseEntryById: jest.fn((req, res) => res.status(200).json({ message: 'getKnowledgeBaseEntryById called' })),
    updateKnowledgeBaseEntry: jest.fn((req, res) => res.status(200).json({ message: 'updateKnowledgeBaseEntry called' })),
    deleteKnowledgeBaseEntry: jest.fn((req, res) => res.status(200).json({ message: 'deleteKnowledgeBaseEntry called' })),
}));

// Настраиваем Express-приложение
const app = express();
app.use(express.json());
app.use('/api', knowledgeBaseRoutes);

describe('Knowledge Base Routes', () => {
    test('POST /api/knowledge-base calls createKnowledgeBaseEntry', async () => {
        const res = await request(app).post('/api/knowledge-base').send({ title: 'Test', content: 'Test content' });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('createKnowledgeBaseEntry called');
    });

    test('GET /api/knowledge-base calls getAllKnowledgeBaseEntries', async () => {
        const res = await request(app).get('/api/knowledge-base');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('getAllKnowledgeBaseEntries called');
    });

    test('GET /api/knowledge-base/:id calls getKnowledgeBaseEntryById', async () => {
        const res = await request(app).get('/api/knowledge-base/1');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('getKnowledgeBaseEntryById called');
    });

    test('PUT /api/knowledge-base/:id calls updateKnowledgeBaseEntry', async () => {
        const res = await request(app).put('/api/knowledge-base/1').send({ title: 'Updated' });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('updateKnowledgeBaseEntry called');
    });

    test('DELETE /api/knowledge-base/:id calls deleteKnowledgeBaseEntry', async () => {
        const res = await request(app).delete('/api/knowledge-base/1');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('deleteKnowledgeBaseEntry called');
    });
});
