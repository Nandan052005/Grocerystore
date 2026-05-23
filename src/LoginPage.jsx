import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import config from './config';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${config.url}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                alert("Login successful!");
                console.log("User:", data);

                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('customerName', data.name || 'Customer');

                switch (data.role?.toLowerCase()) {
                    case 'admin':
                        navigate('/admindashboard');
                        break;
                    case 'manager':
                        navigate('/managerdashboard');
                        break;
                    case 'customer':
                        navigate('/customerdashboard');
                        break;
                    default:
                        alert("Unknown user role: " + data.role);
                }
            } else if (response.status === 401) {
                alert("Invalid email or password");
            } else {
                const errText = await response.text();
                console.error("Error response:", errText);
                alert("Server error: " + errText);
            }

        } catch (error) {
            console.error("Network or server error:", error);
            alert("Network error or server is down");
        }
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password'); // ✅ Updated path
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label className="un">Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />

                    <label className="un">Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input-field"
                        required
                    />

                    <button type="submit" className="submit-btn">Login</button>

                    <button
                        type="button"
                        className="submit-btn"
                        style={{ marginTop: '15px' }}
                        onClick={() => navigate('/signup')}
                    >
                        Signup
                    </button>

                    <p style={{ marginTop: '10px', textAlign: 'center' }}>
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'blue',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                fontSize: '0.95rem'
                            }}
                        >
                            Forgot Password?
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
