const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');

// Create Appointment (only for mentees)
const createAppointment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || user.role !== 'mentee') {
      return res.status(403).json({ message: 'Only mentees can create appointments.' });
    }

    const { mentorId, date, time, notes } = req.body;

    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== 'mentor') {
      return res.status(404).json({ message: 'Mentor not found.' });
    }

    const appointment = await Appointment.create({
      mentee: req.user.id,
      mentor: mentorId,
      date,
      time,
      notes,
    });

    res.status(201).json({ message: 'Appointment created successfully.', appointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get Appointments (for both mentees and mentors)
const getAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    let appointments;

    if (user.role === 'mentee') {
      appointments = await Appointment.find({ mentee: userId }).populate('mentor', 'name email');
    } else if (user.role === 'mentor') {
      appointments = await Appointment.find({ mentor: userId }).populate('mentee', 'name email');
    } else {
      return res.status(403).json({ message: 'Invalid role.' });
    }

    res.status(200).json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
};
