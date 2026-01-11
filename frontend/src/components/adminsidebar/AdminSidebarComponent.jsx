import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AdminSidebarComponent.css';

function AdminSidebar() {

    const location = useLocation();
    const navigate = useNavigate();

    // STATE
    const [isCollapsed, setIsCollapsed] = useState(false);   // desktop collapse
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false); // mobile open
    const [openSubmenu, setOpenSubmenu] = useState(null);

    // MENU ITEMS
    const menuItems = [
        {
            title: 'Dashboard',
            icon: 'bi-speedometer2',
            path: '/admin/dashboard'
        },
        {
            title: 'Products',
            icon: 'bi-box-seam',
            submenu: [
                { path: '/admin/products', title: 'All Products' },
                { path: '/admin/add-product', title: 'Add Product' },
                { path: '/admin/categories', title: 'Categories' }
            ]
        },
        {
            title: 'Orders',
            icon: 'bi-cart-check',
            path: '/admin/orders'
        },
        {
            title: 'Users',
            icon: 'bi-people',
            path: '/admin/users'
        },
        {
            title: 'Analytics',
            icon: 'bi-graph-up',
            path: '/admin/analytics'
        },
        {
            title: 'Settings',
            icon: 'bi-gear',
            path: '/admin/settings'
        }
    ];

    // ✔ Separate submenu logic for desktop + mobile
    const toggleSubmenu = (index) => {
        if (isCollapsed && !isMobile) return;
        setOpenSubmenu(openSubmenu === index ? null : index);
    };

    // ✔ Handle resize — detect mobile
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 991;
            setIsMobile(mobile);

            if (!mobile) {
                setIsMobileSidebarOpen(false);
                setIsCollapsed(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // ✔ Desktop collapse toggle
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    // ✔ Mobile open/close
    const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);

    return (
        <>
            {/* MOBILE TOGGLE BUTTON */}
            {isMobile && (
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
                {/* HEADER */}
                <div className="sidebar-header">
                    <div className="admin-logo">
                        <i className="bi bi-shield-check"></i>
                    </div>
                    {!isCollapsed && !isMobile && (
                        <h5 className="ms-3 fw-bold">Admin Panel</h5>
                    )}
                </div>

                {/* NAV MENU */}
                <nav className="sidebar-nav">
                    <ul className="nav flex-column">

                        {menuItems.map((item, index) => (
                            <li key={index} className="nav-item">

                                {/* If item has submenu */}
                                {item.submenu ? (
                                    <>
                                        <div
                                            className="nav-link sidebar-link"
                                            onClick={() => toggleSubmenu(index)}
                                        >
                                            <i className={`bi ${item.icon} me-3`} />

                                            {/* Show title only if not collapsed */}
                                            {!isCollapsed && (
                                                <>
                                                    <span>{item.title}</span>
                                                    <i
                                                        className={`bi ms-auto ${openSubmenu === index ? "bi-chevron-up" : "bi-chevron-down"}`}
                                                    />
                                                </>
                                            )}
                                        </div>

                                        {/* SUBMENU ITEMS */}
                                        {!isCollapsed && (
                                            <ul className={`submenu ${openSubmenu === index ? "show" : ""}`}>
                                                {item.submenu.map((sub, i) => (
                                                    <li key={i}>
                                                        <Link
                                                            to={sub.path}
                                                            className={`submenu-link ${location.pathname === sub.path ? "active" : ""
                                                                }`}
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
                                        className="nav-link sidebar-link"
                                    >
                                        <i className={`bi ${item.icon} me-3`} />
                                        {!isCollapsed && <span>{item.title}</span>}
                                    </Link>
                                )}

                            </li>
                        ))}

                    </ul>
                </nav>

                {/* FOOTER BUTTONS */}
                <div className="sidebar-footer">
                    {!isMobile && (
                        <button className="btn btn-outline-primary w-100 mb-2" onClick={toggleCollapse}>
                            <i className={`bi ${isCollapsed ? "bi-arrow-right-circle" : "bi-arrow-left-circle"} me-2`} />
                            {!isCollapsed && "Collapse"}
                        </button>
                    )}

                    <button
                        className="btn btn-outline-danger w-100"
                        onClick={() => {
                            localStorage.clear();
                            navigate('/admin/login', { replace: true });
                            window.location.reload();
                        }}
                    >
                        <i className="bi bi-box-arrow-right me-2" />
                        {!isCollapsed  && "Logout"}
                    </button>
                </div>
            </aside>

            {/* MOBILE OVERLAY */}
            {isMobile && isMobileSidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setIsMobileSidebarOpen(false)}
                />
            )}
        </>
    );
}

export default AdminSidebar;
