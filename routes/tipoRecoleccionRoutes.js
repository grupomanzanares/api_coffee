import express from 'express';
import { getTipoRecoleccion, getTiposRecolecciones, createTipoRecoleccion, deleteTipoRecoleccion } from '../controllers/tipoRecoleccionController.js';
import { apiAuth } from '../middleware/apiauth.js'
//import { validateCreateTipoContrato, validateGetTipoContrato } from '../validators/tipoContrato.js'

const router = express.Router();

router.get('/', getTiposRecolecciones)
//router.get('/:id', validateGetTipoContrato, getTipoContrato)
//router.post('/create', validateCreateTipoContrato, apiAuth, createTipoContrato)
//router.delete('/delete/:id', deleteTipoContrato)


export default router