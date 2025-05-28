const KnowledgeBase = require('../models/KnowledgeBase');

// Create
exports.createKnowledgeBaseEntry = async (req, res) => {
  try {
    const { category, title, content, img, img_base } = req.body;
    const newEntry = await KnowledgeBase.create({
      category,
      title,
      content,
      img,
      img_base,
    });
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при добавлении статьи в базу знаний', error: err.message });
  }
};

// Read all
exports.getAllKnowledgeBaseEntries = async (req, res) => {
  try {
    const entries = await KnowledgeBase.findAll();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении статей базы знаний', error: err.message });
  }
};


exports.getKnowledgeBaseEntryById = async (req, res) => {
  try {
    const entry = await KnowledgeBase.findByPk(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Статья не найдена' });
    }
    res.status(200).json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении статьи', error: err.message });
  }
};

exports.updateKnowledgeBaseEntry = async (req, res) => {
  try {
    const { category, title, content, img, img_base } = req.body;
    const entry = await KnowledgeBase.findByPk(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Статья не найдена' });
    }
    entry.category = category || entry.category;
    entry.title = title || entry.title;
    entry.content = content || entry.content;
    entry.img = img || entry.img;
    entry.img_base = img_base || entry.img_base;

    await entry.save();
    res.status(200).json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при обновлении статьи', error: err.message });
  }
};

exports.deleteKnowledgeBaseEntry = async (req, res) => {
  try {
    const entry = await KnowledgeBase.findByPk(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Статья не найдена' });
    }
    await entry.destroy();
    res.status(200).json({ message: 'Статья удалена' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при удалении статьи', error: err.message });
  }
};
