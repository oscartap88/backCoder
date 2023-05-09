import express from 'express';
import morgan from 'morgan';
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';
import { __dirname } from './path.js';



const app = express ();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`server listo en puerto : ${PORT}`);
});

