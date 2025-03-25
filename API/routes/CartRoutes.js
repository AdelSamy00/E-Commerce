import express from 'express';
import { addProductToCart, clearCart, deleteProductFromCart, getCart, updateCart } from '../controllers/CartsControllers.js';


const router = express.Router();

router.post('/', addProductToCart);
router.get('/', getCart);
router.put('/:productId', updateCart);
router.delete('/', clearCart);
router.delete('/:productId', deleteProductFromCart);


export default router;