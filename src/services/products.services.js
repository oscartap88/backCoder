import ProductsDaoMongoDB from "../daos/mongodb/products.dao.js";
const prodDaoMongo = new ProductsDaoMongoDB();

export const getAllService = async () => {
    try {
        const docs = await prodDaoMongo.getAllProducts();
        return docs;
    } catch (error) {
        console.log(error);
    }
};

export const getAggregationService = async(description)=> {
    try {
        const aggregation = await prodDaoMongo.getAggregation1(description);
        return aggregation;
    } catch (error) {
        console.log(error);
    }
};

export const getByIdService = async (id) => {
    try {
        const doc = await prodDaoMongo.getProductById(id);
        if(!doc) throw new Error('Product not found')
        else return doc;
    } catch (error) {
        console.log(error);
    }
};

export const createService = async (obj) => {
    try {
        const newProd = await prodDaoMongo.createProduct(obj);
        if(!newProd) throw new Error('Validation Error!')
        else return newProd;
    } catch (error) {
        console.log(error);
    }
};

export const updateService = async (id , obj) => {
    try {
        const doc = await prodDaoMongo.getProductById(id);
        if(!doc){
            throw new Error('Product not found')
        } else{
            const prodUpd = await prodDaoMongo.updateProduct( id, obj)
            return prodUpd;
        }
       
    } catch (error) {
        console.log(error);
    }
};

export const deleteService = async (id) => {
    try {
        const prodDel = await prodDaoMongo.deleteProduct(id);
        return prodDel;
    } catch (error) {
        console.log(error);
    }
};