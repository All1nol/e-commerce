import User from '../models/UserModel.js';
import Product from '../models/ProductModel.js';

// Get user profile
export const getUserProfile = async (req, res) => {
    try{
        console.log('Getting user profile for ID:', req.user._id);
        const user = await User.findById(req.user._id).select('-password');
        
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }
        
        console.log('User found:', user);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error in getUserProfile:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Get user products
export const getUserProducts = async (req, res) => {
    try{
        console.log('Getting products for user ID:', req.user._id);
        const products = await Product.find({ seller: req.user._id });
        console.log('Found products:', products.length);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error in getUserProducts:', error);
        res.status(500).json({ message: 'Server error' });  
    }
}
