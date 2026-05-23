import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { getUsers, updateUserRole } from './data';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUsers(getUsers());
    setLoading(false);
  }, []);

  const managers = users.filter(user => user.role?.toLowerCase() === 'manager');
  const customers = users.filter(user => user.role?.toLowerCase() === 'customer');

  const handleRoleUpdate = (email, newRole) => {
    const success = updateUserRole(email, newRole);
    if (success) {
      alert(`Role updated to ${newRole}`);
      setUsers(prev =>
        prev.map(user =>
          user.email === email ? { ...user, role: newRole } : user
        )
      );
    } else {
      alert("Failed to update role.");
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
            <th>Name</th>
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
                <td>{user.name}</td>
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
          {renderTable('Manager Users', managers, 'Make Customer', 'Customer', 'No managers found.', "danger")}
          {renderTable('Customer Users', customers, 'Make Manager', 'Manager', 'No customers found.')}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;