import { matchedData } from "express-validator";
import Contrato from '../models/TiposContratos.js'
import { handleHttpError } from '../helpers/httperror.js'

const getContratos = async (req, res) =>{
    try {
        const contratos = await Contrato.findAll({
            where: {habilitado: false}
        });
        res.json(contratos)
    }catch{
        handleHttpError(res, 'No se oudoo cargar los usuarios')
    }
}

const getContrato = async(req, res) => {
    try {
        req = matchedData(req)
        console.log(req)
        const { id } = req
        const data = await Contrato.findOne({
            where: {
                id: id,
                habilitado: false
            }
        })
        if (!data){
            return res.status(404).json({
                message: 'Contrato no encontrado o eliminado'
            })
        }

        res.status(200).json(data);
        console.log(data)
    } catch (error) {
        handleHttpError(res, 'Error al traer el tipo de contrato')
        console.error(error)
    }
}

const createContrato = async (req, res) => {
    try {
        const body = matchedData(req)
        const response = await Contrato.create(body)
        res.send(response)
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'No se pudo crear este contrato, Intenta de nuevo')
    }
}

const deleteContrato = async(req, res) =>{
    try {
        const { id } = req.params
        console.log(id)

        const response = await Contrato.update({habilitado: true}, {
            where: {id, habilitado: false}
        })

        if(response === 0) {
            return res.status(404).json({
                message: 'Contrato no encontrado y/o eliminado'
            })
        }
    } catch (error) {
        handleHttpError(res, 'No se pudo eliminar el contrato, intenta otra vez')
        console.error(error)
    }
}

export{
    getContrato,
    getContratos,
    createContrato,
    deleteContrato
}