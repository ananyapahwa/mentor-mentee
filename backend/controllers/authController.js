const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const emailService = require('../services/emailOTP');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Name, email, password, and role are required.' });
  }

  if (!['mentor', 'mentee'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role. Must be either "mentor" or "mentee".' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const OTP = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    const hashedOTP = await bcrypt.hash(OTP, 10); // Hash the OTP
    const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 mins

    const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role,
        OTP: hashedOTP,  // Store hashed OTP
        otpExpiry,
        isVerified: false,
    });

    await emailService.sendOTP(email, OTP);

    res.status(201).json({
      message: 'Registered successfully. Please verify the OTP sent to your email.',
      userId: user._id, // Optional: return user ID for frontend use
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
  }
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.isVerified) return res.status(400).json({ message: 'User already verified' });

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
    }
    const isMatch = await bcrypt.compare(otp, user.OTP);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.isVerified) return res.status(400).json({ message: 'Please verify your email first' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
