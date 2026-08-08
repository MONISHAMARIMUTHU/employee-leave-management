import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle unauthenticated 401 response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};

// Employee Services
export const employeeService = {
  getProfile: (id) => api.get(`/employees/${id}`),
  getAllEmployees: (search = '') => api.get(`/employees${search ? `?search=${search}` : ''}`),
  updateProfile: (id, data) => api.put(`/employees/${id}`, data),
  deleteEmployee: (id) => api.delete(`/employees/${id}`),
};

// Leave Services
export const leaveService = {
  applyLeave: (data) => api.post('/leaves', data),
  getMyLeaves: () => api.get('/leaves/my'),
  getAllLeaves: (status = '') => api.get(`/leaves${status ? `?status=${status}` : ''}`),
  approveLeave: (id) => api.put(`/leaves/${id}/approve`),
  rejectLeave: (id) => api.put(`/leaves/${id}/reject`),
  getSummary: () => api.get('/leaves/summary'),
};

export default api;
