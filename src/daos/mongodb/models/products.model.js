import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';



const productsSchema = new mongoose.Schema({
    name: {type: String, required: true },
    description : {type: String},
    price: {type: Number, required: true},
    stock: {type: Number, required: true}
},
{ timestamps: true,
  versionKey: false },
);

productsSchema.plugin(mongoosePaginate);

export const ProductsModel = mongoose.model ('products', productsSchema);