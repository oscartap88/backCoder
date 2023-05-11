import { Router } from "express";
import { productValidator } from "../middlewares/producValidator.js";
import CartsManagers from "../manager/carts.manager.js";
//import { uploader } from "../middlewares/multer.js";
import { __dirname } from "../path.js";
const cartManager = new CartsManagers( __dirname + '/db/carrito.json');
const router = Router();




router.get('/', async(req, res)=>{
    try {
        const carts = await CartsManagers.getAllCarts();
            res.status(200).json(carts);
            //res.send(carts);
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

router.put('/:id', async(req, res) =>{
    try {
        const cart = req.body;
        const { id } = req.params;
        await cartManager.getCartById(Number(id));
        if(cartFile){
            await cartManager.updateCart(cart, Number(id));
            res.send(`cart updated successfully!`);
        } else {
            res.status(404).send('cart not found')
        }
    } catch (error) {
        
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const carts = await cartManager.getAllCarts();
        if(carts.lenght > 0){
            await cartManager.deleteAllCarts(Number(id));
            res.send(`cart id: ${id} deleted seccessfully`);
        } else {
            res.send(`cart id: ${id} not found`)
        }
    } catch (error) {
        res.status(404).send('cart not found')
    }
})

router.delete('/', async(req, res) => {
    try {
        await cartManager.deleteAllCarts();
        res.send('carts deleted successfully')
        } 
     catch (error) {
        res.status(404).send('cart not found')
    }
});


export default router;