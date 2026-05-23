import axios from "axios";
import React, { useState } from "react";
import './SignUpPage.css';
import config from "./config";

export default function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "",
        phno: ""  // New field for phno number
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = () => {
        const { username, email, password, role, phno } = formData;

        if (!username || !email || !password || !role || !phno) {
            alert("All fields are required.");
            return;
        }

        axios.post(`${config.url}/api/signup`, {
            username,
            email,
            password,
            role,
            phno
        })
        .then((res) => alert("Signup successful!"))
        .catch((err) => {
            console.error("Signup error:", err);
            alert(`Error: ${err.response?.data || err.message}`);
        });
    };

    return (
        <div className="signup-container">
            <h2>Signup Form</h2>
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </label>
            <label>
                Phone:
                <input
                    type="tel"
                    name="phno"
                    value={formData.phno}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </label>
            <label>
                Role:
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Customer">Customer</option>
                </select>
            </label>
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    );
}
