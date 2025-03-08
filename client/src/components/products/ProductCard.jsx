import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/products/${product._id}`);
    };

    return (
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleClick}>
            <CardHeader>
                <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <Label>Price</Label>
                        <p className="text-2xl font-bold">${product.price}</p>
                    </div>
                    <p className="text-gray-600 line-clamp-2">{product.description}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard; 