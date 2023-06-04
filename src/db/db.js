import mongoose from "mongoose";

const connectionString = 'mongodb+srv://ogongora:ogongora@cluster0.0f9z6sd.mongodb.net/ecommerce?retryWrites=true&w=majority';


    try {
        await mongoose.connect(connectionString);
        console.log('Conectando a la base de datos MongoDB')
    } catch (error) {
        console.log(error);
    }


