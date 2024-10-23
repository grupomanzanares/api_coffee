import { handleHttpError } from '../helpers/httperror.js';
import Finca from '../models/Finca.js'

const getFinca = async (req, res) => {
    try {
        const finca = await Finca.findAll({
            where: {habilitado: true}
        });
        res.json(finca)
    } catch (error) {
        handleHttpError(res, 'No se pudo cargar las Fincas')
    }
};

export {
    getFinca
};
