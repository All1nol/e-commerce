import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { AuthProvider, useAuth } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import NewProduct from './components/products/NewProduct'
import { ProductProvider } from './context/ProductContext'
import Dashboard from './components/layout/Dashboard'
import ProductDetail from './components/layout/ProductDetail'
import Profile from './components/layout/Profile'
import Navbar from './components/layout/Navbar'

// Loading component
const LoadingScreen = () => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    minHeight: '100vh', 
    backgroundColor: '#f9fafb' 
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        width: '48px', 
        height: '48px', 
        border: '3px solid #e5e7eb', 
        borderTopColor: '#3b82f6', 
        borderRadius: '50%', 
        animation: 'spin 1s linear infinite', 
        margin: '0 auto 16px' 
      }}></div>
      <p style={{ color: '#4b5563', fontWeight: '500' }}>Loading application...</p>
    </div>
  </div>
);

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ 
        flexGrow: 1, 
        paddingTop: '80px', 
        paddingBottom: '32px', 
        paddingLeft: '16px', 
        paddingRight: '16px', 
        margin: '0 auto', 
        width: '100%', 
        maxWidth: '1280px', 
        display: 'flex', 
        justifyContent: 'center' 
      }}>
        <div style={{ width: '100%' }}>
          {children}
        </div>
      </main>
      <footer style={{ 
        backgroundColor: 'white', 
        borderTop: '1px solid #e5e7eb', 
        padding: '16px', 
        textAlign: 'center', 
        color: '#6b7280', 
        fontSize: '0.875rem' 
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          © {new Date().getFullYear()} Marketplace. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

// Main App component
function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/products/new" element={
        <ProtectedRoute>
          <NewProduct />
        </ProtectedRoute>
      } />
      <Route path="/products/:id" element={
        <ProtectedRoute>
          <ProductDetail />
        </ProtectedRoute>
      } />
      
      {/* Default routes */}
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

// Root component with providers
function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <UserProvider>
            <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              <AppContent />
            </div>
          </UserProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
