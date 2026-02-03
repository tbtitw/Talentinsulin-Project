import React, { useState, useEffect } from 'react';
import './Profile.css';

function Profile() {
  const [userData, setUserData] = useState({
    fullName: 'John Smith',
    email: 'john.smith@example.com',
    tokens: 0
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(userData.fullName);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    fetchTransactions();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserData({
          fullName: `${data.user.firstName} ${data.user.lastName}`,
          email: data.user.email,
          tokens: data.user.tokens || 0
        });
        setEditedName(`${data.user.firstName} ${data.user.lastName}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${API_URL}/transactions`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const handleEditName = () => {
    if (isEditingName) {
      setUserData({ ...userData, fullName: editedName });
    }
    setIsEditingName(!isEditingName);
  };

  const handleCancelEdit = () => {
    setEditedName(userData.fullName);
    setIsEditingName(false);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Логика смены пароля
    console.log('Changing password...');
    setPasswords({ currentPassword: '', newPassword: '' });
    alert('Password changed successfully!');
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p className="profile-subtitle">Manage your personal information and account settings</p>
        <div className="profile-tokens-display">
          Your Balance: <span className="profile-token-count">{userData.tokens} tokens</span>
        </div>
      </div>

      <div className="profile-content">
        {/* Левая колонка */}
        <div className="profile-left">
          {/* Personal Information */}
          <div className="profile-card">
            <h2 className="card-title">Personal Information</h2>
            
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-with-button">
                <input
                  type="text"
                  value={isEditingName ? editedName : userData.fullName}
                  onChange={(e) => setEditedName(e.target.value)}
                  disabled={!isEditingName}
                  className={isEditingName ? 'editing' : ''}
                />
                <button 
                  className="btn-edit" 
                  onClick={handleEditName}
                >
                  {isEditingName ? 'Save' : 'Edit'}
                </button>
                {isEditingName && (
                  <button 
                    className="btn-cancel" 
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={userData.email}
                disabled
                className="email-readonly"
              />
            </div>
          </div>

          {/* Change Password */}
          <div className="profile-card">
            <h2 className="card-title">Change Password</h2>
            
            <form onSubmit={handleChangePassword}>
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  value={passwords.currentPassword}
                  onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                  placeholder="Enter current password"
                  required
                />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                  placeholder="Enter new password"
                  required
                />
              </div>

              <button type="submit" className="btn-change-password">
                Change Password
              </button>
            </form>
          </div>
        </div>

        {/* Правая колонка */}
        <div className="profile-right">
          <div className="profile-card">
            <h2 className="card-title">Recent Transactions</h2>
            
            {loading ? (
              <div className="transactions-loading">Loading transactions...</div>
            ) : transactions.length === 0 ? (
              <div className="no-transactions">No transactions yet</div>
            ) : (
              <>
                <div className="transactions-table-wrapper">
                  <table className="transactions-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Transaction Type</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTransactions.map((transaction) => (
                        <tr key={transaction._id}>
                          <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                          <td>{transaction.type}</td>
                          <td className={transaction.tokens > 0 ? 'amount-positive' : 'amount-negative'}>
                            {transaction.tokens > 0 ? '+' : ''}{transaction.tokens} tokens
                          </td>
                          <td>
                            <span className={`status-badge ${transaction.status.toLowerCase()}`}>
                              {transaction.status}
                            </span>
                          </td>
                          <td>{transaction.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
