import express from 'express';
import { createRecoleccion, deleteRecoleccion, getRecoleccion, getRecolecciones, updateRecoleccion } from '../controllers/recoleccionController.js';
import { apiAuth } from '../middleware/apiauth.js';
import { validateCreateRecolector, validateGetRecolector } from '../validators/recolectores.js';

const router = express.Router()

router.get('/', getRecolecciones)
router.get('/:recoleccion', validateGetRecolector, getRecoleccion)
router.post('/create',  validateCreateRecolector, createRecoleccion)
router.put('/update/:recoleccion', updateRecoleccion)
router.delete('/delete/:recoleccion', deleteRecoleccion)

export default router