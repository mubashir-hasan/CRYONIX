import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AdminSidebarComponent.css';

function AdminSidebar() {

    const location = useLocation();
    const navigate = useNavigate();

    // STATES
    const [isCollapsed, setIsCollapsed] = useState(false);        // Desktop collapse
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false); // Mobile open/close
    const [openSubmenu, setOpenSubmenu] = useState(null);         // submenu toggle

    // MENU ITEMS
    const menuItems = [
        { title: 'Dashboard', icon: 'bi-speedometer2', path: '/admin/dashboard' },

        {
            title: 'Products',
            icon: 'bi-box-seam',
            submenu: [
                { title: 'All Products', path: '/admin/products' },
                { title: 'Add Product', path: '/admin/add-product' },
                { title: 'Categories', path: '/admin/categories' }
            ]
        },

        { title: 'Orders', icon: 'bi-cart-check', path: '/admin/orders' },
        { title: 'Users', icon: 'bi-people', path: '/admin/users' },
        { title: 'Analytics', icon: 'bi-graph-up', path: '/admin/analytics' },
        { title: 'Settings', icon: 'bi-gear', path: '/admin/settings' },
    ];

    // SUBMENU TOGGLE
    const toggleSubmenu = (index) => {
        if (isCollapsed && !isMobile) return;
        setOpenSubmenu(openSubmenu === index ? null : index);
    };

    // HANDLE WINDOW RESIZE
    useEffect(() => {
        const handleResize = () => {
            let mobile = window.innerWidth <= 991;
            setIsMobile(mobile);

            if (!mobile) {
                setIsMobileSidebarOpen(false);
                setIsCollapsed(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // DESKTOP COLLAPSE BUTTON
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    // MOBILE OPEN/CLOSE SIDEBAR
    const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);

    return (
        <>
            {/* MOBILE OPEN BUTTON (☰) */}
            {isMobile && !isMobileSidebarOpen && (
                <button className="mobile-menu-btn" onClick={toggleMobileSidebar}>
                    <i className="bi bi-list"></i>
                </button>
            )}

            {/* SIDEBAR */}
            <aside
                className={`
                    admin-sidebar 
                    ${isCollapsed && !isMobile ? "collapsed" : ""}
                    ${isMobile && isMobileSidebarOpen ? "mobile-open" : ""}
                `}
            >
                {isMobile && isMobileSidebarOpen && (
                    <button className="mobile-close-btn" onClick={toggleMobileSidebar}>
                        <i className="bi bi-x-lg"></i>
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

                {/* MENU */}
                <nav className="sidebar-nav">
                    <ul className="nav flex-column">
                        {menuItems.map((item, index) => (
                            <li key={index} className="nav-item">

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
                                                    <i
                                                        className={`bi ms-auto ${openSubmenu === index
                                                            ? "bi-chevron-up"
                                                            : "bi-chevron-down"
                                                            }`}
                                                    />
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

                {/* FOOTER BUTTONS */}
                <div className="sidebar-footer">
                    {!isMobile && (
                        <button className="btn btn-outline-primary sidebar-btn" onClick={toggleCollapse}>
                            <i className={`bi ${isCollapsed ? "bi-arrow-right-circle" : "bi-arrow-left-circle"} me-2`}></i>
                            {!isCollapsed && <span>Collapse</span>}
                        </button>
                    )}

                    <button
                        className="btn btn-outline-danger sidebar-btn"
                        onClick={() => {
                            localStorage.clear();
                            navigate('/admin/login', { replace: true });
                            window.location.reload();
                        }}
                    >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        {!isCollapsed && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* MOBILE OVERLAY */}
            {isMobile && isMobileSidebarOpen && (
                <div className="sidebar-overlay" onClick={toggleMobileSidebar}></div>
            )}
        </>
    );
}

export default AdminSidebar;
