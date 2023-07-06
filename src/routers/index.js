import { Router } from 'express';
const router = Router();

import productRouter from './produ.router.js';
import userRouter from './use.router.js';

router.use('/products', productRouter);
router.use('/users', userRouter);

export default router;