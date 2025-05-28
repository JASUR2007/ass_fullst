const express = require('express');
const router = express.Router();
const jobScheduleController = require('../controllers/jobScheduleController');

router.post('/job-schedules', jobScheduleController.createJobSchedule);

router.get('/job-schedules', jobScheduleController.getAllJobSchedules);

module.exports = router;
