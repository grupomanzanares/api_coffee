import { body, matchedData } from 'express-validator'
import { handleHttpError } from '../helpers/httperror.js'
import Trabajador from '../models/Trabajador.js'

const getTrabajadores = async (req, res) => {
    try {
        const registros = await Trabajador.findAll({
        })
        res.json(registros)
    } catch (error) {
        handleHttpError(res, 'No se pudo cargar los Trabajadores')
    }
}

const getTrabajador = async (req, res) => {
    try {
        req = matchedData(req)
        console.log(req)
        const { nit } = req
        const data = await Trabajador.findOne({
            where: {
                nit: nit,
                habilitado: true
            }
        })
        if(!data){
            return res.status(404).json({
                message: 'Trabajador no encontrado y/o inactivo'
            })
        }
        res.status(200).json(data)
        console.log(data)
    } catch (error) {
        handleHttpError(res, 'Error al traer al Trabajador')
        console.error(error)
    }
}

const createTrabajador = async (req, res) => {
    try {
        const body = matchedData(req)
        console.log('Datos validados para creación:', body); // Para depuración
        const response = await Trabajador.create(body)
        res.status(201).send(response); // 201 indica creación exitosa
    } catch (error) {
        const statusCode = error.name === 'ValidationError' ? 400 : 500;
        handleHttpError(res, 'No se pudo crear al Trabajador, intenta nuevamente', statusCode);
    }
}

const deleteTrabajador = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)

        const response = await Trabajador.update({habilitado: false}, {
            where: {id, habilitado: true}
        })

        if (response === 0) {
            return res.status(404).json({
                message: 'Trabajador no encontrado y/o inactivo'
            })
        }
        res.status(200).json({
            message: 'Trabajador eliminado con exito'
        })
    } catch (error) {
        handleHttpError(res, 'No se pudo eliminar al Trabajador, intenta de nuevo')
        console.error(error)
    }
}

const updateTrabajador = async (req, res) => {
    try {
        // Obtener el NIT desde los parámetros de la URL
        const { id } = req.params;
        
        // Extraer los datos del cuerpo de la solicitud
        const body = req.body;
        console.log('Datos recibidos para actualización:', body);


        // Realizamos la actualización
        const [rowsUpdated] = await Trabajador.update(body, {
            where: { id }
        });

        console.log('Filas afectadas:', rowsUpdated); // Verificar cuántas filas fueron afectadas

        // Verificamos si alguna fila fue actualizada
        if (rowsUpdated === 0) {
            return res.status(404).json({
                message: 'Trabajador no encontrado o los datos no han cambiado'
            });
        }

        // Obtener el Trabajador actualizado
        const updatedTrabajador = await Trabajador.findByPk(id);
        console.log('Trabajador actualizado:', updatedTrabajador); // Verificar si los datos actualizados se obtienen correctamente

        // Enviar respuesta con los datos actualizados
        res.status(200).json({
            message: 'Trabajador actualizado correctamente',
            data: updatedTrabajador
        });
    } catch (error) {
        console.error('Error al actualizar:', error); // Imprimir error para mayor claridad
        handleHttpError(res, 'No se pudo actualizar al Trabajador, intenta nuevamente');
    }
};


export{
    getTrabajadores,
    getTrabajador,
    createTrabajador,
    deleteTrabajador,
    updateTrabajador
}