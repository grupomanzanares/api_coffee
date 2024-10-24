import { matchedData } from 'express-validator';
import { handleHttpError } from '../helpers/httperror.js';
import Finca from '../models/Finca.js'
import Ccosto from "../models/Ccosto.js";

const getFincas = async (req, res) => {
    try {
        const finca = await Finca.findAll({
            where: {habilitado: true}
        });
        res.json(finca)
    } catch (error) {
        handleHttpError(res, 'No se pudo cargar las Fincas')
    }
};

const getFinca = async (req, res) => {
    try {
        req = matchedData(req)
        console.log(req)
        const { id } = req
        const data = await Finca.findOne({
            where: {id: id, habilitado: true}
        })
        if (!data){
            return res.status(404).json({
                message: 'Finca no encontrada o inactiva'
            })
        }
        res.status(200).json(data)
        console.log(data)
    } catch (error) {
        handleHttpError(res, 'Error al traer la Finca')
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

const createFinca = async (req, res) => {
    const file = req.file;  // Accedemos a la imagen subida desde req.file
    const body = req.body;  // Accedemos a los demás datos desde req.body

    // Verificamos si la imagen fue subida
    if (!file) {
        return res.status(400).json({
            message: 'La imagen es requerida'
        });
    }

    // Verificar si el centro de costo existe antes de crear la finca (opcional)
    const ccostoExists = await Ccosto.findOne({ where: { ccosto: body.ccosto } });
    if (!ccostoExists) {
        return res.status(400).json({
            message: 'El centro de costo proporcionado no existe'
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

const deleteFinca = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)

        const response = await Finca.update({habilitado: false}, {
            where: {id, habilitado: true}
        })

        if (response === 0) {
            return res.status(404).json({
                message: 'Finca no encontrada y/o inactiva'
            })
        }
        res.status(200).json({
            message: 'Finca eliminada con exito'
        })
    } catch (error) {
        handleHttpError(res, 'No se pudo eliminar la Finca, intentalo otra vez')
        console.error(error)
    }
}

export {
    getFincas,
    getFinca,
    createFinca,
    deleteFinca
};
