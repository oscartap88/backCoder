import { cartsModel } from "./models/carts.model.js";
import { ProductsModel } from "./models/products.model.js";

export default class CartsDaoMongoDB {
    async getAllCarts(){
        try {
            const response = await cartsModel.find({});
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    async addCartsToProduct(productId, cartId) {
        try {
            const prod = await ProductsModel.findById(productId);
            prod.carts.push(cartId);
            prod.save();
        } catch (error) {
            console.log(error)
        }
    };

    async getCartsById(id){
        try {
            const response = await cartsModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    async createCarts(obj){
        try {
            const response = await cartsModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    async updateCarts(id, obj){
        try {
            await cartsModel.updateOne({_id: id},obj);
            return obj;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCarts(id){
        try {
            const response = await cartsModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}