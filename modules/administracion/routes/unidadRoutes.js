import express from 'express';
import { getUnidad, getUnidades, createUnidad, deleteUnidad, updateUnidad } from '../controllers/unidadController.js';
import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { validateCreateUnidad, validateGetUnidad } from '../validators/unidad.js';


const router = express.Router();

router.get('/', apiAuth, getUnidades)
router.get('/:id', apiAuth, validateGetUnidad,  getUnidad)
router.post('/create', apiAuth, validateCreateUnidad,  createUnidad)
router.put('/:id', apiAuth,validateGetUnidad,  updateUnidad)
router.delete('/delete/:id',  apiAuth, deleteUnidad)


export default router
