import React, { createContext, useContext, useState, useCallback } from 'react';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../services/productService';
import { useAuth } from './AuthContext';

const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  // Simple notification function
  const showNotification = (type, message) => {
    if (type === 'success') {
      console.log(`Success: ${message}`);
      // In a real app, you might want to use a more sophisticated notification system
      // For now, we'll use alert for simplicity
      alert(`Success: ${message}`);
    } else if (type === 'error') {
      console.error(`Error: ${message}`);
      alert(`Error: ${message}`);
    }
  };

  // Create a new product
  const addProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createProduct(productData);
      setProducts(prevProducts => [...prevProducts, response.product]);
      showNotification('success', 'Product created successfully');
      return response.product;
    } catch (err) {
      setError(err.message);
      showNotification('error', err.message || 'Failed to create product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      showNotification('error', 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  // Get a single product
  const fetchProductById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const product = await getProductById(id);
      return product;
    } catch (err) {
      setError(err.message);
      showNotification('error', 'Failed to fetch product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a product
  const updateProductById = async (id, productData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedProduct = await updateProduct(id, productData);
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product._id === id ? updatedProduct : product
        )
      );
      showNotification('success', 'Product updated successfully');
      return updatedProduct;
    } catch (err) {
      setError(err.message);
      showNotification('error', 'Failed to update product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a product
  const removeProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProduct(id);
      setProducts(prevProducts =>
        prevProducts.filter(product => product._id !== id)
      );
      showNotification('success', 'Product deleted successfully');
    } catch (err) {
      setError(err.message);
      showNotification('error', 'Failed to delete product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        fetchProducts,
        fetchProductById,
        updateProductById,
        removeProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}; 