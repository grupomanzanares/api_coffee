import { handleHttpError } from '../helpers/httperror.js';
import Ccosto from '../models/Ccosto.js'

const getCcosto = async (req, res) => {
    try {
        const costos = await Ccosto.findAll({
            where: {estado: true}
        });
        res.json(costos)
    } catch (error) {
        handleHttpError(res, 'No se pudo cargar los Centros de costo')
    }
}

export{
    getCcosto
}