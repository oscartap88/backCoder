import { Router } from "express";
import {
    getAllController,
    addCartsToController,
    getByIdController,
    createController,
    updateController,
    deleteController
} from '../controllers/carts.controllers.js';

const router = Router();

router.get ('/' , getAllController);
router.get('/:id', getByIdController);
router.post('/', createController);
router.post('/add/:productId/:cartId' , addCartsToController);
router.put('/:id', updateController);
router.delete('/:id', deleteController);


export default router;