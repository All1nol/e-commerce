import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct, getProductsByUser } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getProducts); //producsts
router.get('/user/:userId', protect, getProductsByUser);
router.post('/', protect, createProduct);
router.get('/:id', protect, getProductById);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);
export default router;