import mongoose from "mongoose";



const productsSchema = new mongoose.Schema({
    name: {type: String, required: true },
    description : {type: String},
    price: {type: Number, required: true},
    stock: {type: Number, required: true}
},
{ timestamps: true,
  versionKey: false },
);

export const ProductsModel = mongoose.model ('products', productsSchema);