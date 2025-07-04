import express from 'express';
import { getProgramacion,  deleteProgramacion, updateProgramacion, createProgramacion, getProgramaciones, getProgramacionesRecientes } from '../controllers/programacionController.js';
import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { validateCreateProgramacion, validateGetProgramacion } from '../validators/programacion.js';



//falta arreglar las validaciones...
const router = express.Router();

router.get('/', apiAuth, getProgramaciones)
router.get('/recientes', apiAuth, getProgramacionesRecientes)
router.get('/:id', apiAuth, validateGetProgramacion, getProgramacion)
router.post('/create', apiAuth, validateCreateProgramacion, createProgramacion)
router.put('/:id', apiAuth,  updateProgramacion)
router.delete('/delete/:id',  apiAuth, deleteProgramacion)


export default router
