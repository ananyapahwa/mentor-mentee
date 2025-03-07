import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('mentee'); // Default role
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        role,
      });
      alert('Registration Successful!');
    } catch (err) {
      alert('Registration Failed!');
    }
  };
  

  return (
      <form className="register-form" onSubmit={handleRegister}>
        <h2>CREATE ACCOUNT</h2>

        <input
          className="input-field"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="input-field"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

<div className="input-field password-field">
  <input
    type={showPassword ? 'text' : 'password'}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <FontAwesomeIcon
    icon={showPassword ? faEyeSlash : faEye}
    className="toggle-password-icon"
    onClick={() => setShowPassword(!showPassword)}
  />
</div>

        
        <select className="input-field" style={{ backgroundColor: '#9c80ff', color: 'white' , border: '2px solid #9c80ff'}} value={role} onChange={(e) => setRole(e.target.value)}required>
  <option value="mentee">Mentee</option>
  <option value="mentor" >Mentor</option>
</select>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>

  );
};

export default Register;
