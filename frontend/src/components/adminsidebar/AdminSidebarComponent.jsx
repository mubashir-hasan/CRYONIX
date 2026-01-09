import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AdminSidebarComponent.css';

function AdminSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
    const [openSubmenu, setOpenSubmenu] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

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

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    const toggleSubmenu = (index) => {
        if (isCollapsed) return; // do nothing when collapsed
        setOpenSubmenu(openSubmenu === index ? null : index);
    };

    useEffect(() => {
        const resizeHandler = () => {
            setIsMobile(window.innerWidth <= 991);
            if (window.innerWidth > 991) {
                setIsCollapsed(false); // reset back on desktop
            }
        };
        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    return (
        <>
            <aside className={`
                admin-sidebar 
                ${isCollapsed ? "collapsed" : ""}
                ${isMobile && !isCollapsed ? "mobile-open" : ""}
            `}>

                {/* HEADER */}
                <div className="sidebar-header">
                    <div className="admin-logo">
                        <i className="bi bi-shield-check"></i>
                    </div>
                    {!isCollapsed && (
                        <div className="ms-3">
                            <h5 className="mb-0 fw-bold">Admin Panel</h5>
                        </div>
                    )}
                </div>

                {/* NAV */}
                <nav className="sidebar-nav">
                    <ul className="nav flex-column">

                        {menuItems.map((item, index) => (
                            <li key={index} className="nav-item">

                                {/* If submenu exists */}
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
                                                        className={`bi ms-auto ${openSubmenu === index ? "bi-chevron-up" : "bi-chevron-down"
                                                            }`}
                                                    />
                                                </>
                                            )}
                                        </div>

                                        {/* SUBMENU */}
                                        {!isCollapsed && (
                                            <ul
                                                className={`submenu ${openSubmenu === index ? "show" : ""}`}
                                            >
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
                    <button className="btn btn-outline-primary" onClick={toggleSidebar}>
                        <i className={`bi ${isCollapsed ? "bi-arrow-right-circle" : "bi-arrow-left-circle"} me-2`} />
                        {!isCollapsed && "Collapse"}
                    </button>

                    <button className="btn btn-outline-danger" onClick={() => {
                        localStorage.clear();
                        navigate('/');
                        window.location.reload();
                    }}>
                        <i className="bi bi-box-arrow-right me-2" />
                        {!isCollapsed && "Logout"}
                    </button>
                </div>

            </aside>

            {/* MOBILE OVERLAY */}
            {isMobile && !isCollapsed && (
                <div className="sidebar-overlay" onClick={() => setIsCollapsed(true)} />
            )}
        </>
    );
}

export default AdminSidebar;
