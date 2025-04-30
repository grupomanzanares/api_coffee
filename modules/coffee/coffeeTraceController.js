import { matchedData } from "express-validator";
import { handleHttpError } from "../../helpers/httperror.js";

import coffeTrace from "./coffeeTrace.js";

const entity = "coffeTrace"

const getCoffeTrace = async (req, res) =>{
    try {
        const registros = await coffeTrace.findAll({
        });
        res.json(registros)
    }catch{
        handleHttpError(res, `No se pudo cargar ${entity} s` ); 
    }
}

const createCoffeTrace = async (req, res) => {
    try {
        const body = matchedData(req)
        const response = await coffeTrace.create(body)
        res.send(response)
    } catch (error) {
        console.log(error)
        handleHttpError(res,  `No se pudo crear  ${entity} `)
    }
}


const deleteCoffeTrace = async(req, res) =>{
    try {
        const { cosecha } = req.params


        const response = await coffeTrace.update( {
            where: {cosecha}
        })

        if(response === 0) {
            return res.status(404).json({
                message: `${entity} , no encontrado(a) y/o inactivo(a)` 
            })
        }

        res.status(200).json({
            message: `${entity} , eliminada con exito` 
        })
    } catch (error) {
        handleHttpError(res, `No se pudo eliminar ${entity} `   )
        console.error(error)
    }
}


export{
    getCoffeTrace,
    createCoffeTrace,
    deleteCoffeTrace
}