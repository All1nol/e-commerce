import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import LogoutButton from './components/auth/LogoutButton'
import { AuthProvider, useAuth } from './context/AuthContext'
import NewProduct from './components/products/NewProduct'
import { ToastProvider } from './components/ui/use-toast'
import { ProductProvider } from './context/ProductContext'
import Dashboard from './components/layout/Dashboard'
import ProductDetail from './components/layout/ProductDetail'
import './App.css'

// Protected route component using Context API
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Root component to handle auth loading state
const Root = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Redirect to login by default */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/products/new" element={<ProtectedRoute><NewProduct /></ProtectedRoute>} />
          <Route path="/products/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
          {/* 404 route */}
          <Route path="*" element={<div className="p-8 text-center">Page not found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ProductProvider>
          <Root />
        </ProductProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App
