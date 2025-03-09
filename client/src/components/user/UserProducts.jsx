import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { getUserProducts } from '../../services/userService';
import { Button } from "../../components/ui/button";
import { useNavigate } from 'react-router-dom';
import ProductCard from '../products/ProductCard';

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
                    const data = await getUserProducts(user._id);
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

    if (loading) return <div className="flex justify-center items-center p-8">Loading...</div>;
    if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
    
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Products</h2>
                <Button onClick={() => navigate('/products/create')}>
                    Add New Product
                </Button>
            </div>
            
            {products.length === 0 ? (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 mb-4">You haven't published any products yet.</p>
                    <Button onClick={() => navigate('/products/create')}>
                        Create Your First Product
                    </Button>
                </div>
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
