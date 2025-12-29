import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-outside rounded-4 mt-5 mb-3">
            <div className="container-fluid footer-main">
                {/* Top Section */}
                <div className="row footer-top py-4">
                    {/* Brand/Logo Section */}
                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <Link to="/" className="footer-brand d-inline-block mb-3">
                            <img
                                src={`http://localhost:3000/logo.svg`}
                                alt="Logo"
                                width={130}
                                className="footer-logo"
                            />
                        </Link>
                        <p className="footer-description">
                            Building the future with cutting-edge technology and innovative solutions.
                        </p>
                        {/* Social Links */}
                        <div className="social-links mt-3">
                            <a href="#" className="social-link" aria-label="Facebook">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="#" className="social-link" aria-label="Twitter">
                                <i className="bi bi-twitter-x"></i>
                            </a>
                            <a href="#" className="social-link" aria-label="Instagram">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="#" className="social-link" aria-label="LinkedIn">
                                <i className="bi bi-linkedin"></i>
                            </a>
                            <a href="#" className="social-link" aria-label="GitHub">
                                <i className="bi bi-github"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
                        <h5 className="footer-heading">Quick Links</h5>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/product">Product</Link></li>
                            <li><Link to="/services">Services</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
                        <h5 className="footer-heading">Resources</h5>
                        <ul className="footer-links">
                            <li><Link to="/docs">Documentation</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/support">Support</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-lg-4 col-md-6">
                        <h5 className="footer-heading">Stay Connected</h5>
                        <p className="footer-text mb-3">
                            Subscribe to our newsletter for updates and news.
                        </p>
                        <div className="newsletter-form">
                            <input
                                type="email"
                                className="form-control newsletter-input"
                                placeholder="Enter your email"
                                aria-label="Email for newsletter"
                            />
                            <button className="btn btn-newsletter" type="button">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="footer-divider"></div>

                {/* Bottom Section */}
                <div className="row footer-bottom py-3">
                    <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
                        <p className="footer-copyright mb-0">
                            © {currentYear} CRYONIX. All rights reserved.
                        </p>
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <Link to="/privacy" className="footer-legal-link">Privacy Policy</Link>
                        <span className="footer-separator">•</span>
                        <Link to="/terms" className="footer-legal-link">Terms of Service</Link>
                        <span className="footer-separator">•</span>
                        <Link to="/cookies" className="footer-legal-link">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;