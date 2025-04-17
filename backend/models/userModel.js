const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false }, // Default: not verified
  OTP: { type: String, default: null }, // Default: No OTP 
  password: { type: String, required: true },
  role: { type: String, enum: ['mentor', 'mentee'], required: true },

    // Mentor-specific fields
    expertise: { 
      type: [String], 
      required: function() { return this.role === 'mentor'; } // Only required for mentors 
    },
    classesAlloted: { 
      classesAlloted: { 
        type: [String], // Array of class names (e.g., ["10A", "12B"])
        default: [] 
      },
    }, // Mentors can have multiple classes
  
    // Mentee-specific fields
    mentorId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      default: null 
    }, // Mentees have one assigned mentor

    classId: { 
      type: String, // Instead of ObjectId, it's now a simple string (e.g., "10A")
      default: null 
    }, // Mentees belong to one class
  
}, { timestamps: true });

// Password hash before save
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
