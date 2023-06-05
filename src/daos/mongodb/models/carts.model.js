import mongoose from "mongoose";


const cartsSchema = new mongoose.Schema({
    name: {type: String, required: true },
    description : {type: String, required: true},
    price: {type: Number, required: true}
},
{ timestamps: true,
  versionKey: false },
);

export const cartsModel = mongoose.model ( 'carts', cartsSchema);