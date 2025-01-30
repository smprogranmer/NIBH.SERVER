import { Router } from 'express';
import { getAllProducts, getSingleProduct } from '../controllers/Products.controller.js';

const router = Router();

router.get('/',getAllProducts)
router.get('/:slug',getSingleProduct)


export default router