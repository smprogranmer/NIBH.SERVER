import { Router } from 'express';
import { singInUser, singUpUser } from '../controllers/User.controller.js';

const router = Router();

router.post('/singin',singInUser)
router.post('/create-user',singUpUser)
// router.get('/:id',getSingleProduct)


export default router