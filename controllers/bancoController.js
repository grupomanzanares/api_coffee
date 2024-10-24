import { matchedData } from "express-validator";
import { handleHttpError } from '../helpers/httperror.js'
import Banco from "../models/Banco.js";

const getBancos = async (req, res) =>{
    try {
        const bancos = await Banco.findAll({
            where: {habilitado: true}
        });
        res.json(bancos)
    }catch{
        handleHttpError(res, 'No se pudo cargar cargar los Bancos')
    }
}

const getBanco = async(req, res) => {
    try {
        req = matchedData(req)
        console.log(req)
        const { id } = req
        const data = await Banco.findOne({
            where: {
                id: id,
                habilitado: true
            }
        })
        if (!data){
            return res.status(404).json({
                message: 'Banco no encontrado o inactivo'
            })
        }

        res.status(200).json(data);
        console.log(data)
    } catch (error) {
        handleHttpError(res, 'Error al traer Banco')
        console.error(error)
    }
}

const createBanco = async (req, res) => {
    try {
        const body = matchedData(req)
        const response = await Banco.create(body)
        res.send(response)
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'No se pudo crear este Banco, Intenta de nuevo')
    }
}

const deleteBanco = async(req, res) =>{
    try {
        const { id } = req.params
        console.log(id)

        const response = await Banco.update({habilitado: false}, {
            where: {id, habilitado: true}
        })

        if(response === 0) {
            return res.status(404).json({
                message: 'Banco no encontrado y/o inactivo'
            })
        }

        res.status(200).json({
            message: 'Banco eliminado con exito'
        })
    } catch (error) {
        handleHttpError(res, 'No se pudo eliminar el Banco, intenta otra vez')
        console.error(error)
    }
}

const updateBancos = async (req, res) => {
    try {
        const { id } = req.params

        const body = req.body
        console.log('Banco', id)

        const response = await Banco.update(body, {
            where: { id }
        })

        if (response[0] === 0){
            return res.status(404).json({
                message: 'Banco no encontrado o sin cambios'
            })
        }

        const updateBancos = await Banco.findByPk(id);

        res.status(200).json({
            message: 'Banco actualizado correctamente',
            data: updateBancos
        }); 
    } catch (error) {
        handleHttpError(res, 'No se pudo actuaizar el Banco, intenta nuevamente')
        console.error(error)
    }
}

export{
    getBancos,
    getBanco,
    createBanco,
    deleteBanco,
    updateBancos
}