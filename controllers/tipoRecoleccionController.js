import { matchedData } from "express-validator";
import { handleHttpError } from '../helpers/httperror.js'
import TiposRecoleccion from "../models/TiposRecoleccion.js";

const getTiposRecolecciones = async (req, res) =>{
    try {
        const registros = await TiposRecoleccion.findAll({
            where: {habilitado: true}
        });
        res.json(registros)
    }catch{
        handleHttpError(res, 'No se pudo cargar cargar los TiposRecoleccion')
    }
}

const getTipoRecoleccion = async(req, res) => {
    try {
        req = matchedData(req)
        console.log(req)
        const { id } = req
        const data = await TiposRecoleccion.findOne({
            where: {
                id: id,
                habilitado: true
            }
        })
        if (!data){
            return res.status(404).json({
                message: 'TiposRecoleccion no encontrado o inactivo'
            })
        }

        res.status(200).json(data);
        console.log(data)
    } catch (error) {
        handleHttpError(res, 'Error al traer TiposRecoleccion')
        console.error(error)
    }
}

const createTipoRecoleccion = async (req, res) => {
    try {
        const body = matchedData(req)
        const response = await TiposRecoleccion.create(body)
        res.send(response)
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'No se pudo crear este TiposRecoleccion, Intenta de nuevo')
    }
}

const deleteTipoRecoleccion = async(req, res) =>{
    try {
        const { id } = req.params
        console.log(id)

        const response = await TiposRecoleccion.update({habilitado: true}, {
            where: {id, habilitado: false}
        })

        if(response === 0) {
            return res.status(404).json({
                message: 'TiposRecoleccion no encontrado y/o inactivo'
            })
        }
    } catch (error) {
        handleHttpError(res, 'No se pudo eliminar el TiposRecoleccion, intenta otra vez')
        console.error(error)
    }
}

export{
    getTipoRecoleccion,
    getTiposRecolecciones,
    createTipoRecoleccion,
    deleteTipoRecoleccion
}