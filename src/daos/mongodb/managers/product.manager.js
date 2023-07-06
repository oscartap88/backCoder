import MongoDao from "../mongo.dao";
import { ProductsModel } from "../models/products.model";

export default class ProductManager extends MongoDao{
    constructor(){
        super(ProductsModel)
    }
}