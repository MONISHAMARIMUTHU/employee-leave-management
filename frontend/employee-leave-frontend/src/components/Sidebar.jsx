import React from 'react';
import { NavLink } from 'react-router-dom';
import { authService } from '../services/api';

const Sidebar = () => {
  const user = authService.getCurrentUser();
  const isAdmin = user && user.role === 'ADMIN';

  return (
    <aside className="sidebar">
      <NavLink 
        to="/dashboard" 
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
      >
        📊 Dashboard
      </NavLink>

      <NavLink 
        to="/profile" 
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
      >
        👤 Profile
      </NavLink>

      {!isAdmin && (
        <>
          <NavLink 
            to="/apply-leave" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            📝 Apply Leave
          </NavLink>

          <NavLink 
            to="/my-leaves" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            📋 My Leaves
          </NavLink>
        </>
      )}

      {isAdmin && (
        <>
          <NavLink 
            to="/employees" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            👥 Employees
          </NavLink>

          <NavLink 
            to="/manage-leaves" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            📂 Manage Leaves
          </NavLink>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
