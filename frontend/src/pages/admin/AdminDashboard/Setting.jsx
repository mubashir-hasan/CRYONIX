import React, { useState } from 'react';
import './AdminPages.css';

function Settings() {
    const [activeTab, setActiveTab] = useState('general');
    const [settings, setSettings] = useState({
        siteName: 'CRYONIX',
        siteEmail: 'admin@cryonix.com',
        phone: '+92 300 1234567',
        address: 'Karachi, Pakistan',
        currency: 'PKR',
        taxRate: '10',
        shippingFee: '200',
        emailNotifications: true,
        smsNotifications: false,
        orderAlerts: true,
        lowStockAlerts: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = () => {
        alert('Settings saved successfully!');
    };

    return (
        <div className="admin-page">
            {/* Header */}
            <div className="page-header mb-4">
                <div>
                    <h2 className="page-title mb-2">Settings</h2>
                    <p className="text-muted mb-0">Manage your store settings and preferences</p>
                </div>
                <button className="btn btn-primary" onClick={handleSave}>
                    <i className="bi bi-check-circle me-2"></i>
                    Save Changes
                </button>
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'general' ? 'active' : ''}`}
                        onClick={() => setActiveTab('general')}
                    >
                        <i className="bi bi-gear me-2"></i>
                        General
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'payment' ? 'active' : ''}`}
                        onClick={() => setActiveTab('payment')}
                    >
                        <i className="bi bi-credit-card me-2"></i>
                        Payment & Shipping
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'notifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        <i className="bi bi-bell me-2"></i>
                        Notifications
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        <i className="bi bi-shield-lock me-2"></i>
                        Security
                    </button>
                </li>
            </ul>

            {/* General Settings */}
            {activeTab === 'general' && (
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">General Settings</h5>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Site Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="siteName"
                                    value={settings.siteName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="siteEmail"
                                    value={settings.siteEmail}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Phone Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={settings.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Currency</label>
                                <select className="form-select" name="currency" value={settings.currency} onChange={handleChange}>
                                    <option value="PKR">PKR - Pakistani Rupee</option>
                                    <option value="USD">USD - US Dollar</option>
                                    <option value="EUR">EUR - Euro</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <label className="form-label fw-semibold">Address</label>
                                <textarea
                                    className="form-control"
                                    name="address"
                                    rows="3"
                                    value={settings.address}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment & Shipping Settings */}
            {activeTab === 'payment' && (
                <div className="row g-4">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">Tax & Shipping</h5>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Tax Rate (%)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="taxRate"
                                            value={settings.taxRate}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Shipping Fee (Rs)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="shippingFee"
                                            value={settings.shippingFee}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">Payment Methods</h5>
                            </div>
                            <div className="card-body">
                                <div className="list-group">
                                    <div className="list-group-item">
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-credit-card fs-4 me-3 text-primary"></i>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">Credit/Debit Card</h6>
                                                <small className="text-muted">Accept Visa, Mastercard, etc.</small>
                                            </div>
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" defaultChecked />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list-group-item">
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-cash fs-4 me-3 text-success"></i>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">Cash on Delivery</h6>
                                                <small className="text-muted">Pay when you receive</small>
                                            </div>
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" defaultChecked />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list-group-item">
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-bank fs-4 me-3 text-info"></i>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">Bank Transfer</h6>
                                                <small className="text-muted">Direct bank payment</small>
                                            </div>
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">Notification Preferences</h5>
                    </div>
                    <div className="card-body">
                        <div className="notification-setting">
                            <div>
                                <h6 className="mb-1">Email Notifications</h6>
                                <small className="text-muted">Receive notifications via email</small>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="emailNotifications"
                                    checked={settings.emailNotifications}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="notification-setting">
                            <div>
                                <h6 className="mb-1">SMS Notifications</h6>
                                <small className="text-muted">Receive notifications via SMS</small>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="smsNotifications"
                                    checked={settings.smsNotifications}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="notification-setting">
                            <div>
                                <h6 className="mb-1">Order Alerts</h6>
                                <small className="text-muted">Get notified when new orders arrive</small>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="orderAlerts"
                                    checked={settings.orderAlerts}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="notification-setting">
                            <div>
                                <h6 className="mb-1">Low Stock Alerts</h6>
                                <small className="text-muted">Alert when products are running low</small>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="lowStockAlerts"
                                    checked={settings.lowStockAlerts}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
                <div className="row g-4">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">Change Password</h5>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label fw-semibold">Current Password</label>
                                        <input type="password" className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">New Password</label>
                                        <input type="password" className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Confirm Password</label>
                                        <input type="password" className="form-control" />
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary">Update Password</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">Two-Factor Authentication</h5>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="mb-1">Enable 2FA</h6>
                                        <small className="text-muted">Add an extra layer of security</small>
                                    </div>
                                    <button className="btn btn-outline-primary">Enable</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Settings;