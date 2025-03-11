import React, { useState } from 'react';

const ProductDetailView = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0 && value <= product.stockQuantity) {
            setQuantity(value);
        }
    };

    const incrementQuantity = () => {
        if (quantity < product.stockQuantity) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const badgeStyle = (color) => ({
        backgroundColor: color,
        color: 'white',
        padding: '4px 8px',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '500',
        display: 'inline-block'
    });

    return (
        <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '8px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
            border: '1px solid #e5e7eb', 
            margin: '0 auto' 
        }}>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '32px', 
                justifyContent: 'center',
                '@media (min-width: 1024px)': { 
                    flexDirection: 'row' 
                }
            }}>
                {/* Left side - Product image */}
                <div style={{ 
                    '@media (min-width: 1024px)': { 
                        width: '40%' 
                    }
                }}>
                    {product.image ? (
                        <div style={{ 
                            backgroundColor: 'white', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            padding: '16px', 
                            height: '320px', 
                            border: '1px solid #e5e7eb', 
                            borderRadius: '8px', 
                            transition: 'border-color 0.2s' 
                        }}>
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                style={{ 
                                    maxHeight: '100%', 
                                    maxWidth: '100%', 
                                    objectFit: 'contain' 
                                }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                                }}
                            />
                        </div>
                    ) : (
                        <div style={{ 
                            backgroundColor: 'white', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            padding: '16px', 
                            height: '320px', 
                            border: '1px solid #e5e7eb', 
                            borderRadius: '8px' 
                        }}>
                            <svg style={{ width: '32px', height: '32px', color: '#e5e7eb' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}

                    {/* Thumbnail gallery - would be populated with actual images in a real app */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', gap: '8px' }}>
                        {[1, 2, 3, 4].map((i) => (
                            <div 
                                key={i} 
                                style={{ 
                                    width: '64px', 
                                    height: '64px', 
                                    border: `1px solid ${i === 1 ? '#3b82f6' : '#e5e7eb'}`, 
                                    borderRadius: '6px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    cursor: 'pointer',
                                    transition: 'border-color 0.2s'
                                }}
                            >
                                {product.image ? (
                                    <img 
                                        src={product.image} 
                                        alt={`Thumbnail ${i}`}
                                        style={{ 
                                            maxHeight: '100%', 
                                            maxWidth: '100%', 
                                            objectFit: 'contain', 
                                            padding: '4px' 
                                        }}
                                    />
                                ) : (
                                    <div style={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        backgroundColor: '#f3f4f6', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center' 
                                    }}>
                                        <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{i}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Middle - Product details */}
                <div style={{ 
                    '@media (min-width: 1024px)': { 
                        width: '40%' 
                    }
                }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
                            <span style={badgeStyle('#f59e0b')}>
                                Only {product.stockQuantity} left!
                            </span>
                        )}
                        {product.stockQuantity === 0 && (
                            <span style={badgeStyle('#ef4444')}>
                                Out of Stock
                            </span>
                        )}
                        <span style={badgeStyle('#10b981')}>
                            Free Shipping
                        </span>
                    </div>

                    <h1 style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: '500', 
                        color: '#111827', 
                        marginBottom: '8px', 
                        textAlign: 'center',
                        '@media (min-width: 1024px)': { 
                            textAlign: 'left' 
                        }
                    }}>{product.name}</h1>
                    
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '16px', 
                        justifyContent: 'center',
                        '@media (min-width: 1024px)': { 
                            justifyContent: 'flex-start' 
                        }
                    }}>
                        <div style={{ display: 'flex', color: '#f59e0b' }}>
                            {'★★★★☆'}
                        </div>
                        <span style={{ fontSize: '0.875rem', color: '#6b7280', marginLeft: '4px' }}>42 ratings</span>
                        <span style={{ margin: '0 8px', color: '#d1d5db' }}>|</span>
                        <a href="#reviews" style={{ fontSize: '0.875rem', color: '#2563eb', textDecoration: 'none' }}>Write a review</a>
                    </div>
                    
                    <div style={{ 
                        borderTop: '1px solid #e5e7eb', 
                        borderBottom: '1px solid #e5e7eb', 
                        padding: '16px 0', 
                        marginBottom: '16px', 
                        textAlign: 'center',
                        '@media (min-width: 1024px)': { 
                            textAlign: 'left' 
                        }
                    }}>
                        <div style={{ fontSize: '1.875rem', fontWeight: '500', color: '#111827' }}>${product.price}</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '4px' }}>
                            <span style={{ textDecoration: 'line-through' }}>${(product.price * 1.2).toFixed(2)}</span>
                            <span style={{ color: '#10b981', marginLeft: '8px' }}>Save 20%</span>
                        </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ 
                            fontSize: '0.875rem', 
                            fontWeight: '500', 
                            color: '#111827', 
                            marginBottom: '8px', 
                            display: 'block', 
                            textAlign: 'center',
                            '@media (min-width: 1024px)': { 
                                textAlign: 'left' 
                            }
                        }}>Description</label>
                        <p style={{ color: '#4b5563' }}>{product.description || "This product features high-quality materials and craftsmanship. Perfect for everyday use and built to last."}</p>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ 
                            fontSize: '0.875rem', 
                            fontWeight: '500', 
                            color: '#111827', 
                            marginBottom: '8px', 
                            display: 'block', 
                            textAlign: 'center',
                            '@media (min-width: 1024px)': { 
                                textAlign: 'left' 
                            }
                        }}>Key Features</label>
                        <ul style={{ paddingLeft: '20px', color: '#4b5563', listStyleType: 'disc' }}>
                            <li style={{ marginBottom: '4px' }}>Premium quality materials</li>
                            <li style={{ marginBottom: '4px' }}>Durable construction</li>
                            <li style={{ marginBottom: '4px' }}>Versatile design</li>
                            <li>Easy to use and maintain</li>
                        </ul>
                    </div>

                    <div>
                        <label style={{ 
                            fontSize: '0.875rem', 
                            fontWeight: '500', 
                            color: '#111827', 
                            marginBottom: '8px', 
                            display: 'block', 
                            textAlign: 'center',
                            '@media (min-width: 1024px)': { 
                                textAlign: 'left' 
                            }
                        }}>Availability</label>
                        <p style={{ 
                            fontSize: '0.875rem', 
                            color: product.stockQuantity > 0 ? '#047857' : '#dc2626', 
                            textAlign: 'center',
                            '@media (min-width: 1024px)': { 
                                textAlign: 'left' 
                            }
                        }}>
                            {product.stockQuantity > 0 
                                ? `${product.stockQuantity} units available` 
                                : 'Out of Stock'}
                        </p>
                    </div>
                </div>
                
                {/* Right side - Buy box */}
                <div style={{ 
                    '@media (min-width: 1024px)': { 
                        width: '20%' 
                    }
                }}>
                    <div style={{ 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '8px', 
                        margin: '0 auto', 
                        maxWidth: '320px', 
                        position: 'sticky', 
                        top: '96px',
                        backgroundColor: 'white'
                    }}>
                        <div style={{ padding: '16px' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '8px', textAlign: 'center' }}>${product.price}</div>
                            
                            <div style={{ fontSize: '0.875rem', marginBottom: '16px', textAlign: 'center' }}>
                                {product.stockQuantity > 0 ? (
                                    <span style={{ color: '#047857' }}>In Stock</span>
                                ) : (
                                    <span style={{ color: '#dc2626' }}>Out of Stock</span>
                                )}
                            </div>
                            
                            {product.stockQuantity > 0 && (
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827', marginBottom: '8px', display: 'block' }}>Quantity</label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '6px' }}>
                                        <button 
                                            style={{ 
                                                padding: '4px 12px', 
                                                color: '#4b5563', 
                                                borderTopLeftRadius: '6px', 
                                                borderBottomLeftRadius: '6px',
                                                cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                                                backgroundColor: 'transparent',
                                                border: 'none'
                                            }}
                                            onClick={decrementQuantity}
                                            disabled={quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <input 
                                            type="number" 
                                            value={quantity} 
                                            onChange={handleQuantityChange}
                                            style={{ 
                                                width: '48px', 
                                                textAlign: 'center', 
                                                border: 'none', 
                                                padding: '0',
                                                outline: 'none'
                                            }}
                                            min="1"
                                            max={product.stockQuantity}
                                        />
                                        <button 
                                            style={{ 
                                                padding: '4px 12px', 
                                                color: '#4b5563', 
                                                borderTopRightRadius: '6px', 
                                                borderBottomRightRadius: '6px',
                                                cursor: quantity >= product.stockQuantity ? 'not-allowed' : 'pointer',
                                                backgroundColor: 'transparent',
                                                border: 'none'
                                            }}
                                            onClick={incrementQuantity}
                                            disabled={quantity >= product.stockQuantity}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <button 
                                    style={{ 
                                        width: '100%', 
                                        padding: '8px 16px', 
                                        backgroundColor: product.stockQuantity > 0 ? '#fbbf24' : '#d1d5db', 
                                        color: product.stockQuantity > 0 ? '#111827' : '#6b7280', 
                                        border: 'none', 
                                        borderRadius: '6px', 
                                        cursor: product.stockQuantity > 0 ? 'pointer' : 'not-allowed',
                                        fontWeight: '500'
                                    }}
                                    disabled={product.stockQuantity <= 0}
                                >
                                    Add to Cart
                                </button>
                                <button 
                                    style={{ 
                                        width: '100%', 
                                        padding: '8px 16px', 
                                        backgroundColor: product.stockQuantity > 0 ? '#f97316' : '#d1d5db', 
                                        color: product.stockQuantity > 0 ? '#111827' : '#6b7280', 
                                        border: 'none', 
                                        borderRadius: '6px', 
                                        cursor: product.stockQuantity > 0 ? 'pointer' : 'not-allowed',
                                        fontWeight: '500'
                                    }}
                                    disabled={product.stockQuantity <= 0}
                                >
                                    Buy Now
                                </button>
                            </div>
                            
                            <div style={{ marginTop: '16px', fontSize: '0.75rem', color: '#6b7280', textAlign: 'center' }}>
                                <div style={{ marginBottom: '4px' }}>Ships from and sold by Marketplace</div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                                    <svg style={{ width: '16px', height: '16px', marginRight: '4px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Free shipping
                                </div>
                                <div style={{ marginTop: '8px', color: '#2563eb', cursor: 'pointer' }}>
                                    Add to Wishlist
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product details tabs - would be expanded in a real app */}
            <div style={{ marginTop: '48px', borderTop: '1px solid #e5e7eb', paddingTop: '32px' }}>
                <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb' }}>
                    <button style={{ 
                        padding: '8px 16px', 
                        fontSize: '0.875rem', 
                        fontWeight: '500', 
                        color: '#2563eb', 
                        borderBottom: '2px solid #2563eb',
                        background: 'none',
                        border: 'none',
                        borderBottom: '2px solid #2563eb',
                        cursor: 'pointer'
                    }}>
                        Description
                    </button>
                    <button style={{ 
                        padding: '8px 16px', 
                        fontSize: '0.875rem', 
                        fontWeight: '500', 
                        color: '#6b7280',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                        Specifications
                    </button>
                    <button style={{ 
                        padding: '8px 16px', 
                        fontSize: '0.875rem', 
                        fontWeight: '500', 
                        color: '#6b7280',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                        Reviews
                    </button>
                    <button style={{ 
                        padding: '8px 16px', 
                        fontSize: '0.875rem', 
                        fontWeight: '500', 
                        color: '#6b7280',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                        Shipping
                    </button>
                </div>
                <div style={{ padding: '16px 0' }}>
                    <p style={{ color: '#4b5563' }}>
                        {product.description || "This product features high-quality materials and craftsmanship. Perfect for everyday use and built to last. The versatile design makes it suitable for various settings, and its durability ensures long-term value. Easy to maintain and clean, this product is a practical addition to any collection."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailView; 