import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AdminSidebarComponent.css';

function AdminSidebar({ isCollapsed, setIsCollapsed }) {

    const location = useLocation();
    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);

    const menuItems = [
            { title: 'Dashboard', icon: 'bi-speedometer2', path: '/admin/dashboard' }, 
            { title: 'Products', icon: 'bi-box-seam', 
                submenu: [
                    { title: 'All Products', path: '/admin/products' }, 
                    { title: 'Add Product', path: '/admin/add-product' }, 
                    { title: 'Categories', path: '/admin/categories' }
                ] 
            }, 
            { title: 'Orders', icon: 'bi-cart-check', path: '/admin/orders' }, 
            { title: 'Users', icon: 'bi-people', path: '/admin/users' }, 
            { title: 'Analytics', icon: 'bi-graph-up', path: '/admin/analytics' }, 
            { title: 'Settings', icon: 'bi-gear', path: '/admin/settings' }
        ];

    const toggleSubmenu = (index) => {
        if (isCollapsed && !isMobile) return;
        setOpenSubmenu(openSubmenu === index ? null : index);
    };

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 991;
            setIsMobile(mobile);

            if (!mobile) {
                setIsMobileSidebarOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>

            {/* Mobile Toggle Button */}
            {isMobile && (
                <button className="mobile-menu-btn" onClick={() => setIsMobileSidebarOpen(true)}>
                    <i className="bi bi-list"></i>
                </button>
            )}

            <aside
                className={`
                    admin-sidebar 
                    ${isCollapsed && !isMobile ? "collapsed" : ""}
                    ${isMobile && isMobileSidebarOpen ? "mobile-open" : ""}
                `}
            >

                {isMobile && (
                    <button
                        className="mobile-close-btn"
                        onClick={() => setIsMobileSidebarOpen(false)}
                    >
                        <i className="bi bi-x"></i>
                    </button>
                )}

                {/* HEADER */}
                <div className="sidebar-header">
                    <div className="admin-logo">
                        <i className="bi bi-shield-check"></i>
                    </div>
                    {!isCollapsed && !isMobile && (
                        <h5 className="ms-3 fw-bold">Admin Panel</h5>
                    )}
                </div>

                {/* NAVIGATION */}
                <nav className="sidebar-nav">
                    <ul className="nav flex-column">
                        {menuItems.map((item, index) => (
                            <li key={index}>

                                {item.submenu ? (
                                    <>
                                        <div
                                            className="nav-link sidebar-link"
                                            onClick={() => toggleSubmenu(index)}
                                        >
                                            <i className={`bi ${item.icon} me-3`} />
                                            {!isCollapsed && (
                                                <>
                                                    <span>{item.title}</span>
                                                    <i className={`bi ms-auto ${openSubmenu === index ? "bi-chevron-up" : "bi-chevron-down"}`} />
                                                </>
                                            )}
                                        </div>

                                        {!isCollapsed && (
                                            <ul className={`submenu ${openSubmenu === index ? "show" : ""}`}>
                                                {item.submenu.map((sub, i) => (
                                                    <li key={i}>
                                                        <Link
                                                            to={sub.path}
                                                            className={`submenu-link ${location.pathname === sub.path ? "active" : ""}`}
                                                        >
                                                            {sub.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`nav-link sidebar-link ${location.pathname === item.path ? "active" : ""}`}
                                    >
                                        <i className={`bi ${item.icon} me-3`} />
                                        {!isCollapsed && item.title}
                                    </Link>
                                )}

                            </li>
                        ))}
                    </ul>
                </nav>

                {/* FOOTER */}
                <div className="sidebar-footer">
                    {!isMobile && (
                        <button className="btn btn-outline-primary" onClick={() => setIsCollapsed(!isCollapsed)}>
                            <i className={`bi ${isCollapsed ? "bi-arrow-right-circle" : "bi-arrow-left-circle"} me-2`} />
                            {!isCollapsed && "Collapse"}
                        </button>
                    )}

                    <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                            localStorage.clear();
                            navigate('/admin/login');
                        }}
                    >
                        <i className="bi bi-box-arrow-right me-2" />
                        {!isCollapsed && "Logout"}
                    </button>
                </div>
            </aside>

            {/* MOBILE OVERLAY */}
            {isMobile && isMobileSidebarOpen && (
                <div className="sidebar-overlay" onClick={() => setIsMobileSidebarOpen(false)} />
            )}
        </>
    );
}

export default AdminSidebar;