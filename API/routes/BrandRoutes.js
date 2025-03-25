import express from 'express';
import { getAllBrands, getBrandById } from '../controllers/BrandsControllers.js';



const router = express.Router();

router.get('/', getAllBrands);
router.get('/:id', getBrandById);


export default router;