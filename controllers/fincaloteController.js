import { matchedData } from 'express-validator';
import { handleHttpError } from '../helpers/httperror.js';
import FincaLote from '../models/FincaLote.js'
const getFincaLotes = async (req, res) => {
    try {
        const fincalote = await FincaLote.findAll({
            where: {habilitado: true}
        });
        res.json(fincalote)
    } catch (error) {
        handleHttpError(res, 'No se pudo cargar los Lotes de las fincas')
    }
}

const getFincaLote = async (req, res) => {
    try {
        const { finca, lote } = req.params;  // Asegúrate de acceder a los parámetros directamente
        console.log(finca, lote);  // Verifica si los parámetros se reciben correctamente

        const data = await FincaLote.findOne({
            where: { finca, lote }
        });

        if (!data) {
            return res.status(404).json({
                message: 'Finca Lote no encontrado o inactivo'
            });
        }

        res.status(200).json(data);
    } catch (error) {
        handleHttpError(res, 'Error al traer la Finca Lote');
        console.error(error);
    }
};


// const createFincaLote = async (req, res) => {
//     try {
//         const body = matchedData(req)
//         const response = await FincaLote.create(body)
//         res.send(response)
//     } catch (error) {
//         handleHttpError(res, 'No se pudo crear esta Finca Lote, Intenta de nuevo')
//     }
// }

const createFincaLote = async (req, res) => {
    try {
        const file = req.file;  // Accedemos al archivo subido (imagen)
        const body = matchedData(req);  // Accedemos a los datos del formulario

        // Verificamos si la imagen fue subida
        if (!file) {
            return res.status(400).json({
                message: 'La imagen es requerida'
            });
        }

        const data = {
            ...body,  // Copiamos los datos del formulario
            imagen: file.path  // Añadimos la ruta de la imagen
        };

        const response = await FincaLote.create(data);
        res.status(201).json(response);
    } catch (error) {
        handleHttpError(res, 'No se pudo crear esta Finca Lote, intenta de nuevo');
        console.error(error);
    }
};


const deleteFincaLote = async (req, res) => {
    try {
        const { finca, lote } = req.params
        console.log(finca, lote)

        const response = await FincaLote.update({habilitado: false}, {
            where: {finca, lote, habilitado: true}
        })

        if (response === 0) {
            return res.status(404).json({
                message: 'Finca Lote no encontrada y/o inactiva'
            })
        }
        res.status(200).json({
            message: 'Finca Lote eliminado con exito'
        })
    } catch (error) {
        handleHttpError(res, 'No se pudo eliminar la finca lote, intenta de nuevo')
        console.log(error)       
    }
}

const updateFincaLote = async (req, res) => {
    try {
        const { finca, lote } = req.params

        const body = req.body
        console.log('Datos recibidos para la actualizacion: ', body)
        console.log('Finca recibida: ', finca)
        console.log('Lote recibido: ', lote)
    
        const response = await FincaLote.update(body, {
            where: { finca, lote }
        })
    
        if (response === 0) {
            return res.status(404).json({
                message: 'Finca lote no encontrada o sin cambios'
            })
        }

        const updateFincaLote = await FincaLote.findOne({
            where: { finca, lote}
        })

        res.status(200).json({
            message: 'Finca Lote actualizada correctamente',
            data: updateFincaLote
        })
    } catch (error) {
        handleHttpError(res, 'No se pudo actualiza la Finca Lote, intenta otra vez')
        console.error(error)
    }
}

export{
    getFincaLotes,
    getFincaLote,
    createFincaLote,
    deleteFincaLote,
    updateFincaLote
}