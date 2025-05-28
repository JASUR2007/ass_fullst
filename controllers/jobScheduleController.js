const JobSchedule = require('../models/JobSchedule');

exports.createJobSchedule = async (req, res) => {
  try {
    const { supportRequestId, scheduledDate, priority } = req.body;
    const newSchedule = await JobSchedule.create({
      supportRequestId,
      scheduledDate,
      priority,
    });
    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при создании расписания', error: err.message });
  }
};

exports.getAllJobSchedules = async (req, res) => {
  try {
    const schedules = await JobSchedule.findAll();
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении расписания', error: err.message });
  }
};
