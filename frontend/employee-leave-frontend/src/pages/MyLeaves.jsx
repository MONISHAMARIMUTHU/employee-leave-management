import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { leaveService } from '../services/api';

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyLeaves();
  }, []);

  const fetchMyLeaves = async () => {
    try {
      const res = await leaveService.getMyLeaves();
      setLeaves(res.data);
    } catch (err) {
      setError('Failed to fetch leave requests.');
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
      <div className="panel-header" style={{ marginBottom: '1.5rem' }}>
        <h1 className="page-title" style={{ margin: 0 }}>My Leave Requests</h1>
        <Link to="/apply-leave" className="btn btn-primary">
          + Apply New Leave
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card-panel">
        {loading ? (
          <div>Loading your leave applications...</div>
        ) : leaves.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              You haven't submitted any leave requests yet.
            </p>
            <Link to="/apply-leave" className="btn btn-primary">
              Apply Now
            </Link>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Reason</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave.id}>
                    <td>#{leave.id}</td>
                    <td><strong>{leave.leaveType}</strong></td>
                    <td>{leave.startDate}</td>
                    <td>{leave.endDate}</td>
                    <td style={{ maxWidth: '250px' }}>{leave.reason}</td>
                    <td>{leave.appliedDate}</td>
                    <td>{getStatusBadge(leave.status)}</td>
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

export default MyLeaves;
