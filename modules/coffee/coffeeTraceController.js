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

const createCoffeTrace_ = async (req, res) => {
    try {
        const body = matchedData(req)
        const response = await coffeTrace.create(body)
        res.send(response)
    } catch (error) {
        console.log(error)
        handleHttpError(res,  `No se pudo crear  ${entity} `)
    }
}


const createCoffeTrace = async (req, res) => {
    try {
        const { cosecha } = req.params;
        const data = req.body;

        if (!cosecha) {
            return res.status(400).json({ message: "Debe indicar la cosecha en la ruta." });
        }

        // Validar que todos los registros coincidan con esa cosecha
        if (Array.isArray(data)) {
            const inconsistente = data.find(d => d.cosecha !== cosecha);
            if (inconsistente) {
                return res.status(400).json({ message: `Todos los registros deben tener la cosecha '${cosecha}'` });
            }
        } else if (data.cosecha !== cosecha) {
            return res.status(400).json({ message: `El registro debe tener la cosecha '${cosecha}'` });
        }

        // Eliminar registros previos de esa cosecha
        await coffeTrace.destroy({ where: { cosecha } });

        // Insertar nuevos registros
        let response;
        if (Array.isArray(data)) {
            response = await coffeTrace.bulkCreate(data);
        } else {
            const body = matchedData(req);
            response = await coffeTrace.create(body);
        }

        res.status(201).json({
            message: `Registros de la cosecha ${cosecha} reemplazados exitosamente.`,
            data: response
        });
    } catch (error) {
        console.error(error);
        handleHttpError(res, `No se pudo crear ${entity}`);
    }
};


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