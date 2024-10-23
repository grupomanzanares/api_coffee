import { handleHttpError } from '../helpers/httperror.js'
import Recolector from '../models/Recolector.js'

const getRecolector = async (req, res) => {
    try {
        const recolector = await Recolector.findAll({
            where: {habilitado: true}
        })
        res.json(recolector)
    } catch (error) {
        handleHttpError(res, 'No se pudo cargar los recolectores')
    }
}

export{
    getRecolector
}