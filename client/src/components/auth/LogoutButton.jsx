import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <Button 
      variant="outline" 
      onClick={handleLogout}
      className="ml-auto"
    >
      Logout
    </Button>
  );
};

export default LogoutButton; 