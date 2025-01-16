import { Router } from 'express';
import { createOrder, getAllOrder,  getOrdersByUserRefId } from '../controllers/Order.controller.js';

const router = Router();

router.get('/',getAllOrder)
router.get('/my-orders',getOrdersByUserRefId)
router.post('/create-order',createOrder)


export default router