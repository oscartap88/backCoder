export const productValidator = (req, res, next) =>{
    const product = req.body;
    if (product.price !== undefined){
        next()
    } else {
        res.status(404).send("this price is not undefined")
    }
}