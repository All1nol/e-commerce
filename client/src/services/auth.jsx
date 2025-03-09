import api from './api';

// Register user
const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await api.post('/auth/login', userData);
  return response.data;
};

// Get current user profile
const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

// Update user profile
const updateUserProfile = async (userData) => {
  const response = await api.put('/users/profile', userData);
  return response.data;
};

export { register, login, getUserProfile, updateUserProfile };