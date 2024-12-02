import express from 'express';
import { getTipoRecoleccion, getTiposRecolecciones, createTipoRecoleccion, deleteTipoRecoleccion, updateTipoRecoleccion } from '../controllers/tipoRecoleccionController.js';
import { apiAuth } from '../auth/middleware/apiauth.js'
import { validateCreateTipoRecoleccion, validateGetTipoRecoleccion } from '../validators/tipoRecoleccion.js';
//import { validateCreateTipoContrato, validateGetTipoContrato } from '../validators/tipoContrato.js'

const router = express.Router();

router.get('/', getTiposRecolecciones)
router.get('/:id', validateGetTipoRecoleccion, getTiposRecolecciones )
router.post('/create', validateCreateTipoRecoleccion, apiAuth, createTipoRecoleccion)
router.put('/:id', validateGetTipoRecoleccion, updateTipoRecoleccion)
router.delete('/delete/:id', deleteTipoRecoleccion)


export default router