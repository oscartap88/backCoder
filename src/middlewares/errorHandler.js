import { createResponse } from "../path.js"

export const errorHandler = (error, req , res, next ) =>{
    console.log( `error ${error.mesage}`)
    const status = error.status || 400
    createResponse(res, status, error.message)
    //res.status(status).send(error.message)
}