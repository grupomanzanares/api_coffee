import Storage from "../models/Storage.js";

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { handleHttpError } from '../helpers/httperror.js'



const filename = fileURLToPath(import.meta.url) // archivo storageController.js   (este archivo)
const dirname = path.dirname(filename)          // Se ubica en controllers   (directorio, del archivo)
const PATH_STORAGE =   `${dirname}/../storage`  // Sale de controllers e ingresa a la carpeta storage



const getStorages = async (req, res) => {
    const data = await Storage.findAll({});
    res.send({ data });
};

const getStorage = (req, res) => {};


const createStorage = async (req, res) => {

    /** Desestructuramos */
    const  { body , file}  = req
    //console.log(file)

    /** Verificamos si se ha recibido un archivo */
    if (!file) {
        return res.status(400).json({
            message: 'No se ha recibido ningún archivo'
        });
    }

    /** Creamos un objeto */
    let data = {
        filename: file.filename,
        url: file.path
    }

    /** Creamos el registro en la base de datos:  la imagen se guarda en el servidor */
    try {
        const response = await Storage.create(data)
        res.status(201).json(response)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al guardar el archivo en la base de datos' })
    }

};

const updateStorage = (req, res) => {};


const deleteStorage = async (req, res) => {
    try{
        console.log(PATH_STORAGE)
        const { id } = req.params
        const data = await Storage.findById({'_id': id})
        const filePath = `${PATH_STORAGE}/${data.filename}` //c:/react/api/storage/akjsdkja.js
        //eliminación fisica del media
        fs.unlinkSync(filePath)
        //eliminar documento de la BAse de datos
        const storageDelete = await Storage.deleteOne({'_id': id})
        const response = {
            filePath,
            deleted: true
        }
        res.send(response)
    }catch(e){
        handleHttpError(res, 'No se pudo eliminar el storage, intente nuevamente')
    }

};

export {
    getStorages,
    getStorage,
    createStorage,
    updateStorage,
    deleteStorage
};
