import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './data';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = loginUser(formData.email, formData.password);

        if (!user) {
            alert("Invalid email or password");
            return;
        }

        alert("Login successful!");
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('customerName', user.name || 'Customer');

        switch (user.role?.toLowerCase()) {
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
                alert("Unknown user role: " + user.role);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label className="un">Email:</label>
                    <input
                        type="email" name="email" placeholder="Your Email"
                        value={formData.email} onChange={handleChange}
                        className="input-field" required
                    />

                    <label className="un">Password:</label>
                    <input
                        type="password" name="password" placeholder="Password"
                        value={formData.password} onChange={handleChange}
                        className="input-field" required
                    />

                    <button type="submit" className="submit-btn">Login</button>

                    <button type="button" className="submit-btn" style={{ marginTop: '15px' }}
                        onClick={() => navigate('/signup')}>
                        Signup
                    </button>

                    <p style={{ marginTop: '10px', textAlign: 'center' }}>
                        <button type="button" onClick={() => navigate('/forgot-password')}
                            style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.95rem' }}>
                            Forgot Password?
                        </button>
                    </p>

                    <div style={{ marginTop: '20px', padding: '12px', background: '#f0fdf4', borderRadius: '8px', fontSize: '0.85rem', color: '#166534' }}>
                        <strong>Demo Accounts:</strong><br />
                        Admin: admin@jsnstores.com / admin123<br />
                        Manager: manager@jsnstores.com / manager123<br />
                        Customer: customer@jsnstores.com / customer123
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
