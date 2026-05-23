import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import config from './config';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${config.url}/api/admin/all-users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'jsnstore@gmail.com',
          username: 'jsn',
          password: 'jsn'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const managers = users.filter(user => user.role?.toLowerCase() === 'manager');
  const customers = users.filter(user => user.role?.toLowerCase() === 'customer');

  const handleRoleUpdate = async (email, newRole) => {
    try {
      const response = await fetch(`${config.url}/api/admin/update-customer-role/${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Email': 'jsnstore@gmail.com',
          'X-Admin-Username': 'jsn',
          'X-Admin-Password': 'jsn'
        },
        body: JSON.stringify({ role: newRole })
      });

      const result = await response.text();
      alert(result);

      if (response.ok) {
        setUsers(prev =>
          prev.map(user =>
            user.email === email ? { ...user, role: newRole } : user
          )
        );
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const renderTable = (title, data, buttonLabel, targetRole, emptyMsg, buttonColor = "success") => (
    <div className="user-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <span className="user-count">{data.length} {data.length === 1 ? 'user' : 'users'}</span>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty-message">{emptyMsg}</td>
            </tr>
          ) : (
            data.map(user => (
              <tr key={user.email}>
                <td className="user-email">{user.email}</td>
                <td>{user.username}</td>
                <td>{user.phno || 'N/A'}</td>
                <td>
                  <span className={`user-role role-${user.role?.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <button
                    className={`action-button button-${buttonColor}`}
                    onClick={() => handleRoleUpdate(user.email, targetRole)}
                  >
                    {buttonLabel}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">Manage user roles and permissions</p>
        </div>
        <div className="admin-actions">
          {/* Add action buttons if needed */}
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-title">Total Users</div>
          <div className="stat-value">{users.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Managers</div>
          <div className="stat-value">{managers.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Customers</div>
          <div className="stat-value">{customers.length}</div>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          {renderTable('Manager Users', managers, 'Make Customer', 'customer', 'No managers found.', "danger")}
          {renderTable('Customer Users', customers, 'Make Manager', 'manager', 'No customers found.')}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;