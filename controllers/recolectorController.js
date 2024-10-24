import { body, matchedData } from 'express-validator'
import { handleHttpError } from '../helpers/httperror.js'
import Recolector from '../models/Recolector.js'

const getRecolectores = async (req, res) => {
    try {
        const recolector = await Recolector.findAll({
            where: {habilitado: true}
        })
        res.json(recolector)
    } catch (error) {
        handleHttpError(res, 'No se pudo cargar los recolectores')
    }
}

const getRecolector = async (req, res) => {
    try {
        req = matchedData(req)
        console.log(req)
        const { nit } = req
        const data = await Recolector.findOne({
            where: {
                nit: nit,
                habilitado: true
            }
        })
        if(!data){
            return res.status(404).json({
                message: 'Recolector no encontrado y/o inactivo'
            })
        }
        res.status(200).json(data)
        console.log(data)
    } catch (error) {
        handleHttpError(res, 'Error al traer al Recolector')
        console.error(error)
    }
}

const createRecolector = async (req, res) => {
    try {
        const body = matchedData(req)
        const response = await Recolector.create(body)
        res.send(response)
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'No se pudo crear al Recolector, Intenta nuevamente')
    }
}

const deleteRecolector = async (req, res) => {
    try {
        const { nit } = req.params
        console.log(nit)

        const response = await Recolector.update({habilitado: false}, {
            where: {nit, habilitado: true}
        })

        if (response === 0) {
            return res.status(404).json({
                message: 'Recolector no encontrado y/o inactivo'
            })
        }
        res.status(200).json({
            message: 'Recolector eliminado con exito'
        })
    } catch (error) {
        handleHttpError(res, 'No se pudo eliminar al Recolector, intenta de nuevo')
        console.error(error)
    }
}

const updateRecolector = async (req, res) => {
    try {
        // Obtener el NIT desde los parámetros de la URL
        const { nit } = req.params;
        
        // Extraer los datos del cuerpo de la solicitud
        const body = req.body;
        console.log('Datos recibidos para actualización:', body);
        console.log('NIT recibido:', nit);  // Verificar si el NIT se recibe correctamente

        // Realizamos la actualización
        const [rowsUpdated] = await Recolector.update(body, {
            where: { nit }
        });

        console.log('Filas afectadas:', rowsUpdated); // Verificar cuántas filas fueron afectadas

        // Verificamos si alguna fila fue actualizada
        if (rowsUpdated === 0) {
            return res.status(404).json({
                message: 'Recolector no encontrado o los datos no han cambiado'
            });
        }

        // Obtener el recolector actualizado
        const updatedRecolector = await Recolector.findByPk(nit);
        console.log('Recolector actualizado:', updatedRecolector); // Verificar si los datos actualizados se obtienen correctamente

        // Enviar respuesta con los datos actualizados
        res.status(200).json({
            message: 'Recolector actualizado correctamente',
            data: updatedRecolector
        });
    } catch (error) {
        console.error('Error al actualizar:', error); // Imprimir error para mayor claridad
        handleHttpError(res, 'No se pudo actualizar al Recolector, intenta nuevamente');
    }
};


export{
    getRecolectores,
    getRecolector,
    createRecolector,
    deleteRecolector,
    updateRecolector
}