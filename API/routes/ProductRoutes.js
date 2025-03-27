import express from 'express';
import { createProduct, getAllProducts, getProductById } from '../controllers/ProductsControllers.js';
import multer from 'multer';

const uploads = multer();
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', uploads.fields([{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 5 }]) ,createProduct);


export default router;