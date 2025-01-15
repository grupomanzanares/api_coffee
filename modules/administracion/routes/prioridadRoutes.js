import express from 'express';
import { getPrioridad, getPrioridades, createPrioridad, deletePrioridad, updatePrioridad } from '../controllers/prioridadController.js';
import { apiAuth } from '../../../auth/middleware/apiauth.js';



const router = express.Router();

router.get('/', apiAuth, getPrioridades)
router.get('/:id', apiAuth,   getPrioridad)
router.post('/create', apiAuth,   createPrioridad)
router.put('/:id', apiAuth,  updatePrioridad)
router.delete('/delete/:id',  apiAuth, deletePrioridad)


export default router
