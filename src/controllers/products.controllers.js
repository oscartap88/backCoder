
import {
    getAllService,
    getByIdService,
    getByNameService,
    getAggregationService,
    createService,
    updateService,
    deleteService,
} from "../services/products.services.js"



export const getAllController = async (req, res, next ) => {
    try {
        const { page, limit} = req.query;
        const response = await getAllService( page, limit);
        //res.json(docs);
        const nextPage = response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}` : null
        const prevPage = response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}` : null
        res.json({
            payload: response.docs,
            info: {
                totalPages: response.totalDocs ,
                pages: response.totalPages,
                nextPage ,
                prevPage 
            }
        })
        } catch (error) {
        next(error);
    }
};

export const getByNameController = async (req, res, next) => {
    try {
        const {name} = req.query;
        const item = await getByNameService(name);
        if(!item) throw new Error("Product not found");
        res.json(item)
    } catch (error) {
        next(error);
    }
};




export const getAggregation1Controller = async (req, res, next ) => {
    try {
        const {description} = req.query
        const response = await getAggregationService(description);
        res.json(response);
        } catch (error) {
        next(error);
    }
}

export const getByIdController = async (req, res, next ) => {
    try {
        const { id } = req.params;
        const doc = await getByIdService(id);
        res.json(doc);
    } catch (error) {
        next(error);
    }
}

export const createController = async (req, res, next ) => {
    try {
        const { name, description, price, stock } = req.body
        const newDoc = await createService({
            name,
            description,
            price,
            stock
        });
        res.json(newDoc)
    } catch (error) {
        next(error);
    }
}

export const updateController = async (req, res, next ) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock } = req.body
        await getAllService(id);
        const docUpd = await updateService(
            id,
            {name, description, price, stock}
        )
        res.json(docUpd);
    } catch (error) {
        next(error);
    }
}

export const deleteController = async (req, res, next ) => {
    try {
        const { id } = req.params;
        await deleteService(id);
        res.json('Product Deleted!')
    } catch (error) {
        next(error);
    }
}