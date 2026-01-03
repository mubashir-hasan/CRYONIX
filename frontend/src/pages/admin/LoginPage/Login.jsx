import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';


function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch('http://localhost:5000/api/admin/admin_login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();
            const token = data.accessToken;

            if (data.status) {
                login({
                    token: token,
                    user: data.admin,
                    authType: "admin"
                });
                toast.success("Login successful 🎉");
                navigate('/admin/dashboard', { replace: true });
            } else {
                setError(data.message || "Login failed. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-page'>
            <div className='login-container-modern'>
                <div className='login-card'>
                    {/* Header */}
                    <div className='login-header'>
                        <h1 className='login-title'>
                            Welcome Back<span className='text-gradient'> Admin</span>
                        </h1>
                        <p className='login-subtitle'>
                            Sign in to access your account
                        </p>
                    </div>

                    {error && (
                        <div className='error-message'>
                            <i className="bi bi-exclamation-circle"></i>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className='login-form'>
                        <div className='form-group-modern'>
                            <label className='form-label-modern' htmlFor='email'>
                                Email Address
                            </label>
                            <div className='input-wrapper'>
                                <i className="bi bi-envelope input-icon"></i>
                                <input
                                    type='email'
                                    id='email'
                                    className='form-input-modern'
                                    placeholder='example@email.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className='form-group-modern'>
                            <label className='form-label-modern' htmlFor='password'>
                                Password
                            </label>
                            <div className='input-wrapper'>
                                <i className="bi bi-lock input-icon"></i>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id='password'
                                    className='form-input-modern'
                                    placeholder='Enter your password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type='button'
                                    className='password-toggle'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        {/* Remember & Forgot */}
                        <div className='form-options'>
                            <label className='remember-checkbox'>
                                <input type='checkbox' />
                                <span>Remember me</span>
                            </label>
                            <a href='#' className='forgot-link'>
                                Forgot Password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            className='btn-login-modern'
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className='btn-spinner'></span>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <i className="bi bi-arrow-right"></i>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;