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

        const response = await TiposRecoleccion.update({habilitado: false}, {
            where: {id, habilitado: true}
        })

        if(response === 0) {
            return res.status(404).json({
                message: 'TiposRecoleccion no encontrado y/o inactivo'
            })
        }

        res.status(200).json({
            message: 'Tipo de recoleccion eliminado con exito'
        })
    } catch (error) {
        handleHttpError(res, 'No se pudo eliminar el TiposRecoleccion, intenta otra vez')
        console.error(error)
    }
}

const updateTipoRecoleccion = async (req, res, next) => {
    try {
        const { id } = req.params
        const body = req.body

        const response = await TiposRecoleccion.update(body, {
            where: { id }
        })

        if (response === 0) {
            return res.status(404).json({
                message: 'Tipo de recoleccion no encontrada o sin cambios'
            })
        }

        const updateTipoRecoleccion = await TiposRecoleccion.findByPk(id);

        res.status(200).json({
            message: 'Tipo de recoleccion atualizado con exito',
            data: updateTipoRecoleccion
        })

    } catch (error) {
        handleHttpError(res, 'No se pudo actualizar el tipo de recoleccion, intenta de nuevo')
        console.error(error)
    }
}

export{
    getTipoRecoleccion,
    getTiposRecolecciones,
    createTipoRecoleccion,
    deleteTipoRecoleccion,
    updateTipoRecoleccion
}