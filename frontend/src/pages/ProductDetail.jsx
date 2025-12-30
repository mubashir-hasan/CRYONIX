import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductRating from "../components/star/ProductRating";
import './css/ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/product/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    if (!product) {
        return (
            <div className="loading-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p className="loading-text">Loading Product...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="product-detail-page">
            <div className="breadcrumb-section">
                <button onClick={() => navigate('/product')} className="breadcrumb-link">
                    <i className="bi bi-arrow-left"></i> Back to Products
                </button>
            </div>

            <div className="product-detail-container">
                <div className="product-detail-grid">
                    <div className="product-gallery">
                        <div className="main-image-wrapper">
                            <img
                                src={`http://localhost:5000/${product.image_url}`}
                                alt={product.name}
                                className="main-product-image"
                            />
                            <button className="wishlist-btn-detail">
                                <i className="bi bi-heart"></i>
                            </button>
                            {product.stock > 0 && product.stock < 10 && (
                                <span className="stock-badge">Only {product.stock} left!</span>
                            )}
                        </div>
                    </div>

                    <div className="product-info-detail">
                        <div className="product-header-detail">
                            <h1 className="product-title-detail">{product.name}</h1>
                            <div className="product-meta-row">
                                <ProductRating rating={2.9} />
                                <span className="reviews-count">(128 reviews)</span>
                                <span className="sku-text">SKU: {product.sku}</span>
                            </div>
                        </div>

                        <div className="price-section-detail">
                            <div className="price-main">
                                <span className="current-price">Rs {product.price}</span>
                                <span className="original-price">Rs {Math.round(product.price * 1.2)}</span>
                                <span className="discount-badge">17% OFF</span>
                            </div>
                        </div>

                        <div className="availability-section">
                            {product.stock > 0 ? (
                                <div className="in-stock">
                                    <i className="bi bi-check-circle-fill"></i>
                                    <span>In Stock</span>
                                </div>
                            ) : (
                                <div className="out-of-stock">
                                    <i className="bi bi-x-circle-fill"></i>
                                    <span>Out of Stock</span>
                                </div>
                            )}
                        </div>

                        <div className="quick-features">
                            <div className="feature-item">
                                <i className="bi bi-truck"></i>
                                <span>Free Delivery</span>
                            </div>
                            <div className="feature-item">
                                <i className="bi bi-arrow-repeat"></i>
                                <span>30 Days Return</span>
                            </div>
                            <div className="feature-item">
                                <i className="bi bi-shield-check"></i>
                                <span>Warranty</span>
                            </div>
                        </div>

                        <div className="quantity-section-detail">
                            <label className="quantity-label">Quantity:</label>
                            <div className="quantity-controls">
                                <button
                                    className="qty-btn"
                                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                    disabled={quantity <= 1}
                                >
                                    <i className="bi bi-dash"></i>
                                </button>
                                <input
                                    type="number"
                                    className="qty-input"
                                    value={quantity}
                                    readOnly
                                />
                                <button
                                    className="qty-btn"
                                    onClick={() => setQuantity(quantity + 1)}
                                    disabled={quantity >= product.stock}
                                >
                                    <i className="bi bi-plus"></i>
                                </button>
                            </div>
                            <span className="stock-info">{product.stock} available</span>
                        </div>

                        <div className="action-buttons-detail">
                            <button className="btn-add-cart-detail">
                                <i className="bi bi-cart-plus"></i>
                                Add to Cart
                            </button>
                            <button className="btn-buy-now-detail">
                                <i className="bi bi-lightning-fill"></i>
                                Buy Now
                            </button>
                        </div>

                        <div className="additional-info">
                            <div className="info-item">
                                <i className="bi bi-credit-card"></i>
                                <span>Secure payment methods</span>
                            </div>
                            <div className="info-item">
                                <i className="bi bi-headset"></i>
                                <span>24/7 Customer support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="product-tabs-section">
                <div className="tabs-header">
                    <button
                        className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                        onClick={() => setActiveTab('description')}
                    >
                        Description
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('specifications')}
                    >
                        Specifications
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        Reviews (128)
                    </button>
                </div>

                <div className="tabs-content">
                    {activeTab === 'description' && (
                        <div className="tab-panel">
                            <h3>Product Description</h3>
                            <p>{product.description || "Discover this amazing product that combines quality, style, and functionality. Perfect for your everyday needs."}</p>
                        </div>
                    )}
                    {activeTab === 'specifications' && (
                        <div className="tab-panel">
                            <h3>Specifications</h3>
                            <ul className="specs-list">
                                <li><strong>SKU:</strong> {product.sku}</li>
                                <li><strong>Stock:</strong> {product.stock} units</li>
                                <li><strong>Category:</strong> Electronics</li>
                                <li><strong>Weight:</strong> 500g</li>
                            </ul>
                        </div>
                    )}
                    {activeTab === 'reviews' && (
                        <div className="tab-panel">
                            <h3>Customer Reviews</h3>
                            <div className="review-item">
                                <div className="review-header">
                                    <strong>John Doe</strong>
                                    <ProductRating rating={5} />
                                </div>
                                <p>Amazing product! Highly recommend.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;