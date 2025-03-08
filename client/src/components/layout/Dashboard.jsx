import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProduct } from '../../context/ProductContext';
import ProductCard from '../products/ProductCard';
import LogoutButton from '../auth/LogoutButton';
import { Card, CardContent } from '../ui/card';

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
                    This is your product dashboard. Here you can manage your products and add new ones.
                </p>
            </div>

            {loading ? (
                <div className="text-center">Loading products...</div>
            ) : error ? (
                <div className="text-red-500 text-center">{error}</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products?.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                    {!products?.length && (
                        <Card className="col-span-full">
                            <CardContent className="p-6 text-center text-gray-500">
                                No products available. Add your first product!
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
