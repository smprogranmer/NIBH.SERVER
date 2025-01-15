import { Router } from 'express';
// import { createOrder,,  getOrdersByUserRefId } from '../controllers/Order.controller.js';
import {  getAllOrder} from '../controllers/Order.controller.js';

const router = Router();

router.get('/',getAllOrder)
// router.get('/my-orders',getOrdersByUserRefId)
// router.post('/create-order',createOrder)


export default router