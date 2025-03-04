import React, { createContext, useContext, useState, useEffect } from 'react';
import { register as apiRegister, login as apiLogin, getUserProfile } from '../services/auth';
import { useNavigate } from 'react-router-dom';

// Create the context
const AuthContext = createContext(null);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Effect to load and validate user data on mount and token changes
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          // Try to get user profile to validate token
          const userProfile = await getUserProfile();
          setUser(userProfile);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error validating token:', error);
          // If token is invalid, clear everything
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    setError('');
    
    try {
      const data = await apiLogin({ email, password });
      
      // Store in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Update state
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Authentication failed');
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (email, password) => {
    setIsLoading(true);
    setError('');
    
    try {
      const data = await apiRegister({ email, password });
      
      // Store in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Update state
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Remove from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Update state
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Clear error function
  const clearError = () => {
    setError('');
  };

  // Create the context value object
  const value = {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    clearError
  };

  // Provide the context value to children
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
