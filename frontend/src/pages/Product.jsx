import { useState, useEffect } from "react";
import './css/Product.css';
import { useNavigate } from "react-router-dom";
import ProductRating from "../components/star/ProductRating";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // useEffect(() => {
    //     fetch('http://localhost:5000/api/products')
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.status) {
    //                 setProducts(data.products);
    //                 setLoading(false);
    //             }
    //         })
    //         .catch(error => {
    //             console.log('Something Went Wrong', error);
    //             setLoading(false);
    //         });
    // }, []);

    useEffect(() => {fetchProducts()},[filter]);

    const fetchProducts = async () => {
        setLoading(true);

        let fetchProductsUrl = 'http://localhost:5000/api/products';
        if (filter === 'featured') {
            fetchProductsUrl += '/featured';
        } else if (filter === 'new') {
            fetchProductsUrl += '/new_products';
        }

        try {
            const res = await fetch(fetchProductsUrl);
            const data = await res.json();

            if (data.status && Array.isArray(data.products)) {
                setProducts(data.products);
            } else {
                setProducts([]);
                console.error("No products returned from API:", data);
            }
        } catch (error) {
            console.error('Something went wrong', error);
            toast.error('Failed to fetch products. Please try again later !!!');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };


    const filteredProducts = (products || []).filter(product =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p className="loading-text">Loading Products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="product-page">
            {/* Header Section */}
            <div className="product-header">
                <div className="header-content">
                    <h1 className="page-title">
                        Our <span className="text-gradient">Products</span>
                    </h1>
                    <p className="page-subtitle">
                        Discover amazing products at unbeatable prices
                    </p>
                </div>
            </div>

            <div className="product-controls">
                <div className="search-wrapper">
                    <i className="bi bi-search search-icon"></i>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="filter-buttons">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All Products
                    </button>
                    <button
                        className={`filter-btn ${filter === 'featured' ? 'active' : ''}`}
                        onClick={() => setFilter('featured')}
                    >
                        Featured
                    </button>
                    <button
                        className={`filter-btn ${filter === 'new' ? 'active' : ''}`}
                        onClick={() => setFilter('new')}
                    >
                        New Arrivals
                    </button>
                </div>
            </div>

            {/* Products Grid */}
            <div className="products-container">
                {filteredProducts.length === 0 ? (
                    <div className="no-products">
                        <i className="bi bi-inbox"></i>
                        <h3>No Products Found</h3>
                        <p>Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="products-grid-page">
                        {filteredProducts.map((product) => (
                            <div
                                className="product-card-modern"
                                key={product.id}
                                onClick={() => navigate(`/product/${product.id}`)}
                            >
                                <div className="product-image-container">
                                    <img
                                        src={`http://localhost:5000/${product.image_url}`}
                                        className="product-image-modern"
                                        alt={product.name}
                                    />
                                    <div className="product-overlay-modern">
                                        <button className="btn-quick-view-modern">
                                            <i className="bi bi-eye"></i> View Details
                                        </button>
                                    </div>
                                    <div className="product-wishlist">
                                        <button className="btn-wishlist">
                                            <i className="bi bi-heart"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="product-info-modern">
                                    <h3 className="product-name-modern">{product.name}</h3>

                                    <div className="product-rating-modern">
                                        <ProductRating rating={4.6} />
                                        <span className="rating-count-modern">(4.5)</span>
                                    </div>

                                    <div className="product-footer-modern">
                                        <div className="price-section">
                                            <span className="product-price-modern">Rs. {product.price}</span>
                                        </div>
                                        <button
                                            className="btn-add-cart-modern"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Add to cart logic
                                            }}
                                        >
                                            <i className="bi bi-cart-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Results Count */}
            <div className="results-info">
                {/* <p>Showing {filteredProducts.length || 0} of {products.length || 0} products</p> */}
                <p>
                    Showing {Array.isArray(filteredProducts) ? filteredProducts.length : 0} of {Array.isArray(products) ? products.length : 0} products
                </p>

            </div>
        </div>
    );
}

export default Product;