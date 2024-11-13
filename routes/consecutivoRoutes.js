import express from 'express';
import { createConsecutivo,  getConsecutivo, getConsecutivos, updateConsecutivo } from '../controllers/consecutivoController.js';
import { validateCreateRecoleccion, validateGetRecoleccion } from '../validators/recoleccion.js';

const router = express.Router()

router.get('/', getConsecutivos)
router.get('/:prefijo', getConsecutivo)
router.post('/create', validateCreateRecoleccion, createConsecutivo)
router.put('/update/:prefijo', updateConsecutivo)


export default router