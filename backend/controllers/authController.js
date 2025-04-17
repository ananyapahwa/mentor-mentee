const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const emailService = require('../services/emailOTP');

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Name, email, password, and role are required.' });
  }

  if (!['mentor', 'mentee'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role. Must be either "mentor" or "mentee".' });
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    const OTP = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = await bcrypt.hash(OTP, 10);
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: password,
      role,
      OTP: hashedOTP,
      otpExpiry,
      isVerified: false,
    });

    await emailService.sendOTP(email, OTP);

    res.status(201).json({
      message: 'Registered successfully. Please verify the OTP sent to your email.',
      userId: user._id,
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};

// VERIFY OTP
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
    if (!isMatch) return res.status(400).json({ message: 'Invalid OTP' });

    user.isVerified = true;
    user.OTP = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.isVerified) return res.status(400).json({ message: 'Please verify your email first' });
 
    const isMatch=bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};
