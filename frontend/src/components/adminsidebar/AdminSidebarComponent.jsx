import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function AdminSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('authType');
        localStorage.removeItem('user');
        navigate('/', { replace: true });
        window.location.reload();
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    const menuItems = [
        {
            title: 'Dashboard',
            icon: 'bi-speedometer2',
            path: '/admin/dashboard'
        },
        {
            title: 'Products',
            icon: 'bi-box-seam',
            path: '/admin/products',
            submenu: [
                { title: 'All Products', path: '/admin/products' },
                { title: 'Add Product', path: '/admin/add-products' },
                { title: 'Categories', path: '/admin/categories' }
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

    return (
        <>
            <div className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <div className="admin-logo">
                                <i className="bi bi-shield-check"></i>
                            </div>
                            {!isCollapsed && (
                                <div className="ms-3">
                                    <h5 className="mb-0 fw-bold">Admin Panel</h5>
                                    <small className="text-muted">CRYONIX</small>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="sidebar-nav">
                    <ul className="nav flex-column">
                        {menuItems.map((item, index) => (
                            <li key={index} className="nav-item">
                                {item.submenu ? (
                                    <>
                                        <div
                                            className="nav-link sidebar-link"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#submenu${index}`}
                                            role="button"
                                            aria-expanded="false"
                                        >
                                            <i className={`bi ${item.icon} me-3`}></i>
                                            {!isCollapsed && (
                                                <>
                                                    <span>{item.title}</span>
                                                    <i className="bi bi-chevron-down ms-auto"></i>
                                                </>
                                            )}
                                        </div>
                                        <div className="collapse" id={`submenu${index}`}>
                                            <ul className="nav flex-column ms-3">
                                                {item.submenu.map((subitem, subindex) => (
                                                    <li key={subindex} className="nav-item">
                                                        <Link
                                                            to={subitem.path}
                                                            className={`nav-link sidebar-sublink ${isActive(subitem.path)}`}
                                                        >
                                                            {!isCollapsed && subitem.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`nav-link sidebar-link ${isActive(item.path)}`}
                                    >
                                        <i className={`bi ${item.icon} me-3`}></i>
                                        {!isCollapsed && <span>{item.title}</span>}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="sidebar-footer">
                    <button
                        className="btn btn-outline-danger w-100"
                        onClick={handleLogout}
                    >
                        <i className="bi bi-box-arrow-left me-2"></i>
                        {!isCollapsed && 'Logout'}
                    </button>
                </div>

                {/* Toggle Button */}
                <button
                    className="sidebar-toggle"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    title={isCollapsed ? 'Expand' : 'Collapse'}
                >
                    <i className={`bi ${isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
                </button>
            </div>

            {/* Mobile Overlay */}
            <div
                className={`sidebar-overlay ${isCollapsed ? '' : 'show'}`}
                onClick={() => setIsCollapsed(true)}
            ></div>
        </>
    );
}

export default AdminSidebar;