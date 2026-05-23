import React, { useState } from "react";
import './SignUpPage.css';
import { useNavigate } from "react-router-dom";
import { signupUser } from "./data";

export default function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        phno: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = () => {
        const { name, email, password, role, phno } = formData;

        if (!name || !email || !password || !role || !phno) {
            alert("All fields are required.");
            return;
        }

        try {
            signupUser({ name, email, password, role, phno });
            alert("Signup successful! Please login.");
            navigate("/login");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup Form</h2>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <label>
                Phone:
                <input type="tel" name="phno" value={formData.phno} onChange={handleChange} pattern="[0-9]{10}" />
            </label>
            <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </label>
            <label>
                Role:
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="">Select Role</option>
                    <option value="Customer">Customer</option>
                    <option value="Manager">Manager</option>
                </select>
            </label>
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    );
}
