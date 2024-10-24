import { handleHttpError } from '../helpers/httperror.js';
import Ccosto from '../models/Ccosto.js';
import { matchedData } from 'express-validator';

const getCcostos = async (req, res) => {
    try {
        const costos = await Ccosto.findAll({
            where: {estado: true}
        });
        res.json(costos)
    } catch (error) {
        handleHttpError(res, 'No se pudo cargar los Centros de costo')
    }
}

const getCcosto = async (req, res) => {
    try {
        req = matchedData(req)
        console.log(req)
        const { ccosto } = req
        const data = await Ccosto.findOne({
            where: { ccosto: ccosto, estado: true }
        })
        if (!data) {
            return res.status(404).json({
                message: 'Centro de costo no encontrado y/o inactivo'
            })
        }
        res.status(200).json(data)
        console.log(data)
    } catch (error) {
        handleHttpError(res, 'Error al traer el Centro de costo')
        console.error(error)
    }
}

const createCcosto = async (req, res) => {
    try {
        const body = matchedData(req)
        const response = await Ccosto.create(body)
        res.send(response)
    } catch (error) {
        handleHttpError(res, 'No se pudo crear el Centro de costo, Intenta de nuevo')
    }
}

const deleteCcosto = async (req, res) => {
    try {
        const { ccosto } = req.params
        console.log(ccosto)

        const response = await Ccosto.update({estado: false}, {
            where: {ccosto, estado: true}
        })
        if(response === 0) {
            return res.status(404).json({
                message: 'Banco no encontrado y/o inactivo'
            })
        }

        res.status(200).json({
            message: 'Centro de costo eliminado con exito'
        })
    } catch (error) {
        handleHttpError(res, 'No se pudo eliminar Centro de costo, intenta otra vez')
        console.error(error)
    }
}

const updateCcosto = async (req, res) => {
    try {
        const { ccosto } = req.params

        const body = req.body
        console.log('Datos recibidos para la actualizacion: ', body)
        console.log('Ccosto recibido: ', ccosto)
    
        const response = await Ccosto.update(body, {
            where: { ccosto}
        })

        if (response === 0){
            return res.status(404).json({
                message: 'Centro de costo no encontrado o sin cambios'
            })
        }

        const updateCcosto = await Ccosto.findByPk(ccosto);

        res.status(200).json({
            message: 'Centro de costo actualizado correctamente',
            data: updateCcosto
        }); 
    } catch (error) {
        handleHttpError(res, 'No se pudo actualiza el Cento de costo, intenta otra vez')
        console.error(error)
    }

}

export{
    getCcostos,
    getCcosto,
    createCcosto,
    deleteCcosto,
    updateCcosto
}