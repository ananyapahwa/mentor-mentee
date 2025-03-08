import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import OTPVerification from "./pages/otpVerification";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
      </Routes>
    </Router>
  );
}

export default App;
