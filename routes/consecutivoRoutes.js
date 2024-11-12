import express from 'express';
import { createRecoleccion, deleteRecoleccion, getRecoleccion, getRecolecciones, updateRecoleccion } from '../controllers/consecutivoController.js';
import { validateCreateRecoleccion, validateGetRecoleccion } from '../validators/recoleccion.js';

const router = express.Router()

router.get('/', getConsecutivos)
router.get('/:prefijo/:id', validateGetRecoleccion, getConsecutivo)
router.post('/create', validateCreateRecoleccion, createConsecutivo)
router.put('/update/:prefijo/:id', updateConsecutivo)


export default router