import { body, matchedData } from 'express-validator'
import { handleHttpError } from '../helpers/httperror.js'
import Recoleccion from '../models/Recoleccion.js'

const getRecolecciones = async (req, res) => {
    try {
        const registros = await Recoleccion.findAll({
        })
        res.json(registros)
    } catch (error) {
        handleHttpError(res, 'No se pudo cargar las recolecciones')
    }
}

const getRecoleccion = async (req, res) => {
    try {
        req = matchedData(req)
        console.log(req)
        const { nit } = req
        const data = await Recoleccion.findOne({
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

const createRecoleccion = async (req, res) => {
    try {
        // const body = matchedData(req)
        const body = req.body
        console.log('Datos validados para creación:', body); // Para depuración
        const response = await Recoleccion.create(body)
        res.status(201).send(response); // 201 indica creación exitosa
    } catch (error) {
        const statusCode = error.name === 'ValidationError' ? 400 : 500;
        handleHttpError(res, 'No se pudo crear la recoleccion, intenta nuevamente', statusCode);
        console.error(error)
    }
}

const deleteRecoleccion = async (req, res) => {
    try {
        const { nit } = req.params
        console.log(nit)

        const response = await Recoleccion.update({habilitado: false}, {
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

const updateRecoleccion = async (req, res) => {
    try {
        // Obtener el NIT desde los parámetros de la URL
        const { nit } = req.params;
        
        // Extraer los datos del cuerpo de la solicitud
        const body = req.body;
        console.log('Datos recibidos para actualización:', body);
        console.log('NIT recibido:', nit);  // Verificar si el NIT se recibe correctamente

        // Realizamos la actualización
        const [rowsUpdated] = await Recoleccion.update(body, {
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
        const updatedRecolector = await Recoleccion.findByPk(nit);
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
    getRecolecciones,
    getRecoleccion,
    createRecoleccion,
    deleteRecoleccion,
    updateRecoleccion
}