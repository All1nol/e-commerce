import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LogoutButton from '../auth/LogoutButton';

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`) ? 'bg-blue-700' : '';
  };

  // We don't need to check for authentication here since the ProtectedRoute component already does that
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className={`font-bold text-xl ${isActive('/dashboard')}`}>
              MyMarketplace
            </Link>
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/dashboard')}`}
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/profile')}`}
              >
                Profile
              </Link>
              <Link
                to="/products/new"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/products/new')}`}
              >
                Add Product
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {user && <span className="mr-4">{user.email}</span>}
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

