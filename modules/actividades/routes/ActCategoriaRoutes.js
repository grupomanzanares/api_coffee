import express from 'express';
import { getActCategoria, getActCategorias, createActCategoria, deleteActCategoria, updateActCategoria } from '../controllers/actCategoriaController.js';
import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { validateCreateActCategoria, validateGetActCategoria } from '../validators/actCategoria.js';


//falta arreglar las validaciones...
const router = express.Router();

router.get('/', apiAuth, getActCategorias)
router.get('/:id', apiAuth, validateGetActCategoria,  getActCategoria)
router.post('/create', apiAuth, validateCreateActCategoria, createActCategoria)
router.put('/:id', apiAuth,validateGetActCategoria,  updateActCategoria)
router.delete('/delete/:id',  apiAuth, deleteActCategoria)


export default router
