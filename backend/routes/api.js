const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
// const userRoutes = require('./userRoutes');
const appointmentRoutes = require('./appointmentRoutes');

router.use('/auth', authRoutes);
// router.use('/users', userRoutes);
router.use('/appointments', appointmentRoutes);

module.exports = router;
