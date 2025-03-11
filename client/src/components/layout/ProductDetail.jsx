import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../../context/ProductContext';
import ProductDetailView from '../products/ProductDetailView';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchProductById } = useProduct();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await fetchProductById(id);
                setProduct(productData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, fetchProductById]);

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    border: '3px solid #e5e7eb', 
                    borderTopColor: '#3b82f6', 
                    borderRadius: '50%', 
                    animation: 'spin 1s linear infinite', 
                    marginRight: '12px' 
                }}></div>
                <span style={{ fontSize: '1.125rem', color: '#4b5563' }}>Loading product details...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ maxWidth: '36rem', margin: '0 auto', padding: '32px', textAlign: 'center' }}>
                <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fecaca', borderRadius: '8px', padding: '24px' }}>
                    <h3 style={{ color: '#b91c1c', fontSize: '1.25rem', fontWeight: '500', marginBottom: '8px' }}>Error Loading Product</h3>
                    <p style={{ color: '#ef4444' }}>{error}</p>
                    <button 
                        onClick={() => navigate('/dashboard')}
                        style={{ 
                            marginTop: '16px', 
                            backgroundColor: '#ef4444', 
                            color: 'white', 
                            padding: '8px 16px', 
                            borderRadius: '6px', 
                            border: 'none', 
                            cursor: 'pointer', 
                            fontWeight: '500' 
                        }}
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div style={{ maxWidth: '36rem', margin: '0 auto', padding: '32px', textAlign: 'center' }}>
                <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fde68a', borderRadius: '8px', padding: '24px' }}>
                    <h3 style={{ color: '#b45309', fontSize: '1.25rem', fontWeight: '500', marginBottom: '8px' }}>Product Not Found</h3>
                    <p style={{ color: '#4b5563' }}>The product you're looking for doesn't exist or has been removed.</p>
                    <button 
                        onClick={() => navigate('/dashboard')}
                        style={{ 
                            marginTop: '16px', 
                            backgroundColor: '#3b82f6', 
                            color: 'white', 
                            padding: '8px 16px', 
                            borderRadius: '6px', 
                            border: 'none', 
                            cursor: 'pointer', 
                            fontWeight: '500' 
                        }}
                    >
                        Browse Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <nav style={{ display: 'flex', fontSize: '0.875rem', marginBottom: '16px', color: '#6b7280' }}>
                <button 
                    onClick={() => navigate('/dashboard')}
                    style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        color: '#6b7280', 
                        transition: 'color 0.15s', 
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                        padding: 0
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#3b82f6'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#6b7280'}
                >
                    <svg style={{ width: '16px', height: '16px', marginRight: '4px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to results
                </button>
                <span style={{ margin: '0 8px' }}>/</span>
                <span style={{ color: '#4b5563' }}>{product.name}</span>
            </nav>
            
            <ProductDetailView product={product} />
        </div>
    );
};

export default ProductDetail; 