const SparePart = require('../models/SparePart');

exports.createSparePart = async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const newSparePart = await SparePart.create({
      name,
      quantity,
      price,
    });
    res.status(201).json(newSparePart);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при добавлении запасной части', error: err.message });
  }
};

exports.getAllSpareParts = async (req, res) => {
  try {
    const spareParts = await SparePart.findAll();
    res.status(200).json(spareParts);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении запасных частей', error: err.message });
  }
};
