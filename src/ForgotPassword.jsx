import React, { useState } from 'react';
import './LoginPage.css';
import config from './config';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${config.url}/api/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await res.text();
            setMessage(data);
        } catch (error) {
            console.error("Error:", error);
            setMessage("Something went wrong.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <label className="un">Enter your email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                        required
                    />
                    <button type="submit" className="submit-btn">Send Reset Link</button>
                    {message && <p style={{ marginTop: '15px', color: 'green' }}>{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
