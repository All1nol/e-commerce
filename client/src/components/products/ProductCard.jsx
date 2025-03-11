import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/products/${product._id}`);
    };

    // Format price safely
    const formatPrice = (price) => {
        if (price === undefined || price === null) return '$0.00';
        const numPrice = Number(price);
        return !isNaN(numPrice) ? `$${numPrice.toFixed(2)}` : '$0.00';
    };

    return (
        <div 
            onClick={handleClick}
            style={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            }}
        >
            <div style={{ position: 'relative' }}>
                {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
                    <span style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        zIndex: 10,
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                    }}>
                        Only {product.stockQuantity} left!
                    </span>
                )}
                {product.stockQuantity === 0 && (
                    <span style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        zIndex: 10,
                        backgroundColor: '#ef4444',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                    }}>
                        Out of Stock
                    </span>
                )}
                {product.image ? (
                    <div style={{
                        height: '192px',
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px'
                    }}>
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            style={{
                                maxHeight: '100%',
                                maxWidth: '100%',
                                objectFit: 'contain',
                                transition: 'transform 0.3s'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = 'scale(1)';
                            }}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                            }}
                        />
                    </div>
                ) : (
                    <div style={{
                        height: '192px',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px'
                    }}>
                        <svg style={{ width: '32px', height: '32px', color: '#e5e7eb' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>
            <div style={{
                flexGrow: 1,
                padding: '16px',
                textAlign: 'center'
            }}>
                <h3 style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#1f2937',
                    marginBottom: '4px',
                    height: '40px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                }}>
                    {product.name || 'Unnamed Product'}
                </h3>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '4px'
                }}>
                    <div style={{ display: 'flex', color: '#f59e0b' }}>
                        {'★★★★☆'}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280', marginLeft: '4px' }}>(42)</span>
                </div>
                <p style={{ fontSize: '1.125rem', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
                    {formatPrice(product.price)}
                </p>
                {product.stockQuantity > 0 ? (
                    <p style={{ fontSize: '0.75rem', color: '#047857' }}>In Stock</p>
                ) : (
                    <p style={{ fontSize: '0.75rem', color: '#dc2626' }}>Out of Stock</p>
                )}
            </div>
            <div style={{
                backgroundColor: '#f9fafb',
                borderTop: '1px solid #e5e7eb',
                padding: '8px',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <button 
                    style={{
                        width: '100%',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        backgroundColor: product.stockQuantity > 0 ? '#3b82f6' : '#d1d5db',
                        color: product.stockQuantity > 0 ? 'white' : '#6b7280',
                        border: 'none',
                        cursor: product.stockQuantity > 0 ? 'pointer' : 'not-allowed',
                        transition: 'background-color 0.2s'
                    }}
                    disabled={product.stockQuantity <= 0}
                    onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart logic would go here
                        if (product.stockQuantity > 0) {
                            alert('Added to cart!');
                        }
                    }}
                    onMouseOver={(e) => {
                        if (product.stockQuantity > 0) {
                            e.target.style.backgroundColor = '#2563eb';
                        }
                    }}
                    onMouseOut={(e) => {
                        if (product.stockQuantity > 0) {
                            e.target.style.backgroundColor = '#3b82f6';
                        }
                    }}
                >
                    {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard; 