import express from 'express';
import { getActSubCategoria, getActSubCategorias, createActSubCategoria, deleteActSubCategoria, updateActSubCategoria } from '../controllers/actSubCategoriaController.js';
import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { validateCreateActSubCategoria, validateGetActSubCategoria } from '../validators/actSubCategoria.js';


//falta arreglar las validaciones...
const router = express.Router();

router.get('/', apiAuth, getActSubCategorias)
router.get('/:id', apiAuth, validateGetActSubCategoria,  getActSubCategoria)
router.post('/create', apiAuth,validateCreateActSubCategoria, apiAuth, createActSubCategoria)
router.put('/:id', apiAuth,validateGetActSubCategoria,  updateActSubCategoria)
router.delete('/delete/:id',  apiAuth, deleteActSubCategoria)


export default router
