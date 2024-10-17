import express from 'express';
import { getTipoIdentificacion, getTipoIdentificaciones, createTipoIdentificacion, deleteTipoIdentificacion } from '../controllers/tipoIdentificacionController.js';
import { apiAuth } from '../middleware/apiauth.js'
//import { validateCreateTipoContrato, validateGetTipoContrato } from '../validators/tipoContrato.js'

const router = express.Router();

router.get('/', getTipoIdentificaciones)
//router.get('/:id', validateGetTipoContrato, getTipoContrato)
//router.post('/create', validateCreateTipoContrato, apiAuth, createTipoContrato)
//router.delete('/delete/:id', deleteTipoContrato)


export default router
