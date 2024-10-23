import { handleHttpError } from '../helpers/httperror.js';
import FincaLote from '../models/FincaLote.js'

const getFincaLote = async (req, res) => {
    try {
        const fincalote = await FincaLote.findAll({
            where: {habilitado: true}
        });
        res.json(fincalote)
    } catch (error) {
        handleHttpError(res, 'No se pudo cargar los Lotes de las fincas')
    }
}

export{
    getFincaLote
}