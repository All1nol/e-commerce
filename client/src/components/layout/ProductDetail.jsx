import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../../context/ProductContext';
import { Button } from '../ui/button';
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
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    if (!product) {
        return <div className="text-center">Product not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-8">
            <Button 
                variant="outline" 
                className="mb-6"
                onClick={() => navigate('/dashboard')}
            >
                ← Back to Dashboard
            </Button>
            
            <ProductDetailView product={product} />
        </div>
    );
};

export default ProductDetail; 