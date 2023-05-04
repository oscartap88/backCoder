import { Router } from "express";
import ProductsManagers from '../manager/product.manager.js';
const productManager = new ProductsManagers('./products.json');
const router = Router();




router.get('/', async(req, res)=>{
    try {
        const products = await productManager.getAllProducts();
            res.status(200).json(products);
    } catch (error) {
        res.status(404).json({message: error.message});
        console.log(error);
    }
})

router.get('/', async (req, res) =>{
    try {
        const {id} = req.query;
        const product = await productManager.getProductById(Number(id));
        if(product){
            res.status(200).jsn({message: 'product found', product})
        } else {
            res.status(400).send('product not found')
        }
        
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

router.post('/', async (req, res) =>{
    try {
        const product = req.body;
        const newProduct = await productManager.createProduct(product);
        res.json(newProduct)
    } catch (error) {
        
    }
})

router.put('/:id', async(req, res) =>{
    try {
        const product = req.body;
        const { id } = req.params;
        await productManager.getProductById(Number(id));
        if(productFile){
            await productManager.updateProduct(product, Number(id));
            res.send(`product updated successfully!`);
        } else {
            res.status(404).send('product not found')
        }
    } catch (error) {
        
    }
})

router.delete('/id:', async(req, res) => {
    try {
        const { id } = req.params;
        const products = await productManager.getAllProducts();
        if(products.lenght > 0){
            await productManager.deleteAllProducts(Number(id));
            res.send(`product id: ${id} deleted seccessfully`);
        } else {
            res.send(`product id: ${id} not found`)
        }
    } catch (error) {
        res.status(404).send('product not found')
    }
})

router.delete('/', async(req, res) => {
    try {
        await productManager.deleteAllProducts();
        res.send('products deleted successfully')
        } 
     catch (error) {
        res.status(404).send('product not found')
    }
});


export default router;