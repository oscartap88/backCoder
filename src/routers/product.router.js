import { Router } from "express";
import {
    getAllController,
    getByNameController,
    getAggregation1Controller,
    getByIdController,
    createController,
    updateController,
    deleteController
} from '../controllers/products.controllers.js';

const router = Router();

router.get ('/' , getAllController);
router.get ('/by', getByNameController);
router.get ('/aggregation1' , getAggregation1Controller);
router.get('/:id', getByIdController);
router.post('/', createController);
router.put('/:id', updateController);
router.delete('/:id', deleteController);


export default router;