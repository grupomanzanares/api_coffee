import { matchedData } from "express-validator";
import { handleHttpError } from '../helpers/httperror.js'
import TiposIdentificacion from "../models/TiposIdentificacion.js";

const getTipoIdentificaciones = async (req, res) =>{
    try {
        const registros = await TiposIdentificacion.findAll({
            where: {habilitado: true}
        });
        res.json(registros)
    }catch{
        handleHttpError(res, 'No se pudo cargar cargar los TiposIdentificacion')
    }
}

const getTipoIdentificacion = async(req, res) => {
    try {
        req = matchedData(req)
        console.log(req)
        const { id } = req
        const data = await TiposIdentificacion.findOne({
            where: {
                id: id,
                habilitado: true
            }
        })
        if (!data){
            return res.status(404).json({
                message: 'TipoIdentificacion no encontrado o inactivo'
            })
        }

        res.status(200).json(data);
        console.log(data)
    } catch (error) {
        handleHttpError(res, 'Error al traer TipoIdentificacion')
        console.error(error)
    }
}

const createTipoIdentificacion = async (req, res) => {
    try {
        const body = matchedData(req)
        const response = await TiposIdentificacion.create(body)
        res.send(response)
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'No se pudo crear este TiposIdentificacion, Intenta de nuevo')
    }
}

const deleteTipoIdentificacion = async(req, res) =>{
    try {
        const { id } = req.params
        console.log(id)

        const response = await TiposIdentificacion.update({habilitado: false}, {
            where: {id, habilitado: true}
        })

        if(response === 0) {
            return res.status(404).json({
                message: 'TiposIdentificacion no encontrado y/o inactivo'
            })
        }

        res.status(200).json({
            message: 'Tipo de identificacion eliminado con exito'
        })
    } catch (error) {
        handleHttpError(res, 'No se pudo eliminar el TiposIdentificacion, intenta otra vez')
        console.error(error)
    }
}

const updateTipoIdentificacion = async (req, res, next) => {
    try {
        const { id } = req.params
        const body = req.body

        const response = await TiposIdentificacion.update(body, {
            where: { id }
        })

        if (response === 0) {
            return res.status(404).json({
                message: 'Tipo de identificacion no encontrado o sin cambios'
            })
        }

        const updateTipoIdentificacion = await TiposIdentificacion.findByPk(id)

        res.status(200).json({
            message: 'Tipo de identificacion actualizado correctamente',
            data: updateTipoIdentificacion
        })
    } catch (error) {
        handleHttpError(res, 'No se pudo actualiza el Tipo de identificacion, Intenta de nuevo')
    }
}

export{
    getTipoIdentificacion,
    getTipoIdentificaciones,
    createTipoIdentificacion,
    deleteTipoIdentificacion,
    updateTipoIdentificacion
}