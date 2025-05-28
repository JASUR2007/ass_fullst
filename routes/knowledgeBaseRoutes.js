const express = require('express');
const router = express.Router();
const knowledgeBaseController = require('../controllers/knowledgeBaseController');

router.post('/knowledge-base', knowledgeBaseController.createKnowledgeBaseEntry);
router.get('/knowledge-base', knowledgeBaseController.getAllKnowledgeBaseEntries);
router.get('/knowledge-base/:id', knowledgeBaseController.getKnowledgeBaseEntryById);
router.put('/knowledge-base/:id', knowledgeBaseController.updateKnowledgeBaseEntry);
router.delete('/knowledge-base/:id', knowledgeBaseController.deleteKnowledgeBaseEntry);

module.exports = router;
