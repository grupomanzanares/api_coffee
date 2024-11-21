import { body, matchedData } from 'express-validator'
import { handleHttpError } from '../helpers/httperror.js'
import Maquina from '../models/Maquina.js'

const getMaquinas = async (req, res) => {
    try {
        const registro = await Maquina.findAll({
            where: {habilitado: true}
        })
        res.json(registro)
    } catch (error) {
        handleHttpError(res, 'No se pudo cargar las Maquinas')
    }
}

const getMaquina= async (req, res) => {
    try {
        req = matchedData(req)
        console.log(req)
        const { id } = req
        const data = await Maquina.findOne({
            where: {
                id: id,
                habilitado: true
            }
        })
        if(!data){
            return res.status(404).json({
                message: 'Maquina no encontrada y/o inactivo'
            })
        }
        res.status(200).json(data)
        console.log(data)
    } catch (error) {
        handleHttpError(res, 'Error al traer la Maquina')
        console.error(error)
    }
}


export{
    getMaquinas,
    getMaquina
}