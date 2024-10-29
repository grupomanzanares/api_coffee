import { matchedData } from 'express-validator';
import { handleHttpError } from '../helpers/httperror.js';
import Variedad from '../models/Variedad.js'
 

const getVariedades = async (req, res) => {
    try {
        const variedad = await Variedad.findAll({
            where: {habilitado: true}
        });
        res.json(variedad)
    } catch (error) {
        handleHttpError(res, 'No se pudo cargar las Variedades')
    }
};

const getVariedad = async (req, res) => {
    try {
        req = matchedData(req)
        console.log(req)
        const { id } = req
        const data = await Variedad.findOne({
            where: {id: id, habilitado: true}
        })
        if (!data){
            return res.status(404).json({
                message: 'Variedad no encontrada o inactiva'
            })
        }
        res.status(200).json(data)
        console.log(data)
    } catch (error) {
        handleHttpError(res, 'Error al traer la Variedad')
        console.error(error)
    }
}

// const createFinca = async (req, res) => {
//     try {
//         const body = matchedData(req)
//         const response = await Finca.create(body)
//         res.send(response)
//     } catch (error) {
//         console.log(error)
//         handleHttpError(res, 'No se pudo crear la Finca, Intenta de nuevo')
//     }
// }

const createVariedad = async (req, res) => {
    const file = req.file;  // Accedemos a la imagen subida desde req.file
    const body = req.body;  // Accedemos a los demás datos desde req.body

    // Verificamos si la imagen fue subida
    if (!file) {
        return res.status(400).json({
            message: 'La imagen es requerida'
        });
    }



    let data = {
        nombre: body.nombre,
        descripcion: body.descripcion,
        sigla: body.sigla,
        ccosto: body.ccosto,
        municipio: body.municipio,
        imagen: file.path,  // Guardamos la ruta de la imagen subida
        habilitado: body.habilitado || true,
        usuario: body.usuario,
        usuarioMod: body.usuarioMod
    };

    try {
        const response = await Finca.create(data);
        res.status(201).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la finca' });
    }
};

const deleteVariedad = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)

        const response = await Variedad.update({habilitado: false}, {
            where: {id, habilitado: true}
        })

        if (response === 0) {
            return res.status(404).json({
                message: 'Variedad no encontrada y/o inactiva'
            })
        }
        res.status(200).json({
            message: 'Variedad eliminada con exito'
        })
    } catch (error) {
        handleHttpError(res, 'No se pudo eliminar la Variedad, intentalo otra vez')
        console.error(error)
    }
}

export {
    getVariedades,
    getVariedad,
    createVariedad,
    deleteVariedad
};
