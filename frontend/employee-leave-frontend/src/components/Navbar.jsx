import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Navbar = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const getInitials = (firstName, lastName) => {
    const f = firstName ? firstName.charAt(0) : '';
    const l = lastName ? lastName.charAt(0) : '';
    return (f + l).toUpperCase() || 'U';
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        🏢 Employee Leave System
      </div>
      {user && (
        <div className="navbar-user">
          <div className="user-badge">
            <div className="avatar">
              {getInitials(user.firstName, user.lastName)}
            </div>
            <div className="user-info">
              <span className="user-name">{user.firstName} {user.lastName}</span>
              <span className="user-role">{user.role}</span>
            </div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
