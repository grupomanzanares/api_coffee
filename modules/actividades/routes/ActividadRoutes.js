import express from 'express';
import { getActividad,  deleteActividad, updateActividad, createActividad, getActividades } from '../controllers/actividadController.js';
import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { validateCreateActividad, validateGeActividad } from '../validators/actividad.js';


//falta arreglar las validaciones...
const router = express.Router();

router.get('/', apiAuth, getActividades)
router.get('/:id', apiAuth, validateGeActividad, getActividad)
router.post('/create', apiAuth, validateCreateActividad, createActividad)
router.put('/:id', apiAuth,  updateActividad)
router.delete('/delete/:id',  apiAuth, deleteActividad)


export default router
