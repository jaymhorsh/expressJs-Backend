import express from 'express';
import { getProducts, createProduct, updateProduct } from '../controllers/productController.js';
const router = express.Router();

// Route to get all products
router.get('/', getProducts);
router.post('/', createProduct);
router.put('/update/:id', updateProduct);

export default router;
