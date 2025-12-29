import { Link, useNavigate, useLocation } from "react-router-dom";
import './Navbar.css';
import { useEffect, useState } from "react";
import UserLogin from "../../pages/Auth/Login.jsx";
import UserSignup from "../../pages/Auth/Signup.jsx";



function Navbar(){

    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className={`navbar navbar-outside rounded-4 mt-3 mb-4 navbar-expand-lg ${scrolled ? 'scrolled' : ''}`}>
            <div className="container-fluid navbar-main">
                <Link className="navbar-brand" to="/">
                    <img
                        src={`http://localhost:3000/logo.svg`}
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
                    <div className="navbar-nav d-flex mx-auto gap-2">
                        <Link
                            className={`nav-link ${isActive('/')}`}
                            to='/'
                        >
                            Home
                        </Link>
                        <Link
                            className={`nav-link ${isActive('/about')}`}
                            to='/about'
                        >
                            About
                        </Link>
                        <Link
                            className={`nav-link ${isActive('/product')}`}
                            to='/product'
                        >
                            Product
                        </Link>
                    </div>

                    <div className="d-flex ms-auto my-2 button-group">
                        <button
                            className="btn btn-outline-custom me-3"
                            onClick={UserLogin}
                            type="button"
                        >
                            Login
                        </button>
                        <button
                            className="btn btn-custom-primary"
                            onClick={UserSignup}
                            type="button"
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;