import express from 'express';
import { createRecoleccion, deleteRecoleccion, getRecoleccion, getRecolecciones, updateRecoleccion } from '../controllers/recoleccionController.js';
import { validateCreateRecoleccion, validateGetRecoleccion } from '../validators/recoleccion.js';

const router = express.Router()

router.get('/', getRecolecciones)
router.get('/:prefijo/:id', validateGetRecoleccion, getRecoleccion)
router.post('/create', validateCreateRecoleccion, createRecoleccion)
router.put('/update/:prefijo/:id', updateRecoleccion)
router.delete('/delete/:prefijo/:id', deleteRecoleccion)

export default router