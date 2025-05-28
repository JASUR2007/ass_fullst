const SupportRequest = require('../models/SupportRequest');

exports.createRequest = async (req, res) => {
  try {
    const { userId, description, quote } = req.body;
    const newRequest = await SupportRequest.create({
      userId,
      description,
      quote,
    });
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при создании заявки', error: err.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await SupportRequest.findAll();
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении заявок', error: err.message });
  }
};


