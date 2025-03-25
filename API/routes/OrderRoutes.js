
import express from 'express';
import { cashPayment, onlinePayment } from '../controllers/OrdersControllers.js';


const router = express.Router();

router.post('/:cartId', cashPayment);
router.post('/checkout-session/:cartId', onlinePayment);


export default router;