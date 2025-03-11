import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { getUserProducts } from '../../services/userService';
import { Button } from "../../components/ui/button";
import { useNavigate } from 'react-router-dom';
import ProductCard from '../products/ProductCard';
import { Card, CardContent } from '../ui/card';

const UserProducts = () => {
    const { user } = useUser();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProducts = async () => {
            if (user && user._id) {
                setLoading(true);
                try {
                    const data = await getUserProducts();
                    setProducts(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            }
        };
        
        fetchUserProducts();
    }, [user]);

    if (loading) return (
        <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700"></div>
        </div>
    );
    
    if (error) return (
        <Card className="bg-red-50 border border-red-200 mb-4">
            <CardContent className="p-4 text-red-600">
                Error: {error}
            </CardContent>
        </Card>
    );
    
    return (
        <div className="w-full p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Products</h2>
                <Button 
                    onClick={() => navigate('/products/new')}
                    className="bg-gray-800 hover:bg-gray-700 text-white"
                >
                    Add New Product
                </Button>
            </div>
            
            {products.length === 0 ? (
                <Card className="bg-white border border-gray-200">
                    <CardContent className="text-center p-8">
                        <p className="text-gray-600 mb-4">You haven't published any products yet.</p>
                        <Button 
                            onClick={() => navigate('/products/new')}
                            className="bg-gray-800 hover:bg-gray-700 text-white"
                        >
                            Create Your First Product
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                        <ProductCard 
                            key={product._id} 
                            product={product} 
                            showActions={true} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserProducts;
