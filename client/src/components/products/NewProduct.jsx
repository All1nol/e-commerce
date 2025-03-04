import React from 'react';
import ProductForm from './ProductForm';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../../context/ProductContext';

const NewProduct = () => {
  const navigate = useNavigate();
  const { addProduct, loading } = useProduct();
  
  const handleSubmit = async (productData) => {
    try {
      await addProduct(productData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create product:', error);
      throw error;
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <button 
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          disabled={loading}
        >
          Back to Dashboard
        </button>
      </div>
      <ProductForm onSubmit={handleSubmit} mode="create" />
    </div>
  );
};

export default NewProduct; 