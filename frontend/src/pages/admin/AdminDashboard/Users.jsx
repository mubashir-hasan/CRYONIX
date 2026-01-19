import React, { useState } from 'react';
import './AdminPages.css';
import axios from 'axios';

function Users() {
  const [searchQuery, setSearchQuery] = useState('');
  const [fetchedUsers, setFetchedUsers] = useState([]);

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '03001234567', orders: 12, totalSpent: 45000, status: 'active', joined: '2024-06-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '03007654321', orders: 8, totalSpent: 28500, status: 'active', joined: '2024-07-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '03009876543', orders: 15, totalSpent: 62000, status: 'active', joined: '2024-05-10' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', phone: '03003456789', orders: 5, totalSpent: 18000, status: 'inactive', joined: '2024-08-05' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', phone: '03006543210', orders: 20, totalSpent: 85000, status: 'active', joined: '2024-04-12' },
    { id: 6, name: 'Emma Davis', email: 'emma@example.com', phone: '03002345678', orders: 3, totalSpent: 12000, status: 'active', joined: '2025-01-08' },
  ];

  axios.get('http://localhost:5000/api/admin/get_all_users')
    .then(response => {
      setFetchedUsers(response.data.users);
    })
    .catch(error => {
      console.error('There was an error fetching the users!', error);
    });

  const filteredUsers = fetchedUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery)
  );
  return (
    <div className="admin-page">

      {/* PAGE HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="page-title mb-1">Users Management</h2>
          <p className="text-body-secondary">Manage and monitor all registered users</p>
        </div>

        <button className="btn btn-primary">
          <i className="bi bi-person-plus me-2"></i>
          Add New User
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="mini-stat-card">
            <div className="mini-stat-icon bg-primary-subtle">
              <i className="bi bi-people text-primary"></i>
            </div>
            <div>
              <h4 className="mb-0">{fetchedUsers.length}</h4>
              <small className="text-body-secondary">Total Users</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="mini-stat-card">
            <div className="mini-stat-icon bg-success-subtle">
              <i className="bi bi-check-circle text-success"></i>
            </div>
            <div>
              <h4 className="mb-0">{fetchedUsers.filter(u => u.status === 'active').length}</h4>
              <small className="text-body-secondary">Active Users</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="mini-stat-card">
            <div className="mini-stat-icon bg-warning-subtle">
              <i className="bi bi-person-plus text-warning"></i>
            </div>
            <div>
              <h4 className="mb-0">2</h4>
              <small className="text-body-secondary">New This Week</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="mini-stat-card">
            <div className="mini-stat-icon bg-info-subtle">
              <i className="bi bi-currency-dollar text-info"></i>
            </div>
            <div>
              <h4 className="mb-0">Rs 250K</h4>
              <small className="text-body-secondary">Total Revenue</small>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search text-black"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Users List</h5>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive users-table-wrapper">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Orders</th>
                  <th>Spent</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td className="fw-semibold">#{user.id}</td>

                    <td>
                      <div className="d-flex align-items-center">
                        <div className="user-avatar me-2">{user.name.charAt(0)}</div>
                        <span>{user.name}</span>
                      </div>
                    </td>

                    <td className="text-body-secondary">{user.email}</td>
                    <td>{user.phone_no}</td>
                    {/* <td>{user.orders}</td> */}

                    <td className="fw-semibold">
                      {/* Rs {user.totalSpent.toLocaleString()} */}
                    </td>

                    <td>
                      <span className={`badge ${user.status === "active" ? "bg-success" : "bg-secondary"}`}>
                        {/* {user.status} */}
                      </span>
                    </td>

                    <td>{new Date(user.created_at).toLocaleDateString()}</td>

                    <td>
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary" title="View">
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="btn btn-outline-success" title="Edit">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-danger" title="Delete">
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        <div className="card-footer d-flex justify-content-between">
          <span className="text-body-secondary">
            Showing {filteredUsers.length} of {fetchedUsers.length} users
          </span>

          <ul className="pagination pagination-sm mb-0">
            <li className="page-item disabled"><span className="page-link">Prev</span></li>
            <li className="page-item active"><span className="page-link">1</span></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">Next</a></li>
          </ul>
        </div>
      </div>

    </div>
  );
}

export default Users;