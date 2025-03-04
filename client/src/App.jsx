import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import LogoutButton from './components/auth/LogoutButton'
import { AuthProvider, useAuth } from './context/AuthContext'
import NewProduct from './components/products/NewProduct'
import { ToastProvider } from './components/ui/use-toast'
import { ProductProvider } from './context/ProductContext'
import { useProduct } from './context/ProductContext'
import { Link } from 'react-router-dom'
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

// Dashboard component
const Dashboard = () => {
  const { user } = useAuth();
  const { products, loading, error, fetchProducts } = useProduct();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Link 
            to="/products/new"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add New Product
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-lg font-medium mb-4">Welcome, {user?.email || 'User'}!</h2>
        <p className="text-gray-600">
          This is a protected route. You can only see this if you're logged in.
        </p>
      </div>

      {loading ? (
        <div className="text-center">Loading products...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-6 rounded-lg shadow-sm">
              {product.imageUrl && (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4" 
                />
              )}
              <h3 className="text-lg font-medium mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price}</span>
                <span className="text-sm text-gray-500">Stock: {product.stockQuantity}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
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
