import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartSidebar.css';

function CartSidebar({ isOpen, onClose }) {
    const [cartProducts, setCartProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            fetchCartProducts();
        }
    }, [isOpen]);

    const fetchCartProducts = () => {
        // Mock data - replace with actual API call
        const mockCart = [
            {
                id: 1,
                name: 'Wireless Headphones',
                price: 299,
                quantity: 1,
                image_url: 'uploads/product1.jpg',
                stock: 10
            },
            {
                id: 2,
                name: 'Smart Watch',
                price: 399,
                quantity: 2,
                image_url: 'uploads/product2.jpg',
                stock: 15
            }
        ];
        setCartProducts(mockCart);
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setCartProducts(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeFromCart = (productId) => {
        setCartProducts(prev => prev.filter(item => item.id !== productId));
    };

    const calculateSubtotal = () => {
        return cartProducts.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleViewFullCart = () => {
        onClose();
        navigate('/cart');
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`cart-sidebar-overlay ${isOpen ? 'active' : ''}`}
                onClick={onClose}
            ></div>

            {/* Sidebar */}
            <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
                {/* Header */}
                <div className="cart-sidebar-header">
                    <h3>Shopping Cart</h3>
                    <button className="close-btn" onClick={onClose}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                {/* Items */}
                <div className="cart-sidebar-items">
                    {cartProducts.length === 0 ? (
                        <div className="empty-cart-sidebar">
                            <i className="bi bi-cart-x"></i>
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        cartProducts.map(item => (
                            <div key={item.id} className="cart-sidebar-item">
                                <img
                                    src={`http://localhost:5000/${item.image_url}`}
                                    alt={item.name}
                                    className="item-image"
                                />
                                <div className="item-details">
                                    <h4>{item.name}</h4>
                                    <p className="item-price">Rs {item.price}</p>
                                    <div className="item-quantity">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <i className="bi bi-dash"></i>
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            disabled={item.quantity >= item.stock}
                                        >
                                            <i className="bi bi-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cartProducts.length > 0 && (
                    <div className="cart-sidebar-footer">
                        <div className="subtotal-row">
                            <span>Subtotal:</span>
                            <span className="subtotal-amount">Rs {calculateSubtotal()}</span>
                        </div>
                        <button className="btn-view-cart" onClick={handleViewFullCart}>
                            View Full Cart
                        </button>
                        <button className="btn-checkout-sidebar">
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default CartSidebar;