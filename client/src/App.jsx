import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { AuthProvider, useAuth } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import NewProduct from './components/products/NewProduct'
import { ToastProvider } from './components/ui/use-toast'
import { ProductProvider } from './context/ProductContext'
import Dashboard from './components/layout/Dashboard'
import ProductDetail from './components/layout/ProductDetail'
import Profile from './components/layout/Profile'
import Navbar from './components/layout/Navbar'
import './App.css'

// Loading component
const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen">Loading...</div>
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
    <>
      <Navbar />
      <div className="pt-4 container mx-auto px-4">
        {children}
      </div>
    </>
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
        <ToastProvider>
          <ProductProvider>
            <UserProvider>
              <div className="app-container">
                <AppContent />
              </div>
            </UserProvider>
          </ProductProvider>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
