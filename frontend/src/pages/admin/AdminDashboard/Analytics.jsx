import React, { useState } from 'react';
import './AdminPages.css';

function Analytics() {
    const [timeRange, setTimeRange] = useState('week');

    // Static analytics data
    const salesData = [
        { month: 'Jan', sales: 45000, orders: 120 },
        { month: 'Feb', sales: 52000, orders: 145 },
        { month: 'Mar', sales: 48000, orders: 135 },
        { month: 'Apr', sales: 61000, orders: 168 },
        { month: 'May', sales: 55000, orders: 152 },
        { month: 'Jun', sales: 70000, orders: 190 },
    ];

    const topCategories = [
        { name: 'Electronics', sales: 125000, percentage: 35 },
        { name: 'Fashion', sales: 98000, percentage: 28 },
        { name: 'Home & Living', sales: 75000, percentage: 21 },
        { name: 'Sports', sales: 52000, percentage: 16 },
    ];

    const recentActivity = [
        { type: 'order', message: 'New order #1007 placed', time: '5 mins ago', icon: 'bi-cart-check', color: 'success' },
        { type: 'user', message: 'New user registered', time: '15 mins ago', icon: 'bi-person-plus', color: 'primary' },
        { type: 'product', message: 'Product "Headphones" out of stock', time: '1 hour ago', icon: 'bi-exclamation-triangle', color: 'warning' },
        { type: 'order', message: 'Order #1005 cancelled', time: '2 hours ago', icon: 'bi-x-circle', color: 'danger' },
        { type: 'payment', message: 'Payment received Rs 15,000', time: '3 hours ago', icon: 'bi-currency-dollar', color: 'success' },
    ];

    return (
        <div className="admin-page">
            {/* Header */}
            <div className="page-header mb-4">
                <div>
                    <h2 className="page-title mb-2">Analytics</h2>
                    <p className="text-body-primary mb-0">Track your business performance and insights</p>
                </div>
                <div className="btn-group">
                    <button
                        className={`btn ${timeRange === 'week' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setTimeRange('week')}
                    >
                        Week
                    </button>
                    <button
                        className={`btn ${timeRange === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setTimeRange('month')}
                    >
                        Month
                    </button>
                    <button
                        className={`btn ${timeRange === 'year' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setTimeRange('year')}
                    >
                        Year
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="row g-3 mb-4">
                <div className="col-md-3">
                    <div className="metric-card">
                        <div className="metric-header">
                            <span className="metric-label">Total Revenue</span>
                            <i className="bi bi-currency-dollar text-primary"></i>
                        </div>
                        <h3 className="metric-value">Rs 350,000</h3>
                        <div className="metric-footer">
                            <span className="text-success">
                                <i className="bi bi-arrow-up"></i> 12.5%
                            </span>
                            <span className="text-muted">vs last {timeRange}</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="metric-card">
                        <div className="metric-header">
                            <span className="metric-label">Total Orders</span>
                            <i className="bi bi-cart-check text-success"></i>
                        </div>
                        <h3 className="metric-value">910</h3>
                        <div className="metric-footer">
                            <span className="text-success">
                                <i className="bi bi-arrow-up"></i> 8.2%
                            </span>
                            <span className="text-muted">vs last {timeRange}</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="metric-card">
                        <div className="metric-header">
                            <span className="metric-label">Avg Order Value</span>
                            <i className="bi bi-graph-up text-info"></i>
                        </div>
                        <h3 className="metric-value">Rs 385</h3>
                        <div className="metric-footer">
                            <span className="text-danger">
                                <i className="bi bi-arrow-down"></i> 2.1%
                            </span>
                            <span className="text-muted">vs last {timeRange}</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="metric-card">
                        <div className="metric-header">
                            <span className="metric-label">Conversion Rate</span>
                            <i className="bi bi-percent text-warning"></i>
                        </div>
                        <h3 className="metric-value">3.2%</h3>
                        <div className="metric-footer">
                            <span className="text-success">
                                <i className="bi bi-arrow-up"></i> 0.5%
                            </span>
                            <span className="text-muted">vs last {timeRange}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {/* Sales Chart */}
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">Sales Overview</h5>
                        </div>
                        <div className="card-body">
                            <div className="chart-container">
                                {salesData.map((data, index) => (
                                    <div key={index} className="chart-bar-wrapper">
                                        <div className="chart-bar-container">
                                            <div
                                                className="chart-bar"
                                                style={{ height: `${(data.sales / 1000)}px` }}
                                            >
                                                <span className="chart-value">Rs {(data.sales / 1000)}K</span>
                                            </div>
                                        </div>
                                        <span className="chart-label">{data.month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Categories */}
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">Top Categories</h5>
                        </div>
                        <div className="card-body">
                            {topCategories.map((category, index) => (
                                <div key={index} className="category-item">
                                    <div className="category-info">
                                        <h6 className="mb-1">{category.name}</h6>
                                        <small className="text-muted">Rs {category.sales.toLocaleString()}</small>
                                    </div>
                                    <div className="category-progress">
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                style={{ width: `${category.percentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="percentage">{category.percentage}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">Recent Activity</h5>
                        </div>
                        <div className="card-body">
                            <div className="activity-timeline">
                                {recentActivity.map((activity, index) => (
                                    <div key={index} className="activity-item">
                                        <div className={`activity-icon bg-${activity.color}-subtle`}>
                                            <i className={`bi ${activity.icon} text-${activity.color}`}></i>
                                        </div>
                                        <div className="activity-content">
                                            <p className="activity-message mb-1">{activity.message}</p>
                                            <small className="text-muted">{activity.time}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;