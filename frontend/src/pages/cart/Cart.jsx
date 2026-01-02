import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
    const [cartProducts, setCartProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCartProducts();
    }, []);

    const fetchCartProducts = () => {
        axios.get('http://localhost:5000/api/cart/cartproducts')
            .then(res => {
                if (res.data.status) {
                    setCartProducts(res.data.products);
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;

        // Update locally first for better UX
        setCartProducts(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );

        // Then update on server
        axios.put(`http://localhost:5000/api/cart/update/${productId}`, { quantity: newQuantity })
            .catch(err => {
                console.log(err);
                fetchCartProducts(); // Refetch if update fails
            });
    };

    const removeFromCart = (productId) => {
        axios.delete(`http://localhost:5000/api/cart/remove/${productId}`)
            .then(res => {
                if (res.data.status) {
                    setCartProducts(prev => prev.filter(item => item.id !== productId));
                }
            })
            .catch(err => console.log(err));
    };

    const calculateSubtotal = () => {
        return cartProducts.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * 0.1; // 10% tax
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax();
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p className="loading-text">Loading Cart...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                {/* Header */}
                <div className="cart-header">
                    <button onClick={() => navigate('/product')} className="back-btn">
                        <i className="bi bi-arrow-left"></i> Continue Shopping
                    </button>
                    <h1 className="cart-title">
                        Shopping <span className="text-gradient">Cart</span>
                    </h1>
                    <p className="cart-subtitle">
                        {cartProducts.length} {cartProducts.length === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                {cartProducts.length === 0 ? (
                    /* Empty Cart */
                    <div className="empty-cart">
                        <div className="empty-cart-icon">
                            <i className="bi bi-cart-x"></i>
                        </div>
                        <h2>Your Cart is Empty</h2>
                        <p>Add some products to get started!</p>
                        <button
                            className="btn-shop-now"
                            onClick={() => navigate('/product')}
                        >
                            <i className="bi bi-bag"></i>
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="row g-4">
                        {/* Cart Items */}
                        <div className="col-lg-8">
                            <div className="cart-items-container">
                                {cartProducts.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-image">
                                            <img
                                                src={`http://localhost:5000/${item.image_url}`}
                                                alt={item.name}
                                            />
                                        </div>

                                        <div className="cart-item-details">
                                            <h3 className="cart-item-name">{item.name}</h3>
                                            <p className="cart-item-description">
                                                {item.description || 'Premium quality product'}
                                            </p>
                                            <div className="cart-item-meta">
                                                <span className="item-sku">SKU: {item.sku}</span>
                                                {item.stock < 10 && (
                                                    <span className="item-stock-warning">
                                                        <i className="bi bi-exclamation-circle"></i>
                                                        Only {item.stock} left
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="cart-item-actions">
                                            <div className="quantity-controls-cart">
                                                <button
                                                    className="qty-btn-cart"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <i className="bi bi-dash"></i>
                                                </button>
                                                <span className="qty-display">{item.quantity}</span>
                                                <button
                                                    className="qty-btn-cart"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    disabled={item.quantity >= item.stock}
                                                >
                                                    <i className="bi bi-plus"></i>
                                                </button>
                                            </div>

                                            <div className="cart-item-price">
                                                <span className="price-label">Price:</span>
                                                <span className="price-value">Rs {item.price}</span>
                                            </div>

                                            <div className="cart-item-total">
                                                <span className="total-label">Total:</span>
                                                <span className="total-value">
                                                    Rs {(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>

                                            <button
                                                className="btn-remove"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="col-lg-4">
                            <div className="order-summary">
                                <h3 className="summary-title">Order Summary</h3>

                                <div className="summary-row">
                                    <span>Subtotal ({cartProducts.length} items)</span>
                                    <span>Rs {calculateSubtotal().toFixed(2)}</span>
                                </div>

                                <div className="summary-row">
                                    <span>Shipping</span>
                                    <span className="free-badge">FREE</span>
                                </div>

                                <div className="summary-row">
                                    <span>Tax (10%)</span>
                                    <span>Rs {calculateTax().toFixed(2)}</span>
                                </div>

                                <div className="summary-divider"></div>

                                <div className="summary-total">
                                    <span>Total</span>
                                    <span>Rs {calculateTotal().toFixed(2)}</span>
                                </div>

                                <button className="btn-checkout">
                                    <i className="bi bi-credit-card"></i>
                                    Proceed to Checkout
                                </button>

                                <div className="promo-code">
                                    <input
                                        type="text"
                                        placeholder="Enter promo code"
                                        className="promo-input"
                                    />
                                    <button className="btn-apply">Apply</button>
                                </div>

                                <div className="trust-badges">
                                    <div className="trust-item">
                                        <i className="bi bi-shield-check"></i>
                                        <span>Secure Payment</span>
                                    </div>
                                    <div className="trust-item">
                                        <i className="bi bi-truck"></i>
                                        <span>Free Shipping</span>
                                    </div>
                                    <div className="trust-item">
                                        <i className="bi bi-arrow-repeat"></i>
                                        <span>Easy Returns</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;