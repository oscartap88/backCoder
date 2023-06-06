import CartsDaoMongoDB from "../daos/mongodb/messages.dao.js";
const cartsDaoMongo = new CartsDaoMongoDB();

export const getAllService = async () => {
    try {
        const docs = await cartsDaoMongo.getAllCarts();
        return docs;
    } catch (error) {
        console.log(error);
    }
};
export const getByIdService = async (id) => {
    try {
        const doc = await cartsDaoMongo.getCartsById(id);
        if(!doc) throw new Error('Message not found')
        else return doc;
    } catch (error) {
        console.log(error);
    }
};

export const createService = async (obj) => {
    try {
        const newCarts = await cartsDaoMongo.createCarts(obj);
        if(!newCarts) throw new Error('Validation Error!')
        else return newCarts;
    } catch (error) {
        console.log(error);
    }
};

export const updateService = async (id , obj) => {
    try {
        const doc = await cartsDaoMongo.getCartsById(id);
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
        const msgDel = await cartsDaoMongo.deleteCarts(id);
        return msgDel;
    } catch (error) {
        console.log(error);
    }
};