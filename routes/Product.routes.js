import { Router } from 'express';
import { getAllProducts, getSingleProduct } from '../controllers/Products.controller.js';

const router = Router();

router.get('/',getAllProducts)
router.get('/:id',getSingleProduct)


export default router