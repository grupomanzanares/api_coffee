import express from 'express';
import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { validateCreateProgramacion, validateGetProgramacion } from '../validators/programacion.js';
import { deleteProgramacionTrabajador, getProgramacionTrabajador, getProgramacionTrabajadores,setProgramacionTrabajadores } from '../controllers/ProgramacionTrabajadoresController.js';



//falta arreglar las validaciones...
const router = express.Router();

router.get('/', apiAuth, getProgramacionTrabajadores)
router.get('/:id', apiAuth, getProgramacionTrabajador)
router.post('/create/:programacionId', apiAuth,  setProgramacionTrabajadores)
router.put('/:programacionId', apiAuth,  setProgramacionTrabajadores)
router.delete('/delete/:id',  apiAuth, deleteProgramacionTrabajador)


export default router
