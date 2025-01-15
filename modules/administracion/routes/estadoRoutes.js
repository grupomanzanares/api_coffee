import express from 'express';
import { getEstado, getEstados, createEstado, deleteEstado, updateEstado } from '../controllers/estadoController.js';
import { apiAuth } from '../../../auth/middleware/apiauth.js';



const router = express.Router();

router.get('/', apiAuth, getEstados)
router.get('/:id', apiAuth,   getEstado)
router.post('/create', apiAuth,   createEstado)
router.put('/:id', apiAuth,  updateEstado)
router.delete('/delete/:id',  apiAuth, deleteEstado)


export default router
