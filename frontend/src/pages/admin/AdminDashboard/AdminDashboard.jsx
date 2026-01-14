import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    pendingOrders: 0,
    lowStockProducts: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      const statsResponse = await fetch('http://localhost:5000/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const statsData = await statsResponse.json();
      if (statsData.status) {
        setStats(statsData.stats);
      }

      // Fetch recent orders
      const ordersResponse = await fetch('http://localhost:5000/api/admin/recent-orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const ordersData = await ordersResponse.json();
      if (ordersData.status) {
        setRecentOrders(ordersData.orders);
      }

      // Fetch top products
      const productsResponse = await fetch('http://localhost:5000/api/admin/top-products', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const productsData = await productsResponse.json();
      if (productsData.status) {
        setTopProducts(productsData.products);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-warning',
      processing: 'bg-info',
      completed: 'bg-success',
      cancelled: 'bg-danger'
    };
    return badges[status] || 'bg-secondary';
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container m-5">
      {/* Header */}
      <div className="dashboard-header mb-4">
        <div>
          <h1 className="dashboard-title mb-2">Dashboard</h1>
          <p className="text-muted mb-0">Welcome back! Here's what's happening today.</p>
        </div>
        <div>
          <button className="btn btn-primary">
            <i className="bi bi-download me-2"></i>
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-6 col-xl-3">
          <div className="stat-card">
            <div className="stat-icon bg-primary-subtle">
              <i className="bi bi-currency-dollar text-primary"></i>
            </div>
            <div className="stat-details">
              <h6 className="stat-label">Total Revenue</h6>
              <h3 className="stat-value">Rs {stats.totalRevenue.toLocaleString()}</h3>
              <span className="stat-change text-success">
                <i className="bi bi-arrow-up"></i> 12% from last month
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="stat-card">
            <div className="stat-icon bg-success-subtle">
              <i className="bi bi-cart-check text-success"></i>
            </div>
            <div className="stat-details">
              <h6 className="stat-label">Total Orders</h6>
              <h3 className="stat-value">{stats.totalOrders}</h3>
              <span className="stat-change text-success">
                <i className="bi bi-arrow-up"></i> 8% from last month
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="stat-card">
            <div className="stat-icon bg-info-subtle">
              <i className="bi bi-box-seam text-info"></i>
            </div>
            <div className="stat-details">
              <h6 className="stat-label">Total Products</h6>
              <h3 className="stat-value">{stats.totalProducts}</h3>
              <span className="stat-change text-warning">
                <i className="bi bi-exclamation-circle"></i> {stats.lowStockProducts} low stock
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="stat-card">
            <div className="stat-icon bg-warning-subtle">
              <i className="bi bi-people text-warning"></i>
            </div>
            <div className="stat-details">
              <h6 className="stat-label">Total Users</h6>
              <h3 className="stat-value">{stats.totalUsers}</h3>
              <span className="stat-change text-success">
                <i className="bi bi-arrow-up"></i> 15 new this week
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <Link to="/admin/orders" className="quick-action-card">
            <div className="quick-action-icon bg-warning">
              <i className="bi bi-clock-history"></i>
            </div>
            <div>
              <h4 className="mb-0">{stats.pendingOrders}</h4>
              <p className="mb-0">Pending Orders</p>
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/admin/products" className="quick-action-card">
            <div className="quick-action-icon bg-danger">
              <i className="bi bi-exclamation-triangle"></i>
            </div>
            <div>
              <h4 className="mb-0">{stats.lowStockProducts}</h4>
              <p className="mb-0">Low Stock Items</p>
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/admin/products/add" className="quick-action-card">
            <div className="quick-action-icon bg-primary">
              <i className="bi bi-plus-circle"></i>
            </div>
            <div>
              <h4 className="mb-0">Add</h4>
              <p className="mb-0">New Product</p>
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/admin/users" className="quick-action-card">
            <div className="quick-action-icon bg-success">
              <i className="bi bi-person-plus"></i>
            </div>
            <div>
              <h4 className="mb-0">Manage</h4>
              <p className="mb-0">Users</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="row g-4">
        {/* Recent Orders */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Orders</h5>
              <Link to="/admin/orders" className="btn btn-sm btn-outline-primary">
                View All
              </Link>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.length > 0 ? (
                      recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="fw-semibold">#{order.id}</td>
                          <td>{order.customer_name}</td>
                          <td>Rs {order.total.toLocaleString()}</td>
                          <td>
                            <span className={`badge ${getStatusBadge(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td>{new Date(order.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-muted">
                          No recent orders
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Top Selling Products</h5>
            </div>
            <div className="card-body">
              {topProducts.length > 0 ? (
                <div className="top-products-list">
                  {topProducts.map((product, index) => (
                    <div key={product.id} className="top-product-item">
                      <div className="product-rank">#{index + 1}</div>
                      <img
                        src={`http://localhost:5000/${product.image_url}`}
                        alt={product.name}
                        className="product-thumb"
                      />
                      <div className="product-info">
                        <h6 className="mb-1">{product.name}</h6>
                        <small className="text-muted">{product.sold} sold</small>
                      </div>
                      <div className="product-price">
                        Rs {product.price}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted py-4">No sales data</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;