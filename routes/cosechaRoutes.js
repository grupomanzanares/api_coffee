import express from 'express';
import { getCosecha, getCosechas, createCosecha, deleteCosecha, updateCosecha } from '../controllers/cosechaController.js';
import { apiAuth } from '../middleware/apiauth.js'
import { validateCreateCosecha, validateGetCosecha } from '../validators/cosecha.js';
//import { validateCreateTipoContrato, validateGetTipoContrato } from '../validators/tipoContrato.js'

const router = express.Router();

router.get('/', getCosechas)
router.get('/:id', validateGetCosecha, getCosecha)
router.post('/create', validateCreateCosecha, apiAuth, createCosecha)
router.put('/:id', validateGetCosecha, updateCosecha)
router.delete('/delete/:id', deleteCosecha)


export default router