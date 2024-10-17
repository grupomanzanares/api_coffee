import express from 'express';
import { getCosecha, getCosechas, createCosecha, deleteCosecha } from '../controllers/cosechaController.js';
import { apiAuth } from '../middleware/apiauth.js'
//import { validateCreateTipoContrato, validateGetTipoContrato } from '../validators/tipoContrato.js'

const router = express.Router();

router.get('/', getCosechas)
//router.get('/:id', validateGetTipoContrato, getTipoContrato)
//router.post('/create', validateCreateTipoContrato, apiAuth, createTipoContrato)
//router.delete('/delete/:id', deleteTipoContrato)


export default router