import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Signup.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UserSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    address: '',
    phone_no: '',
    gender: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.dob || !formData.phone_no || !formData.gender || !formData.address) {
      setError('Please fill in all required fields');
      return false;
    }
    if (formData.phone_no.length < 10) {
      setError('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setLoading(true);
    setError('');

    try {
      const { confirmPassword, ...signupData } = formData;

      const response = await fetch('http://localhost:5000/api/user/user_register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      });

      const data = await response.json();

      if (data.status) {
        toast.success("Login successful 🎉");
        navigate('/user/user_login', { replace: true });
      } else {
        setError(data.message || 'Signup failed. Please try again.');
        toast.error("Signup failed. Please try again !!!");
        
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      toast.error("Signup failed. Please try again !!!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
            <div className="signup-card">
              {/* Header */}
              <div className="signup-header text-center">
                <div className="logo-circle mx-auto mb-4">
                  <i className="bi bi-person-plus"></i>
                </div>
                <h1 className="signup-title">
                  Create <span className="text-gradient">Account</span>
                </h1>
                <p className="signup-subtitle">
                  {step === 1 ? 'Step 1: Account Information' : 'Step 2: Personal Details'}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="progress-container mb-4">
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: step === 1 ? '50%' : '100%' }}
                  ></div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <span className={`step-label ${step >= 1 ? 'active' : ''}`}>Account Info</span>
                  <span className={`step-label ${step >= 2 ? 'active' : ''}`}>Personal Details</span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <i className="bi bi-exclamation-circle me-2"></i>
                  <div>{error}</div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNext(); } : handleSubmit}>
                {step === 1 ? (
                  <>
                    {/* Step 1: Account Information */}
                    <div className="row g-3">
                      {/* Full Name */}
                      <div className="col-12">
                        <label className="form-label-modern">Full Name *</label>
                        <div className="input-group-modern">
                          <i className="bi bi-person input-icon"></i>
                          <input
                            type="text"
                            name="name"
                            className="form-control form-input-modern"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="col-12">
                        <label className="form-label-modern">Email Address *</label>
                        <div className="input-group-modern">
                          <i className="bi bi-envelope input-icon"></i>
                          <input
                            type="email"
                            name="email"
                            className="form-control form-input-modern"
                            placeholder="example@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div className="col-12 col-md-6">
                        <label className="form-label-modern">Password *</label>
                        <div className="input-group-modern">
                          <i className="bi bi-lock input-icon"></i>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            className="form-control form-input-modern"
                            placeholder="Create password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div className="col-12 col-md-6">
                        <label className="form-label-modern">Confirm Password *</label>
                        <div className="input-group-modern">
                          <i className="bi bi-lock-fill input-icon"></i>
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            className="form-control form-input-modern"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Next Button */}
                    <button type="submit" className="btn btn-signup-modern w-100 mt-4">
                      Continue
                      <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  </>
                ) : (
                  <>
                    {/* Step 2: Personal Details */}
                    <div className="row g-3">
                      {/* Date of Birth */}
                      <div className="col-12 col-md-6">
                        <label className="form-label-modern">Date of Birth *</label>
                        <div className="input-group-modern">
                          <i className="bi bi-calendar input-icon"></i>
                          <input
                            type="date"
                            name="dob"
                            className="form-control form-input-modern"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div className="col-12 col-md-6">
                        <label className="form-label-modern">Phone Number *</label>
                        <div className="input-group-modern">
                          <i className="bi bi-telephone input-icon"></i>
                          <input
                            type="tel"
                            name="phone_no"
                            className="form-control form-input-modern"
                            placeholder="Enter phone number"
                            value={formData.phone_no}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Gender */}
                      <div className="col-12">
                        <label className="form-label-modern">Gender *</label>
                        <div className="gender-options">
                          <div className="form-check gender-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="male"
                              value="male"
                              checked={formData.gender === 'male'}
                              onChange={handleChange}
                              required
                            />
                            <label className="form-check-label" htmlFor="male">
                              <i className="bi bi-gender-male"></i> Male
                            </label>
                          </div>
                          <div className="form-check gender-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="female"
                              value="female"
                              checked={formData.gender === 'female'}
                              onChange={handleChange}
                              required
                            />
                            <label className="form-check-label" htmlFor="female">
                              <i className="bi bi-gender-female"></i> Female
                            </label>
                          </div>
                          <div className="form-check gender-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="other"
                              value="other"
                              checked={formData.gender === 'other'}
                              onChange={handleChange}
                              required
                            />
                            <label className="form-check-label" htmlFor="other">
                              <i className="bi bi-gender-ambiguous"></i> Other
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="col-12">
                        <label className="form-label-modern">Address *</label>
                        <div className="input-group-modern">
                          <i className="bi bi-geo-alt input-icon"></i>
                          <textarea
                            name="address"
                            className="form-control form-input-modern"
                            placeholder="Enter your address"
                            rows="3"
                            value={formData.address}
                            onChange={handleChange}
                            required
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex gap-3 mt-4">
                      <button
                        type="button"
                        className="btn btn-back-modern"
                        onClick={handleBack}
                      >
                        <i className="bi bi-arrow-left me-2"></i>
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn btn-signup-modern flex-grow-1"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Creating Account...
                          </>
                        ) : (
                          <>
                            Create Account
                            <i className="bi bi-check-circle ms-2"></i>
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </form>

              {/* Footer */}
              <div className="signup-footer text-center mt-4 pt-4">
                <p className="mb-0">
                  Already have an account?{" "}
                  <Link to="/user/user_login" className="signup-link">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;