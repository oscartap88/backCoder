import CartsDaoMongoDB from "../daos/mongodb/carts.dao.js";
const cartDaoMongo = new CartsDaoMongoDB();

export const getAllService = async () => {
    try {
        const docs = await cartDaoMongo.getAllCarts();
        return docs;
    } catch (error) {
        console.log(error);
    }
};
export const getByIdService = async (id) => {
    try {
        const doc = await cartDaoMongo.getCartsById(id);
        if(!doc) throw new Error('Message not found')
        else return doc;
    } catch (error) {
        console.log(error);
    }
};

export const addCartsToService = async (productId, cartId) => {
    try {
        const exists = await cartDaoMongo.getCartsById(cartId)
        const newCart = await cartDaoMongo.addCartsToProduct(productId, cartId);
        if(!exists) throw new Error('Cart not found!')
        else return newCart;
    } catch (error) {
        console.log(error)
    }
};

export const createService = async (obj) => {
    try {
        const newCart = await cartDaoMongo.createCarts(obj);
        if(!newCart) throw new Error('Validation Error!')
        else return newCart;
    } catch (error) {
        console.log(error);
    }
};

export const updateService = async (id , obj) => {
    try {
        const doc = await cartDaoMongo.getCartsById(id);
        if(!doc){
            throw new Error('Message not found')
        } else{
            const cartsUpd = await cartsDaoMongo.updateCarts( id, obj)
            return cartsUpd;
        }
       
    } catch (error) {
        console.log(error);
    }
};

export const deleteService = async (id) => {
    try {
        const msgDel = await cartDaoMongo.deleteCarts(id);
        return msgDel;
    } catch (error) {
        console.log(error);
    }
};