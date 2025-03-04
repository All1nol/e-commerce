import ProductModel from '../models/ProductModel.js';

export const createProduct = async (req, res) => {
    try {
        console.log('Creating product with data:', req.body);
        console.log('User making request:', req.user);
        
        const { name, description, price, category, stockQuantity, imageUrl } = req.body;
        
        const product = await ProductModel.create({
            name,
            description,
            price,
            category,
            stockQuantity,
            imageUrl,
            seller: req.user._id
        });

        console.log('Product created:', product);

        if (product) {
            res.status(201).json({
                product,
                message: 'Product created successfully'
            });
        } else {
            res.status(400).json({
                message: 'Invalid product data'
            });
        }
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stockQuantity, imageUrl } = req.body;
        
        const product = await ProductModel.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        // Check if user is the seller
        if (product.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this product' });
        }
        
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stockQuantity = stockQuantity || product.stockQuantity;
        product.imageUrl = imageUrl || product.imageUrl;
        
        const updatedProduct = await product.save();
        
        res.status(200).json({
            product: updatedProduct,
            message: 'Product updated successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        // Check if user is the seller
        if (product.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this product' });
        }
        
        await product.deleteOne();
        
        res.status(200).json({ message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

