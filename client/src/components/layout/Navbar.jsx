import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LogoutButton from '../auth/LogoutButton';

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    const active = location.pathname === path || location.pathname.startsWith(`${path}/`);
    return active ? 
      { color: '#2563eb', fontWeight: '500' } : 
      { color: '#374151', transition: 'color 0.15s' };
  };

  const linkStyle = {
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'color 0.15s'
  };

  return (
    <nav style={{ 
      position: 'fixed', 
      top: 0, 
      width: '100%', 
      backgroundColor: 'white', 
      color: '#1f2937', 
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
      zIndex: 10, 
      borderBottom: '1px solid #e5e7eb' 
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          {/* Left - Logo/Business name */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/dashboard" style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#2563eb', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <svg style={{ width: '20px', height: '20px', marginRight: '8px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Marketplace
            </Link>
          </div>

          {/* Center - Search bar */}
          <div style={{ display: 'none', alignItems: 'center', justifyContent: 'center', flex: 1, margin: '0 16px', '@media (min-width: 768px)': { display: 'flex' } }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '36rem' }}>
              <input 
                type="text" 
                placeholder="Search for products..." 
                style={{ 
                  width: '100%', 
                  padding: '8px 16px 8px 40px', 
                  fontSize: '0.875rem', 
                  backgroundColor: '#f3f4f6', 
                  border: '1px solid transparent', 
                  borderRadius: '6px',
                  outline: 'none'
                }}
              />
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, display: 'flex', alignItems: 'center', paddingLeft: '12px' }}>
                <svg style={{ width: '16px', height: '16px', color: '#9ca3af' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right - Navigation, Cart, User info and logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'none', alignItems: 'center', gap: '16px', '@media (min-width: 768px)': { display: 'flex' } }}>
              <Link
                to="/dashboard"
                style={{ ...linkStyle, ...isActive('/dashboard') }}
              >
                Shop
              </Link>
              <Link
                to="/profile"
                style={{ ...linkStyle, ...isActive('/profile') }}
              >
                Profile
              </Link>
              <Link
                to="/products/new"
                style={{ ...linkStyle, ...isActive('/products/new') }}
              >
                Sell
              </Link>
            </div>

            {/* Cart Icon */}
            <Link to="/cart" style={{ position: 'relative', padding: '8px', color: '#4b5563', textDecoration: 'none' }}>
              <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span style={{ 
                position: 'absolute', 
                top: 0, 
                right: 0, 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '2px 6px', 
                fontSize: '0.75rem', 
                fontWeight: 'bold', 
                color: 'white', 
                transform: 'translate(50%, -50%)', 
                backgroundColor: '#dc2626', 
                borderRadius: '9999px' 
              }}>0</span>
            </Link>

            {/* User info */}
            {user && (
              <div style={{ display: 'none', alignItems: 'center', '@media (min-width: 640px)': { display: 'flex' } }}>
                <span style={{ fontSize: '0.875rem', color: '#4b5563', marginRight: '8px' }}>
                  {user.email}
                </span>
                <LogoutButton />
              </div>
            )}
            
            {/* Mobile menu button */}
            <div style={{ display: 'flex', alignItems: 'center', '@media (min-width: 768px)': { display: 'none' } }}>
              <button 
                style={{ color: '#4b5563', cursor: 'pointer', background: 'none', border: 'none' }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {isMenuOpen && (
          <div style={{ padding: '12px 0', borderTop: '1px solid #e5e7eb', '@media (min-width: 768px)': { display: 'none' } }}>
            <div style={{ padding: '0 8px' }}>
              <Link
                to="/dashboard"
                style={{ 
                  display: 'block', 
                  padding: '8px 12px', 
                  borderRadius: '6px', 
                  fontSize: '1rem', 
                  fontWeight: '500', 
                  color: '#374151',
                  textDecoration: 'none',
                  marginBottom: '4px'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/profile"
                style={{ 
                  display: 'block', 
                  padding: '8px 12px', 
                  borderRadius: '6px', 
                  fontSize: '1rem', 
                  fontWeight: '500', 
                  color: '#374151',
                  textDecoration: 'none',
                  marginBottom: '4px'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/products/new"
                style={{ 
                  display: 'block', 
                  padding: '8px 12px', 
                  borderRadius: '6px', 
                  fontSize: '1rem', 
                  fontWeight: '500', 
                  color: '#374151',
                  textDecoration: 'none',
                  marginBottom: '4px'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Sell
              </Link>
              {user && (
                <div style={{ padding: '8px 12px', '@media (min-width: 640px)': { display: 'none' } }}>
                  <span style={{ display: 'block', fontSize: '0.875rem', color: '#4b5563', marginBottom: '8px' }}>
                    {user.email}
                  </span>
                  <LogoutButton />
                </div>
              )}
            </div>
            <div style={{ marginTop: '12px', padding: '0 8px' }}>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  placeholder="Search for products..." 
                  style={{ 
                    width: '100%', 
                    padding: '8px 16px 8px 40px', 
                    fontSize: '0.875rem', 
                    backgroundColor: '#f3f4f6', 
                    border: '1px solid transparent', 
                    borderRadius: '6px',
                    outline: 'none'
                  }}
                />
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, display: 'flex', alignItems: 'center', paddingLeft: '12px' }}>
                  <svg style={{ width: '16px', height: '16px', color: '#9ca3af' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

