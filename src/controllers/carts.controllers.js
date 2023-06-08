import {
    getAllService,
    getByIdService,
    addCartsToService,
    createService,
    updateService,
    deleteService,
} from "../services/carts.services.js"



export const getAllController = async (req, res, next ) => {
    try {
        const docs = await getAllService();
        res.json(docs);
        } catch (error) {
        next(error);
    }
}

export const addCartsToController = async (req, res, next) =>{
    try {
        const { productId } = req.params;
        const { cartId } = req.params;
        const newCart = await addCartsToService (productId,cartId );
        res.json(newCart);
    } catch (error) {
        next(error);
    }
}

export const getByIdController = async (req, res, next ) => {
    try {
        const { id } = req.params;
        const cart = await getByIdService(id);
        if(!cart) throw new Error('Carts not found!')
        else res.json(cart);
    } catch (error) {
        next(error);
    }
}

export const createController = async (req, res, next ) => {
    try {
        const { name, price } = req.body
        const newCart = await createService({
            name,
            price
        });
        res.json(newCart);
    } catch (error) {
        next(error);
    }
}

export const updateController = async (req, res, next ) => {
    try {
        const { id } = req.params;
        const { name, price } = req.body
        await getAllService(id);
        const cartUpd = await updateService(
            id,
            {name, price}
        )
        res.json(cartUpd);
    } catch (error) {
        next(error);
    }
}

export const deleteController = async (req, res, next ) => {
    try {
        const { id } = req.params;
        await deleteService(id);
        res.json('Carts Deleted!')
    } catch (error) {
        next(error);
    }
}