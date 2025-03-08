import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OTPVerification.css";

const OTPVerification = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [error, setError] = useState("");
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus(); // Auto-focus first box
        }
    }, []);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return; // Allow only numbers

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Store only one digit
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
          // Retrieve email from state or localStorage
        const email = location.state?.email || localStorage.getItem("email");

        console.log("Stored email:", email); // Debugging
        e.preventDefault();
        const enteredOtp = otp.join("");

        if (enteredOtp.length !== 6) {
            setError("OTP must be 6 digits long");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email, // Make sure email is stored
                    otp: enteredOtp
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("OTP Verified Successfully!");
                navigate("/dashboard"); // Redirect on success
            } else {
                setError(data.message || "Invalid OTP. Try again!");
            }
        } catch (error) {
            console.log(error);
            setError("Something went wrong! Try again.");
        }
    };

    return (
        <div className="otp-form">
            <h2>Verify Your Email</h2>

            <form onSubmit={handleSubmit}>
                <div className="otp-inputs">
                    {otp.map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            ref={(el) => (inputRefs.current[index] = el)}
                            value={otp[index]}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    ))}
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit">Verify OTP</button>
            </form>
        </div>
    );
};

export default OTPVerification;
