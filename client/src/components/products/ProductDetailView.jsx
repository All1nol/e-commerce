import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

const ProductDetailView = ({ product }) => {
    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="text-3xl">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div>
                        <Label className="text-lg">Price</Label>
                        <p className="text-3xl font-bold">${product.price}</p>
                    </div>
                    
                    <div>
                        <Label className="text-lg">Description</Label>
                        <p className="text-gray-600 mt-2">{product.description}</p>
                    </div>

                    <div>
                        <Label className="text-lg">Stock</Label>
                        <p className="mt-2">{product.stockQuantity} units available</p>
                    </div>

                    <div className="mt-8 space-y-4">
                        <Button className="w-full text-lg py-6">Contact Seller</Button>
                        <Button variant="outline" className="w-full">Add to Favorites</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductDetailView; 