import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../admin/LoginPage/Login.css';
import { Link } from 'react-router-dom';

function UserLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch('http://localhost:5000/api/user/user_login', {
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

            if (data.status) {
                localStorage.setItem('accessToken', data.token);
                toast.success("Login successful 🎉");
                navigate('/user/products', { replace: true });
            } else {
                setError(data.message || "Login failed. Please try again.");
                toast.error("Login failed. Please try again !!!");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            toast.error("Login failed. Please try again !!!");
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
                            Welcome <span className='text-gradient'>Back</span>
                        </h1>
                        <p className='login-subtitle'>
                            Sign in to access your account
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className='error-message'>
                            <i className="bi bi-exclamation-circle"></i>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className='login-form'>
                        {/* Email Field */}
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

                    {/* Footer */}
                    <div className='login-footer'>
                        <p>
                            Don't have an account?{' '}
                            <Link to="/user/user_signup" className="signup-link">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserLogin;