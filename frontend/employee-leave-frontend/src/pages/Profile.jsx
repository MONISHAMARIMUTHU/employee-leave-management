import React, { useEffect, useState } from 'react';
import { authService, employeeService } from '../services/api';

const Profile = () => {
  const currentUser = authService.getCurrentUser();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    department: '',
    designation: '',
    phone: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await employeeService.getProfile(currentUser.id);
      setProfile(res.data);
      setFormData({
        firstName: res.data.firstName || '',
        lastName: res.data.lastName || '',
        department: res.data.department || '',
        designation: res.data.designation || '',
        phone: res.data.phone || '',
      });
    } catch (err) {
      setError('Failed to load profile details.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await employeeService.updateProfile(currentUser.id, formData);
      setProfile(res.data);
      
      // Update local storage user details
      const stored = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({
        ...stored,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        department: res.data.department,
        designation: res.data.designation,
      }));

      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  if (loading) return <div>Loading profile information...</div>;

  return (
    <div style={{ maxWidth: '700px' }}>
      <h1 className="page-title">My Profile</h1>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card-panel">
        {!isEditing ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                  {profile.firstName} {profile.lastName}
                </h2>
                <p style={{ color: 'var(--text-muted)' }}>{profile.email}</p>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>
                ✏️ Edit Profile
              </button>
            </div>

            <div className="table-container">
              <table>
                <tbody>
                  <tr>
                    <td><strong>Role</strong></td>
                    <td><span className="badge badge-admin">{profile.role}</span></td>
                  </tr>
                  <tr>
                    <td><strong>Department</strong></td>
                    <td>{profile.department || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><strong>Designation</strong></td>
                    <td>{profile.designation || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><strong>Phone Number</strong></td>
                    <td>{profile.phone || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><strong>Joining Date</strong></td>
                    <td>{profile.joiningDate || 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button 
                type="button" 
                className="btn btn-logout" 
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
