import express from 'express';
import ProductManager from './manager/product.manager.js';
import ProductManager from './manager/product.manager.js';

const app = expres ();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const productManager = new ProductManager('./products.json');

app.get('/products', async(req, res)=>{
    try {
        const products = await productManager.getAllProducts();
            res.status(200).json(products);
    } catch (error) {
        res.status(404).json({message: error.message});
        console.log(error);
    }
})

app.get('/products/', async (req, res) =>{
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

app.post('/products', async (req, res) =>{
    try {
        const product = req.body;
        const newProduct = await productManager.createProduct(product);
        res.json(newProduct)
    } catch (error) {
        
    }
})

app.put('/products/:id', async(req, res) =>{
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

app.delete('products/id:', async(req, res) => {
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

app.delete('products/', async(req, res) => {
    try {
        await productManager.deleteAllProducts();
        res.send('products deleted successfully')
        } 
     catch (error) {
        res.status(404).send('product not found')
    }
})

const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`server ok en puerto : ${PORT}`);
});