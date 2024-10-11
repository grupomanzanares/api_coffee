import Storage from "../models/Storage.js";

const getStorages = async (req, res) => {
    const data = await Storage.findAll({});
    res.send({ data });
};

const getStorage = (req, res) => {};

const createStorage = async (req, res) => {
    const file = req.file;  // Accedemos directamente a req.file
    const body = req.body; 

    // Verificamos si se ha recibido un archivo
    if (!file) {
        return res.status(400).json({
            message: 'No se ha recibido ningún archivo'
        });
    }

    let data = {
        filename: file.filename,
        url: file.path
    }

    try {
        const response = await Storage.create(data)
        res.status(201).json(response)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al guardar el archivo en la base de datos' })
    }

};

const updateStorage = (req, res) => {};
const deleteStorage = (req, res) => {};

export {
    getStorages,
    getStorage,
    createStorage,
    updateStorage,
    deleteStorage
};
