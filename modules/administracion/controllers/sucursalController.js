import { matchedData } from "express-validator";

import Sucursal from "../models/Sucursal.js";
import { handleHttpError } from "../../../helpers/httperror.js";

const getSucursales = async (req, res) =>{
    try {
        const registros = await Sucursal.findAll({
            where: {habilitado: true}
        });
        res.json(registros)
    }catch{
        handleHttpError(res, 'No se pudo cargar cargar los sucursales')
    }
}

const getSucursal = async(req, res) => {
    try {
        req = matchedData(req)
        //console.log(req)
        const { id } = req
        const data = await Sucursal.findOne({
            where: {
                id: id,
                habilitado: true
            }
        })
        if (!data){
            return res.status(404).json({
                message: 'Sucursal no encontrado o inactivo'
            })
        }
        res.status(200).json(data);
        console.log(data)
    } catch (error) {
        handleHttpError(res, 'Error al traer Sucursal')
        console.error(error)
    }
}

const createSucursal = async (req, res) => {
    try {
        const body = matchedData(req)
        const response = await Sucursal.create(body)
        res.send(response)
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'No se pudo crear Sucursal, Intenta de nuevo')
    }
}

const deleteSucursal = async(req, res) =>{
    try {
        const { id } = req.params
        //console.log(id)

        const response = await Sucursal.update({habilitado: false}, {
            where: {id, habilitado: true}
        })

        if(response === 0) {
            return res.status(404).json({
                message: 'Sucursal no encontrada y/o inactiva'
            })
        }

        res.status(200).json({
            message: 'Sucursal eliminada con exito'
        })
    } catch (error) {
        handleHttpError(res, 'No se pudo eliminar el Sucursal, intenta otra vez')
        console.error(error)
    }
}

const updateSucursal = async (req, res) => {
    try {
        const { id } = req.params

        const body = req.body
        //console.log('Banco', id)

        const response = await Sucursal.update(body, {
            where: { id }
        })

        if (response[0] === 0){
            return res.status(404).json({
                message: 'Sucursal no encontrado o sin cambios'
            })
        }

        const updateRegistro = await Sucursal.findByPk(id);

        res.status(200).json({
            message: 'Banco actualizado correctamente',
            data: updateRegistro
        }); 
    } catch (error) {
        handleHttpError(res, 'No se pudo actuaizar el Banco, intenta nuevamente')
        console.error(error)
    }
}

export{
    getSucursales,
    getSucursal,
    createSucursal,
    deleteSucursal,
    updateSucursal
}