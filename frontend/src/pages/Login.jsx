import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/login-image.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy authentication
    if (email === "test@gmail.com" && password === "password") {
      localStorage.setItem("user", email);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      {/* Left Blue Section */}
      <div className="login-left">
        <nav className="navbar">
          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Products</a>
            <a href="#">Contacts</a>
          </div>
          <button className="login-btn">Login</button>
        </nav>

        <div className="login-content">
          <h2>Education</h2>
          <p>Welcome to our site</p>
          <form className="login-form">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />

            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />

            <button type="submit">Login</button>
          </form>
        </div>
      </div>

      {/* Right White Section with Image */}
      <div className="login-right">
        <img src={loginImage} alt="Education Logo" />
      </div>
    </div>
  );
};
export default Login;
