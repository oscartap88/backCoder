import { Router } from "express";
import { productValidator } from "../middlewares/producValidator.js";
import CartsManagers from "../manager/carts.manager.js";
//import { uploader } from "../middlewares/multer.js";
const cartManager = new CartsManagers('./products.json');
const router = Router();




router.get('/', async(req, res)=>{
    try {
        const carts = await CartsManagers.getAllCarts();
            res.status(200).json(carts);
    } catch (error) {
        res.status(404).json({message: error.message});
        console.log(error);
    }
});

router.get('/:id', async (req, res) =>{
    try {
        const {id} = req.params;
        const cart = await cartManager.getCartById(Number(id));
        if(cart){
            res.status(200).json({message: 'cart found', cart})
        } else {
            res.status(400).send('cart not found')
        }
        
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

router.post('/',productValidator, async (req, res) =>{
    try {
        console.log(req.body);
        const cart = req.body;
        const newCart = await cartManager.createCart(cart);
        res.json(newCart)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

export default router;