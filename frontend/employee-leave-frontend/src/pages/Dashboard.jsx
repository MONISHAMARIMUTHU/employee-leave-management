import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authService, leaveService } from '../services/api';

const Dashboard = () => {
  const user = authService.getCurrentUser();
  const isAdmin = user && user.role === 'ADMIN';

  const [summary, setSummary] = useState({
    totalEmployees: 0,
    totalLeaves: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,
  });

  const [myLeaves, setMyLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      if (isAdmin) {
        const res = await leaveService.getSummary();
        setSummary(res.data);
      } else {
        const res = await leaveService.getMyLeaves();
        const leaves = res.data;
        setMyLeaves(leaves);

        const pending = leaves.filter((l) => l.status === 'PENDING').length;
        const approved = leaves.filter((l) => l.status === 'APPROVED').length;
        const rejected = leaves.filter((l) => l.status === 'REJECTED').length;

        setSummary({
          totalEmployees: 1,
          totalLeaves: leaves.length,
          pendingLeaves: pending,
          approvedLeaves: approved,
          rejectedLeaves: rejected,
        });
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return <span className="badge badge-pending">Pending</span>;
      case 'APPROVED':
        return <span className="badge badge-approved">Approved</span>;
      case 'REJECTED':
        return <span className="badge badge-rejected">Rejected</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  return (
    <div>
      <h1 className="page-title">
        Welcome back, {user?.firstName} 👋
      </h1>

      {loading ? (
        <div>Loading dashboard statistics...</div>
      ) : (
        <>
          <div className="stats-grid">
            {isAdmin && (
              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-label">Total Employees</span>
                  <span>👥</span>
                </div>
                <div className="stat-value">{summary.totalEmployees}</div>
              </div>
            )}

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Total Leaves</span>
                <span>📋</span>
              </div>
              <div className="stat-value">{summary.totalLeaves}</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Pending</span>
                <span>⏳</span>
              </div>
              <div className="stat-value" style={{ color: '#d97706' }}>
                {summary.pendingLeaves}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Approved</span>
                <span>✅</span>
              </div>
              <div className="stat-value" style={{ color: '#16a34a' }}>
                {summary.approvedLeaves}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Rejected</span>
                <span>❌</span>
              </div>
              <div className="stat-value" style={{ color: '#dc2626' }}>
                {summary.rejectedLeaves}
              </div>
            </div>
          </div>

          {!isAdmin && (
            <div className="card-panel">
              <div className="panel-header">
                <h2 className="panel-title">My Recent Leave Requests</h2>
                <Link to="/apply-leave" className="btn btn-primary btn-sm">
                  + Apply Leave
                </Link>
              </div>

              {myLeaves.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>You haven't applied for any leaves yet.</p>
              ) : (
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Leave Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myLeaves.slice(0, 5).map((leave) => (
                        <tr key={leave.id}>
                          <td><strong>{leave.leaveType}</strong></td>
                          <td>{leave.startDate}</td>
                          <td>{leave.endDate}</td>
                          <td>{leave.reason}</td>
                          <td>{getStatusBadge(leave.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {isAdmin && (
            <div className="card-panel">
              <div className="panel-header">
                <h2 className="panel-title">Quick Actions</h2>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/manage-leaves" className="btn btn-primary">
                  📂 Manage Leave Requests
                </Link>
                <Link to="/employees" className="btn btn-primary" style={{ backgroundColor: '#475569' }}>
                  👥 View All Employees
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
