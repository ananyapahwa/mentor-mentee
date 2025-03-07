import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Save token
      localStorage.setItem('token', response.data.token);

      // Redirect
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-container">
      <h2>WELCOME!</h2>

      <form onSubmit={handleLogin}>
  <input
    className="input-field"
    type="email"
    placeholder="EMAIL"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <input
    className="input-field"
    type="password"
    placeholder="PASSWORD"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'LOGIN'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <p>
        Don't have an account? <span onClick={() => navigate('/register')} style={{ cursor: 'pointer', color: 'blue' }}>Register</span>
      </p>
    </div>
  );
};

export default Login;
