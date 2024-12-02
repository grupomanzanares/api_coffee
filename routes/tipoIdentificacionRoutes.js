import express from 'express';
import { getTipoIdentificacion, getTipoIdentificaciones, createTipoIdentificacion, deleteTipoIdentificacion, updateTipoIdentificacion } from '../controllers/tipoIdentificacionController.js';
import { apiAuth } from '../auth/middleware/apiauth.js'
import { validateCreateTipoIdentificacion, validateGetTipoIdentificacion } from '../validators/tipoIdentidicacion.js';
//import { validateCreateTipoContrato, validateGetTipoContrato } from '../validators/tipoContrato.js'

const router = express.Router();

router.get('/', getTipoIdentificaciones)
router.get('/:id', validateGetTipoIdentificacion, getTipoIdentificacion)
router.post('/create', validateCreateTipoIdentificacion, apiAuth, createTipoIdentificacion)
router.put('/:id', validateGetTipoIdentificacion, updateTipoIdentificacion)
router.delete('/delete/:id', deleteTipoIdentificacion)


export default router
