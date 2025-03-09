import express from 'express';
import { getUserProfile, getUserProducts } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.get('/products', protect, getUserProducts); // This will use the authenticated user's ID
// Alternative: router.get('/:userId/products', protect, getUserProducts);

export default router;
