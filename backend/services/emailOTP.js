const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,      // Your email
    pass: process.env.EMAIL_PASSWORD,  // Your app password
  },
});

exports.sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: `"Mentor-Mentee" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP Verification Code',
    html: `<h3>Your OTP is: <b>${otp}</b></h3>`,
  });
};
