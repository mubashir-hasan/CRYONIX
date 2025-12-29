import React from 'react';
import { Link } from 'react-router-dom';
import './css/Home.css';
import '../App.css';

function Home() {
    const featuredProducts = [
        {
            id: 1,
            name: "Premium Wireless Headphones",
            price: 299.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
            badge: "Best Seller"
        },
        {
            id: 2,
            name: "Smart Watch Pro",
            price: 399.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
            badge: "New"
        },
        {
            id: 3,
            name: "Mechanical Keyboard",
            price: 159.99,
            image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop",
            badge: "Sale"
        },
        {
            id: 4,
            name: "4K Action Camera",
            price: 449.99,
            image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
            badge: "Hot"
        }
    ];

    const categories = [
        { name: "Electronics", icon: "bi-laptop", count: "150+" },
        { name: "Fashion", icon: "bi-bag", count: "200+" },
        { name: "Home & Living", icon: "bi-house", count: "120+" },
        { name: "Sports", icon: "bi-trophy", count: "80+" }
    ];

    return (
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-text">
                        <span className="hero-badge">New Collection 2025</span>
                        <h1 className="hero-title">
                            Discover Amazing
                            <span className="text-gradient"> Products</span>
                        </h1>
                        <p className="hero-description">
                            Shop the latest trends in technology, fashion, and lifestyle.
                            Premium quality, unbeatable prices.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/product" className="btn btn-hero-primary">
                                Shop Now
                                <i className="bi bi-arrow-right ms-2"></i>
                            </Link>
                            <Link to="/about" className="btn btn-hero-secondary">
                                Learn More
                            </Link>
                        </div>
                    </div>
                    <div className="hero-image">
                        <div className="hero-image-wrapper">
                            <img
                                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop"
                                alt="Featured Product"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section">
                <div className="section-header">
                    <h2 className="section-title">Shop by Category</h2>
                    <p className="section-subtitle">Explore our wide range of products</p>
                </div>
                <div className="categories-grid">
                    {categories.map((category, index) => (
                        <div key={index} className="category-card">
                            <div className="category-icon">
                                <i className={`bi ${category.icon}`}></i>
                            </div>
                            <h3 className="category-name">{category.name}</h3>
                            <p className="category-count">{category.count} Products</p>
                            <Link to="/product" className="category-link">
                                Browse <i className="bi bi-arrow-right"></i>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="products-section">
                <div className="section-header">
                    <h2 className="section-title">Featured Products</h2>
                    <p className="section-subtitle">Hand-picked items just for you</p>
                </div>
                <div className="products-grid">
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-image-wrapper">
                                <span className="product-badge">{product.badge}</span>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <div className="product-overlay">
                                    <button className="btn-quick-view">
                                        <i className="bi bi-eye"></i> Quick View
                                    </button>
                                </div>
                            </div>
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <div className="product-rating">
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-half"></i>
                                    <span className="rating-count">(4.5)</span>
                                </div>
                                <div className="product-footer">
                                    <span className="product-price">${product.price}</span>
                                    <button className="btn-add-cart">
                                        <i className="bi bi-cart-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-5">
                    <Link to="/product" className="btn btn-view-all">
                        View All Products
                        <i className="bi bi-arrow-right ms-2"></i>
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="features-grid">
                    <div className="feature-item">
                        <div className="feature-icon">
                            <i className="bi bi-truck"></i>
                        </div>
                        <h3 className="feature-title">Free Shipping</h3>
                        <p className="feature-text">On orders over $50</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">
                            <i className="bi bi-shield-check"></i>
                        </div>
                        <h3 className="feature-title">Secure Payment</h3>
                        <p className="feature-text">100% protected</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">
                            <i className="bi bi-arrow-repeat"></i>
                        </div>
                        <h3 className="feature-title">Easy Returns</h3>
                        <p className="feature-text">30-day return policy</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">
                            <i className="bi bi-headset"></i>
                        </div>
                        <h3 className="feature-title">24/7 Support</h3>
                        <p className="feature-text">Always here to help</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2 className="cta-title">Join Our Newsletter</h2>
                    <p className="cta-text">
                        Get exclusive deals and updates delivered to your inbox
                    </p>
                    <div className="cta-form">
                        <input
                            type="email"
                            className="cta-input"
                            placeholder="Enter your email"
                        />
                        <button className="btn-cta">Subscribe</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;