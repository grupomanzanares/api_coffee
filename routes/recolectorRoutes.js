import express from 'express';
import { createRecolector, deleteRecolector, getRecolector, getRecolectores, updateRecolector } from '../controllers/recolectorController.js';
import { apiAuth } from '../middleware/apiauth.js';
import { validateCreateRecolector, validateGetRecolector } from '../validators/recolectores.js';

const router = express.Router()

router.get('/', getRecolectores)
router.get('/:nit', validateGetRecolector, getRecolector)
router.post('/create',  validateCreateRecolector, createRecolector)
router.put('/update/:nit', updateRecolector)
router.delete('/delete/:nit', deleteRecolector)

export default router