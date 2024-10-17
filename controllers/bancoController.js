import { matchedData } from "express-validator";
import { handleHttpError } from '../helpers/httperror.js'
import Banco from "../models/Banco.js";

const getBancos = async (req, res) =>{
    try {
        const registros = await Banco.findAll({
            where: {habilitado: true}
        });
        res.json(registros)
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

        const response = await Banco.update({habilitado: true}, {
            where: {id, habilitado: false}
        })

        if(response === 0) {
            return res.status(404).json({
                message: 'Banco no encontrado y/o inactivo'
            })
        }
    } catch (error) {
        handleHttpError(res, 'No se pudo eliminar el Banco, intenta otra vez')
        console.error(error)
    }
}

export{
    getBancos,
    getBanco,
    createBanco,
    deleteBanco
}