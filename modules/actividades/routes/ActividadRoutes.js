import express from 'express';
import { getActividad, getActividades, createActividad, deleteActividad, updateActividad } from '../controllers/actividadController.js';
import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { validateCreateActCategoria, validateGetActCategoria } from '../validators/actCategoria.js';


//falta arreglar las validaciones...
const router = express.Router();

router.get('/', apiAuth, getActividades)
router.get('/:id', apiAuth, validateGetActCategoria,  getActividad)
router.post('/create', apiAuth,validateCreateActCategoria, apiAuth, createActividad)
router.put('/:id', apiAuth,validateGetActCategoria,  updateActividad)
router.delete('/delete/:id',  apiAuth, deleteActividad)


export default router
