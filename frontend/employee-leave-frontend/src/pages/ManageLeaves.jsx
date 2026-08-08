import React, { useEffect, useState } from 'react';
import { leaveService } from '../services/api';

const ManageLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLeaves(filterStatus);
  }, [filterStatus]);

  const fetchLeaves = async (status) => {
    setLoading(true);
    try {
      const res = await leaveService.getAllLeaves(status);
      setLeaves(res.data);
    } catch (err) {
      setError('Failed to fetch leave requests.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setMessage('');
    setError('');
    try {
      await leaveService.approveLeave(id);
      setMessage(`Leave request #${id} approved successfully.`);
      fetchLeaves(filterStatus);
    } catch (err) {
      setError('Failed to approve leave request.');
    }
  };

  const handleReject = async (id) => {
    setMessage('');
    setError('');
    try {
      await leaveService.rejectLeave(id);
      setMessage(`Leave request #${id} rejected.`);
      fetchLeaves(filterStatus);
    } catch (err) {
      setError('Failed to reject leave request.');
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
      <div className="panel-header" style={{ marginBottom: '1.5rem' }}>
        <h1 className="page-title" style={{ margin: 0 }}>Manage Leave Applications</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ margin: 0, fontSize: '0.9rem' }}>Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: '0.4rem 0.8rem', width: 'auto' }}
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card-panel">
        {loading ? (
          <div>Loading leave requests...</div>
        ) : leaves.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No leave requests found.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Employee</th>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Reason</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave.id}>
                    <td>#{leave.id}</td>
                    <td>
                      <div>
                        <strong>{leave.employee?.firstName} {leave.employee?.lastName}</strong>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {leave.employee?.email}
                      </div>
                    </td>
                    <td><strong>{leave.leaveType}</strong></td>
                    <td>{leave.startDate}</td>
                    <td>{leave.endDate}</td>
                    <td style={{ maxWidth: '200px' }}>{leave.reason}</td>
                    <td>{leave.appliedDate}</td>
                    <td>{getStatusBadge(leave.status)}</td>
                    <td>
                      {leave.status === 'PENDING' ? (
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleApprove(leave.id)}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleReject(leave.id)}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageLeaves;
