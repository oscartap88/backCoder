import express from 'express';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';
import './db/db.js';
import productsRouter from './routers/product.router.js';
import messagesRouter from './routers/message.router.js';
import  cartsRouter from './routers/cart.router.js';
import cookieParser from 'cookie-parser';
//import productsRouter from './routers/products.router.js';
//import cartsRouter from './routers/carts.router.js';
import { __dirname } from './path.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routers/views.router.js';
import usersRouter from './routers/user.router.js';
import { Server } from 'socket.io';
import MongoStore from 'connect-mongo';
import ProductsManagers from './daos/filesystem/product.dao.js';
import session from 'express-session';
import passport from 'passport';
import './passport/github.js';
const productManager = new ProductsManagers( __dirname + '/db/products.json');


const app = express ();

const storeOptions = {
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://ogongora:ogongora@cluster0.0f9z6sd.mongodb.net/ecommerce?retryWrites=true&w=majority',
        //crypto: {
        //    secret: '1234'
        //}
        ttl: 60
    }),
    secret: '12345',
    resave: false,
    saveUninitialized: true,
    cookie:{ 
        maxAge: 60000 
    }
}

//const secret = '123456';


app.use(session(storeOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(errorHandler);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/realtimeproducts' , viewsRouter);  
//
//app.use('/api/products', productsRouter);
//app.use('/api/carts', cartsRouter);

app.use('/views' , viewsRouter);
app.use('/users', usersRouter);

app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/messages', messagesRouter);



//const httpServer = app.listen(8080, ()=>{
//    console.log(`server listo en puerto : 8080`);
//});
//
//const socketServer = new Server(httpServer);
//
//const arrayProducts = [];
//
//socketServer.on('connection', (socket) =>{
//    console.log('usuario conectado!', socket.id);
//    socket.on ('disconnect', () =>{
//        console.log('usuario desconectado!');
//    });
//
//    socketServer.emit('arrayProducts', productManager.getAllProducts() );
//
//
//    socket.on('newProduct', async(obj) =>{
//        await productManager.createProduct(obj);
//        socketServer.emit('arrayProducts', await productManager.getAllProducts());
//    });
//
//
    //socket.on('newProduct', (obj) =>{
    //    arrayProducts.push(obj);
    //    socketServer.emit('arrayProducts', arrayProducts);
    //})

//});

const PORT = 8080;
app.listen(PORT, ()=> console.log(`Server listo en puerto ${PORT}`));