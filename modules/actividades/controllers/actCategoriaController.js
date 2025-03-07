import { matchedData } from "express-validator";
import { handleHttpError } from "../../../helpers/httperror.js";
import { ActCategoria, Sucursal  } from '../models/ActRelations.js';

const entity = "ActCategoria"

const getActCategorias = async (req, res) =>{
    try {
        const registros = await ActCategoria.findAll({
            where: {habilitado: true},
            include: [
                {
                    model: Sucursal,
                    attributes: ["name"]
                } 
            ]
        });
        res.json(registros)
    }catch{
        handleHttpError(res, `No se pudo cargar ${entity} s` ); 
    }
}

const getActCategoria = async(req, res) => {
    try {
        req = matchedData(req)
        //console.log(req)
        const { id } = req
        const data = await ActCategoria.findOne({
            where: {
                id: id,
                habilitado: true
            }
        })
        if (!data){
            return res.status(404).json({
                message:  `${entity} no encontrado(a) ó inactivo (a) ` 
            })
        }
        res.status(200).json(data);
        console.log(data)
    } catch (error) {
        handleHttpError(res, `Error al traer ${entity}  ` )
        console.error(error)
    }
}

const createActCategoria = async (req, res) => {
    try {
        const body = matchedData(req)
        const response = await ActCategoria.create(body)
        res.send(response)
    } catch (error) {
        console.log(error)
        handleHttpError(res,  `No se pudo crear  ${entity} `)
    }
}

const deleteActCategoria = async(req, res) =>{
    try {
        const { id } = req.params
        //console.log(id)

        const response = await ActCategoria.update({habilitado: false}, {
            where: {id, habilitado: true}
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

const updateActCategoria = async (req, res) => {
    try {
        const { id } = req.params

        const body = req.body
        //console.log('Banco', id)

        const response = await ActCategoria.update(body, {
            where: { id }
        })

        if (response[0] === 0){
            return res.status(404).json({
                message: ` ${entity} No encontrado o No se realizaron cambios ` 
            })
        }

        const updateRegistro = await ActCategoria.findByPk(id);

        res.status(200).json({
            message:  ` ${entity} actualizado correctamente `  ,
            data: updateRegistro
        }); 
    } catch (error) {
        handleHttpError(res,  `No se pudo actuaizar ${entity} `)
        console.error(error)
    }
}

export{
    getActCategorias,
    getActCategoria,
    createActCategoria,
    deleteActCategoria,
    updateActCategoria
}