import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProduct } from '../../context/ProductContext';
import ProductCard from '../products/ProductCard';

const Dashboard = () => {
    const { user } = useAuth();
    const { products, loading, error, fetchProducts } = useProduct();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Categories for display (in a real app, these would come from the backend)
    const categories = [
        { name: 'Electronics', icon: '📱' },
        { name: 'Clothing', icon: '👕' },
        { name: 'Home', icon: '🏠' },
        { name: 'Books', icon: '📚' },
    ];

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            {/* Hero Section */}
            <div style={{ 
                background: 'linear-gradient(to right, #3b82f6, #4f46e5)', 
                color: 'white', 
                padding: '30px', 
                borderRadius: '8px', 
                marginBottom: '30px' 
            }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '15px' }}>Discover Amazing Products</h1>
                            <p style={{ color: '#e0f2fe', marginBottom: '20px' }}>Shop the latest trends and find great deals on thousands of products.</p>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <Link 
                                    to="/products/new" 
                                    style={{ 
                                        backgroundColor: 'white', 
                                        color: '#3b82f6', 
                                        padding: '10px 20px', 
                                        borderRadius: '5px', 
                                        textDecoration: 'none', 
                                        fontWeight: '500' 
                                    }}
                                >
                                    Sell Your Items
                                </Link>
                                <button style={{ 
                                    backgroundColor: '#1d4ed8', 
                                    color: 'white', 
                                    padding: '10px 20px', 
                                    borderRadius: '5px', 
                                    border: 'none', 
                                    cursor: 'pointer', 
                                    fontWeight: '500' 
                                }}>
                                    Explore Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Shop by Category</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                    {categories.map((category, index) => (
                        <div key={index} style={{ 
                            backgroundColor: 'white', 
                            padding: '20px', 
                            borderRadius: '8px', 
                            textAlign: 'center', 
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
                            cursor: 'pointer' 
                        }}>
                            <div style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                width: '50px', 
                                height: '50px', 
                                backgroundColor: '#e0f2fe', 
                                color: '#3b82f6', 
                                borderRadius: '50%', 
                                marginBottom: '15px', 
                                fontSize: '24px' 
                            }}>
                                {category.icon}
                            </div>
                            <h3 style={{ fontWeight: '500' }}>{category.name}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* Welcome Card - Only show for logged in users */}
            {user && (
                <div style={{ 
                    backgroundColor: 'white', 
                    padding: '20px', 
                    borderRadius: '8px', 
                    marginBottom: '30px', 
                    border: '1px solid #e5e7eb', 
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
                }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '500', textAlign: 'center', marginBottom: '10px' }}>
                        Welcome back, {user?.email || 'User'}!
                    </h3>
                    <p style={{ textAlign: 'center', color: '#4b5563' }}>
                        Browse our latest products or add your own items to sell.
                    </p>
                </div>
            )}

            {/* Products Section */}
            <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Available Products</h2>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {products?.length} {products?.length === 1 ? 'product' : 'products'} found
                    </div>
                </div>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px' }}>
                        <div style={{ 
                            width: '50px', 
                            height: '50px', 
                            border: '3px solid #e5e7eb', 
                            borderTopColor: '#3b82f6', 
                            borderRadius: '50%', 
                            animation: 'spin 1s linear infinite', 
                            marginRight: '10px' 
                        }}></div>
                        <span style={{ color: '#4b5563' }}>Loading products...</span>
                    </div>
                ) : error ? (
                    <div style={{ 
                        backgroundColor: '#fee2e2', 
                        border: '1px solid #fecaca', 
                        borderRadius: '8px', 
                        padding: '20px', 
                        textAlign: 'center' 
                    }}>
                        <h3 style={{ color: '#b91c1c', fontSize: '1.125rem', fontWeight: '500', marginBottom: '10px' }}>Error Loading Products</h3>
                        <p style={{ color: '#ef4444', marginBottom: '15px' }}>{error}</p>
                        <button 
                            onClick={() => fetchProducts()}
                            style={{ 
                                backgroundColor: '#ef4444', 
                                color: 'white', 
                                padding: '8px 16px', 
                                borderRadius: '5px', 
                                border: 'none', 
                                cursor: 'pointer' 
                            }}
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <>
                        {products?.length > 0 ? (
                            <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                                gap: '20px' 
                            }}>
                                {products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div style={{ 
                                backgroundColor: 'white', 
                                border: '1px solid #e5e7eb', 
                                borderRadius: '8px', 
                                padding: '30px', 
                                textAlign: 'center', 
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
                            }}>
                                <div style={{ marginBottom: '15px', color: '#9ca3af', fontSize: '48px' }}>📦</div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#4b5563', marginBottom: '10px' }}>No Products Available</h3>
                                <p style={{ color: '#6b7280', marginBottom: '15px' }}>Get started by adding your first product!</p>
                                <Link 
                                    to="/products/new"
                                    style={{ 
                                        display: 'inline-flex', 
                                        alignItems: 'center', 
                                        backgroundColor: '#3b82f6', 
                                        color: 'white', 
                                        padding: '8px 16px', 
                                        borderRadius: '5px', 
                                        textDecoration: 'none' 
                                    }}
                                >
                                    Add Product
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Newsletter Section */}
            <div style={{ 
                backgroundColor: '#f3f4f6', 
                borderRadius: '8px', 
                padding: '30px', 
                marginBottom: '30px', 
                textAlign: 'center' 
            }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>Subscribe to Our Newsletter</h2>
                <p style={{ color: '#4b5563', marginBottom: '20px' }}>Get the latest updates on new products and special offers</p>
                <div style={{ display: 'flex', maxWidth: '500px', margin: '0 auto' }}>
                    <input 
                        type="email" 
                        placeholder="Your email address" 
                        style={{ 
                            flexGrow: 1, 
                            padding: '10px 15px', 
                            borderTopLeftRadius: '5px', 
                            borderBottomLeftRadius: '5px', 
                            border: '1px solid #d1d5db', 
                            borderRight: 'none' 
                        }}
                    />
                    <button style={{ 
                        backgroundColor: '#3b82f6', 
                        color: 'white', 
                        padding: '10px 15px', 
                        borderTopRightRadius: '5px', 
                        borderBottomRightRadius: '5px', 
                        border: 'none', 
                        cursor: 'pointer' 
                    }}>
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
