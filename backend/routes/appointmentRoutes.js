const express = require('express');
const { protect } = require('../middleware/AuthMiddleware');
const { createAppointment, getAppointments } = require('../controllers/appointmentController');

const router = express.Router();

router.post('/create', protect, createAppointment); // Only mentees
router.get('/', protect, getAppointments); // For mentees and mentors to see their appointments

module.exports = router;
