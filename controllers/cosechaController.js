import { body, matchedData } from "express-validator";
import { handleHttpError } from '../helpers/httperror.js'
import Cosecha from "../models/Cosecha.js";

const getCosechas = async (req, res) =>{
    try {
        const cosechas = await Cosecha.findAll({
            where: {habilitado: true}
        });
        res.json(cosechas)
    }catch{
        handleHttpError(res, 'No se pudo cargar cargar los Cosechas')
    }
}

const getCosecha = async(req, res) => {
    try {
        req = matchedData(req)
        console.log(req)
        const { id } = req
        const data = await Cosecha.findOne({
            where: {
                id: id,
                habilitado: true
            }
        })
        if (!data){
            return res.status(404).json({
                message: 'Cosecha no encontrado o inactivo'
            })
        }

        res.status(200).json(data);
        console.log(data)
    } catch (error) {
        handleHttpError(res, 'Error al traer Cosecha')
        console.error(error)
    }
}

const createCosecha = async (req, res) => {
    try {
        const body = matchedData(req)
        const response = await Cosecha.create(body)
        res.send(response)
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'No se pudo crear este Cosecha, Intenta de nuevo')
    }
}

const deleteCosecha = async(req, res) =>{
    try {
        const { id } = req.params
        console.log(id)

        const response = await Cosecha.update({habilitado: false}, {
            where: {id, habilitado: true}
        })

        if(response === 0) {
            return res.status(404).json({
                message: 'Cosecha no encontrado y/o inactivo'
            })
        }

        res.status(200).json({
            message: 'Cosecha eliminada con exito'
        })
    } catch (error) {
        handleHttpError(res, 'No se pudo eliminar el Cosecha, intenta otra vez')
        console.error(error)
    }
}

const  updateCosecha = async (req, res, next) => {
    try {
        const { id } = req.params
        
        const body = req.body
        console.log("Cosecha", id)

        const response = await Cosecha.update(body, {
            where: { id }
        })

        if (response === 0) {
            return res.status(404).json({
                message: 'Cosecha no encontrada o sin cambios'
            })
        }

        const updateCosecha = await Cosecha.findByPk(id)

        res.status(200).json({
            message: 'Cosecha actualizada correctamente',
            data: updateCosecha
        })
    } catch (error) {
        handleHttpError(res, 'No se pudo actualizar la Cosecha, intenta de nuevo')
    }
}

export{
    getCosechas,
    getCosecha,
    createCosecha,
    deleteCosecha,
    updateCosecha
}