import React from 'react';
import './css/About.css';

const About = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Welcome to <span className="gradient-text">CRYONIX</span>
                        </h1>
                        <p className="hero-subtitle">
                            Your Premier Destination for Cutting-Edge Electronics, Fashion, Home Essentials & Sports Gear
                        </p>
                        <p className="hero-description">
                            Launched in 2025, CRYONIX is more than just an e-commerce platform — it's a curated experience designed for the modern shopper who demands quality, innovation, and seamless style.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="about-section">
                <div className="container">
                    <div className="grid two-columns">
                        <div className="glass-card mission-card">
                            <h2>Our Mission</h2>
                            <p>
                                To deliver exceptional products with unmatched convenience, empowering customers to discover, explore, and own the latest trends across electronics, fashion, home & living, and sports — all backed by secure shopping, fast delivery, and dedicated support.
                            </p>
                        </div>
                        <div className="glass-card vision-card">
                            <h2>Our Vision</h2>
                            <p>
                                To become the leading futuristic e-commerce destination where technology meets lifestyle, redefining online shopping with innovative design, personalized experiences, and a commitment to sustainability and customer satisfaction.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us / Key Values */}
            <section className="about-section values-section">
                <div className="container">
                    <h2 className="section-title text-center">Why Choose CRYONIX?</h2>
                    <div className="grid four-columns">
                        <div className="value-card">
                            <div className="value-icon">🚀</div>
                            <h3>Fast & Free Shipping</h3>
                            <p>Enjoy free delivery on all orders with lightning-fast processing.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">🔒</div>
                            <h3>Secure Payments</h3>
                            <p>Shop with confidence using encrypted, industry-leading payment gateways.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">↩️</div>
                            <h3>Easy Returns</h3>
                            <p>Hassle-free 30-day return policy for complete peace of mind.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">🕒</div>
                            <h3>24/7 Support</h3>
                            <p>Our dedicated team is always here to help, anytime you need.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="about-section stats-section">
                <div className="container">
                    <div className="grid four-columns stats-grid">
                        <div className="stat-item">
                            <h3 className="stat-number">50K+</h3>
                            <p>Happy Customers</p>
                        </div>
                        <div className="stat-item">
                            <h3 className="stat-number">550+</h3>
                            <p>Premium Products</p>
                        </div>
                        <div className="stat-item">
                            <h3 className="stat-number">4.9★</h3>
                            <p>Average Rating</p>
                        </div>
                        <div className="stat-item">
                            <h3 className="stat-number">2025</h3>
                            <p>Founded</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Explore?</h2>
                        <p>Join thousands of satisfied shoppers and start your journey with CRYONIX today.</p>
                        <a href="/" className="primary-btn large">Shop Now</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;