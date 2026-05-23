import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { checkEmail, resetPassword } from './data';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1 = email, 2 = new password
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleCheckEmail = (e) => {
        e.preventDefault();
        if (checkEmail(email)) {
            setStep(2);
            setMessage('');
        } else {
            setMessage('No account found with this email.');
        }
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (newPassword.length < 4) {
            setMessage('Password must be at least 4 characters.');
            return;
        }
        const success = resetPassword(email, newPassword);
        if (success) {
            alert('Password reset successfully! Please login with your new password.');
            navigate('/login');
        } else {
            setMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Forgot Password</h2>

                {step === 1 && (
                    <form onSubmit={handleCheckEmail}>
                        <label className="un">Enter your email:</label>
                        <input
                            type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field" required
                        />
                        <button type="submit" className="submit-btn">Verify Email</button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleResetPassword}>
                        <label className="un">Enter new password:</label>
                        <input
                            type="password" value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="input-field" required
                        />
                        <button type="submit" className="submit-btn">Reset Password</button>
                    </form>
                )}

                {message && <p style={{ marginTop: '15px', color: step === 1 ? 'red' : 'green' }}>{message}</p>}

                <p style={{ marginTop: '15px', textAlign: 'center' }}>
                    <button type="button" onClick={() => navigate('/login')}
                        style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>
                        Back to Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
