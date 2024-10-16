import { matchedData } from "express-validator";
import TiposContrato from "../models/TiposContrato.js";
import { handleHttpError } from '../helpers/httperror.js'


const getTipoContratos = async (req, res) =>{
    try {
        console.log("Accediendo a la ruta /contrato es decir todos los tipos de contrato");
        const tiposcontratos = await TiposContrato.findAll({
            where: {habilitado: false}
        });
        res.json(tiposcontratos)
    }catch{
        handleHttpError(res, 'No se oudoo cargar los usuarios')
    }
}

const getTipoContrato = async(req, res) => {
    try {
        req = matchedData(req)
        console.log(req)
        const { id } = req
        const data = await TiposContrato.findOne({
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

const createTipoContrato = async (req, res) => {
    try {
        const body = matchedData(req)
        const response = await TiposContrato.create(body)
        res.send(response)
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'No se pudo crear este contrato, Intenta de nuevo')
    }
}

const deleteTipoContrato = async(req, res) =>{
    try {
        const { id } = req.params
        console.log(id)

        const response = await TiposContrato.update({habilitado: true}, {
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
    getTipoContrato,
    getTipoContratos,
    createTipoContrato,
    deleteTipoContrato
}