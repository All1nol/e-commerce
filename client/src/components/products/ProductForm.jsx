import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSubmit, mode = 'create' }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stockQuantity: '',
    imageUrl: ''
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  useEffect(() => {
    if (product && mode === 'edit') {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        stockQuantity: product.stockQuantity || '',
        imageUrl: product.imageUrl || ''
      });
    }
  }, [product, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      if (!formData.name || !formData.price) {
        throw new Error('Name and price are required');
      }

      await onSubmit(formData);
      // Reset form if it's create mode
      if (mode === 'create') {
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          stockQuantity: '',
          imageUrl: ''
        });
      }
      
      showNotification('success', `Successfully ${mode === 'create' ? 'created' : 'updated'} the product.`);
    } catch (err) {
      showNotification('error', err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '14px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: '500'
  };

  const formGroupStyle = {
    marginBottom: '20px'
  };

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '600px', 
      margin: '0 auto', 
      backgroundColor: 'white', 
      borderRadius: '8px', 
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
      border: '1px solid #e5e7eb',
      overflow: 'hidden'
    }}>
      <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>
          {mode === 'create' ? 'Create New Product' : 'Edit Product'}
        </h2>
      </div>
      <div style={{ padding: '20px' }}>
        {notification.show && (
          <div style={{ 
            padding: '10px', 
            marginBottom: '20px', 
            borderRadius: '4px',
            backgroundColor: notification.type === 'success' ? '#ecfdf5' : '#fee2e2',
            color: notification.type === 'success' ? '#047857' : '#b91c1c',
            border: `1px solid ${notification.type === 'success' ? '#a7f3d0' : '#fecaca'}`
          }}>
            {notification.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label htmlFor="name" style={labelStyle}>Product Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="description" style={labelStyle}>Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={4}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="price" style={labelStyle}>Price*</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              step="0.01"
              min="0"
              required
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="category" style={labelStyle}>Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category"
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="stockQuantity" style={labelStyle}>Stock Quantity</label>
            <input
              type="number"
              id="stockQuantity"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              min="0"
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="imageUrl" style={labelStyle}>Image URL</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
              style={inputStyle}
            />
          </div>

          <button 
            type="submit" 
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: loading ? '#9ca3af' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            disabled={loading}
          >
            {loading ? 'Processing...' : mode === 'create' ? 'Create Product' : 'Update Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm; 