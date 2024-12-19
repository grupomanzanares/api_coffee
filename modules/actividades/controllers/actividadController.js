import { matchedData } from "express-validator";
import { handleHttpError } from "../../../helpers/httperror.js";
import Actividad from "../models/Actividad.js";


const entity = "Actividad"

const getActividades = async (req, res) =>{
    try {
        const registros = await Actividad.findAll({
            where: {habilitado: true}
        });
        res.json(registros)
    }catch{
        handleHttpError(res, `No se pudo cargar ${entity} s` ); 
    }
}

const getActividad = async(req, res) => {
    try {
        req = matchedData(req)
        //console.log(req)
        const { id } = req
        const data = await Actividad.findOne({
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

const createActividad = async (req, res) => {
    try {
        const body = matchedData(req);

        console.log(body)

        const actividad = await Actividad.create(body);
        res.status(201).send(response); // 201 indica creación exitosa
    } catch (error) {
        const statusCode = error.name === 'ValidationError' ? 400 : 500;
        handleHttpError(res, 'No se pudo crear al Recolector, intenta nuevamente', statusCode);
    }
};





const deleteActividad = async(req, res) =>{
    try {
        const { id } = req.params
        console.log(id)

        const response = await Actividad.update({habilitado: false}, {
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

const updateActividad = async (req, res) => {
    try {
        const { id } = req.params

        const body = req.body
        //console.log('Banco', id)

        const response = await Actividad.update(body, {
            where: { id }
        })

        if (response[0] === 0){
            return res.status(404).json({
                message: ` ${entity} No encontrado o No se realizaron cambios ` 
            })
        }

        const updateRegistro = await Actividad.findByPk(id);

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
    getActividades,
    getActividad,
    createActividad,
    deleteActividad,
    updateActividad
}