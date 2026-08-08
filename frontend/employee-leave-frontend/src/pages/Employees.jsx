import React, { useEffect, useState } from 'react';
import { employeeService } from '../services/api';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async (query = '') => {
    setLoading(true);
    try {
      const res = await employeeService.getAllEmployees(query);
      setEmployees(res.data);
    } catch (err) {
      setError('Failed to load employee list.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEmployees(search);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete employee ${name}?`)) {
      setError('');
      setSuccess('');
      try {
        await employeeService.deleteEmployee(id);
        setSuccess(`Employee ${name} deleted successfully.`);
        fetchEmployees(search);
      } catch (err) {
        setError('Failed to delete employee.');
      }
    }
  };

  return (
    <div>
      <div className="panel-header" style={{ marginBottom: '1.5rem' }}>
        <h1 className="page-title" style={{ margin: 0 }}>Employee Management</h1>

        <form onSubmit={handleSearchSubmit} className="search-bar">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-sm">
            Search
          </button>
        </form>
      </div>

      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card-panel">
        {loading ? (
          <div>Loading employees list...</div>
        ) : employees.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No employees found.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <strong>{emp.firstName} {emp.lastName}</strong>
                    </td>
                    <td>{emp.email}</td>
                    <td>{emp.department || 'N/A'}</td>
                    <td>{emp.designation || 'N/A'}</td>
                    <td>{emp.phone || 'N/A'}</td>
                    <td>
                      <span className={`badge ${emp.role === 'ADMIN' ? 'badge-admin' : 'badge-employee'}`}>
                        {emp.role}
                      </span>
                    </td>
                    <td>
                      {emp.role !== 'ADMIN' ? (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(emp.id, `${emp.firstName} ${emp.lastName}`)}
                        >
                          Delete
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Protected</span>
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

export default Employees;
