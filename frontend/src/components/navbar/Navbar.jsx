import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.svg';

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const [authType, setAuthType] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('accessToken');
        const storedAuthType = localStorage.getItem('authType');
        const storedUser = localStorage.getItem('user');

        if (token && storedAuthType) {
            setAuthType(storedAuthType);

            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (err) {
                    console.error("Invalid user JSON:", err);
                    setUser(null);
                }
            }
        }

    }, []);

    const fetchCartCount = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/cart/count', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await response.json();
            if (data.status) {
                setCartCount(data.count || 0);
            }
        } catch (error) {
            console.log('Error fetching cart count:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('authType');
        localStorage.removeItem('user');
        setUser(null);
        setAuthType(null);
        setCartCount(0);
        navigate('/', { replace: true });
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className={`navbar navbar-outside rounded-4 mt-3 mb-4 navbar-expand-lg ${scrolled ? 'scrolled' : ''}`}>
            <div className="container-fluid navbar-main">
                <Link className="navbar-brand" to="/">
                    <img
                        src={logo}
                        alt="Logo"
                        width={150}
                        className="logo-img"
                    />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    {/* Guest User Navigation */}
                    {!authType && (
                        <>
                            <div className="navbar-nav d-flex mx-auto gap-2">
                                <Link className={`nav-link ${isActive('/')}`} to='/'>
                                    Home
                                </Link>
                                <Link className={`nav-link ${isActive('/about')}`} to='/about'>
                                    About
                                </Link>
                                <Link className={`nav-link ${isActive('/product')}`} to='/product'>
                                    Products
                                </Link>
                            </div>

                            <div className="d-flex ms-auto my-2 button-group gap-2">
                                <button
                                    className="btn btn-outline-custom"
                                    onClick={() => navigate("/user/user_login")}
                                    type="button"
                                >
                                    Login
                                </button>
                                <button
                                    className="btn btn-custom-primary"
                                    onClick={() => navigate("/user/user_signup")}
                                    type="button"
                                >
                                    Sign up
                                </button>
                            </div>
                        </>
                    )}

                    {/* Logged In User Navigation */}
                    {authType === 'user' && (
                        <>
                            <div className="navbar-nav d-flex mx-auto gap-2">
                                <Link className={`nav-link ${isActive('/')}`} to='/'>
                                    Home
                                </Link>
                                <Link className={`nav-link ${isActive('/product')}`} to='/product'>
                                    Products
                                </Link>
                                <Link className={`nav-link ${isActive('/orders')}`} to='/orders'>
                                    My Orders
                                </Link>
                            </div>

                            <div className="d-flex ms-auto my-2 align-items-center gap-3">
                                {/* Cart Icon with Badge */}
                                <Link to='/cart' className="cart-link">
                                    <i className="bi bi-cart3"></i>
                                    {cartCount > 0 && (
                                        <span className="cart-badge">{cartCount}</span>
                                    )}
                                </Link>

                                {/* User Dropdown */}
                                <div className="dropdown">
                                    <button
                                        className="btn user-dropdown-btn dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="bi bi-person-circle me-2"></i>
                                        {user?.name}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end user-dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item" to="/profile">
                                                <i className="bi bi-person me-2"></i>
                                                My Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/orders">
                                                <i className="bi bi-box-seam me-2"></i>
                                                My Orders
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/wishlist">
                                                <i className="bi bi-heart me-2"></i>
                                                Wishlist
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button className="dropdown-item text-danger" onClick={handleLogout}>
                                                <i className="bi bi-box-arrow-right me-2"></i>
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;