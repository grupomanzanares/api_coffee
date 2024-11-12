import { matchedData } from 'express-validator';
import { handleHttpError } from '../helpers/httperror.js';
import Consecutivo from '../models/Consecutivo.js'
 

const getConsecutivos = async (req, res) => {
    try {
        const registros = await Consecutivo.findAll({
            where: {habilitado: true}
        });
        res.json(registros)
    } catch (error) {
        handleHttpError(res, 'No se pudo cargar registros: consecutivos')
    }
};

const getConsecutivo = async (req, res) => {
    try {
        req = matchedData(req)
        console.log(req)
        const { id } = req
        const data = await Consecutivo.findOne({
            where: {id: id, habilitado: true}
        })
        if (!data){
            return res.status(404).json({
                message: 'Consecutivo no encontrada o inactiva'
            })
        }
        res.status(200).json(data)
        console.log(data)
    } catch (error) {
        handleHttpError(res, 'Error al traer Consecutivo')
        console.error(error)
    }
}



const createConsecutivo = async (req, res) => {
    try {
        const body = matchedData(req)
        const response = await Consecutivo.create(body)
        res.send(response)
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'No se pudo crear este Cosecha, Intenta de nuevo')
    }
}

const  updateConsecutivo = async (req, res, next) => {
    try {
        const { id } = req.params
        
        const body = req.body
        console.log("Consecutivo", id)

        const response = await Consecutivo.update(body, {
            where: { id }
        })

        if (response === 0) {
            return res.status(404).json({
                message: 'Cosecha no encontrada o sin cambios'
            })
        }

        const updateRegistro = await Consecutivo.findByPk(id)

        res.status(200).json({
            message: 'Cosecha actualizada correctamente',
            data: updateRegistro
        })
    } catch (error) {
        handleHttpError(res, 'No se pudo actualizar, intenta de nuevo')
    }
}    

//c

export {
    getConsecutivos,
    getConsecutivo,
    createConsecutivo,
    updateConsecutivo

};
