import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <button 
      onClick={handleLogout}
      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors"
    >
      Logout
    </button>
  );
};

export default LogoutButton; 