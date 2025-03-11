import User from '../models/UserModel.js';
import Product from '../models/ProductModel.js';

// Get user profile
export const getUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

// Get user products
export const getUserProducts = async (req, res) => {
    try{
        const products = await Product.find({ seller: req.user._id });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });  
    }
}
