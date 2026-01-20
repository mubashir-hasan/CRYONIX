import React, { useState } from 'react';
import './AdminPages.css';

function Orders() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Static orders data
  const orders = [
    { id: 1001, customer: 'John Doe', email: 'john@example.com', items: 3, total: 15000, status: 'pending', date: '2025-01-10' },
    { id: 1002, customer: 'Jane Smith', email: 'jane@example.com', items: 2, total: 8500, status: 'processing', date: '2025-01-11' },
    { id: 1003, customer: 'Mike Johnson', email: 'mike@example.com', items: 5, total: 22000, status: 'completed', date: '2025-01-12' },
    { id: 1004, customer: 'Sarah Williams', email: 'sarah@example.com', items: 1, total: 5000, status: 'completed', date: '2025-01-13' },
    { id: 1005, customer: 'Tom Brown', email: 'tom@example.com', items: 4, total: 18500, status: 'cancelled', date: '2025-01-14' },
    { id: 1006, customer: 'Emma Davis', email: 'emma@example.com', items: 2, total: 9500, status: 'pending', date: '2025-01-14' },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-warning text-dark',
      processing: 'bg-info text-dark',
      completed: 'bg-success',
      cancelled: 'bg-danger'
    };
    return badges[status] || 'bg-secondary';
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toString().includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="page-header mb-4">
        <div>
          <h2 className="page-title mb-2">Orders Management</h2>
          <p className="text-body-primary mb-0">View and manage all customer orders</p>
        </div>
        <button className="btn btn-primary">
          <i className="bi bi-download me-2"></i>
          Export Orders
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="mini-stat-card">
            <div className="mini-stat-icon bg-warning-subtle">
              <i className="bi bi-clock-history text-warning"></i>
            </div>
            <div>
              <h4 className="mb-0">2</h4>
              <small className="text-muted">Pending Orders</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="mini-stat-card">
            <div className="mini-stat-icon bg-info-subtle">
              <i className="bi bi-arrow-repeat text-info"></i>
            </div>
            <div>
              <h4 className="mb-0">1</h4>
              <small className="text-muted">Processing</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="mini-stat-card">
            <div className="mini-stat-icon bg-success-subtle">
              <i className="bi bi-check-circle text-success"></i>
            </div>
            <div>
              <h4 className="mb-0">2</h4>
              <small className="text-muted">Completed</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="mini-stat-card">
            <div className="mini-stat-icon bg-danger-subtle">
              <i className="bi bi-x-circle text-danger"></i>
            </div>
            <div>
              <h4 className="mb-0">1</h4>
              <small className="text-muted">Cancelled</small>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-8">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search text-black"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by order ID, customer name, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td className="fw-semibold">#{order.id}</td>
                    <td>{order.customer}</td>
                    <td className="text-muted">{order.email}</td>
                    <td>{order.items}</td>
                    <td className="fw-semibold">Rs {order.total.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary" title="View">
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="btn btn-outline-success" title="Update">
                          <i className="bi bi-pencil"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-body-primary">Showing {filteredOrders.length} of {orders.length} orders</span>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className="page-item">
                  <span className="page-link">Previous</span>
                </li>
                <li className="page-item active">
                  <span className="page-link">1</span>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">2</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;