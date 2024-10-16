import express from 'express';
import { getContrato, getContratos, createContrato, deleteContrato } from '../controllers/contratoController.js';
import { apiAuth } from '../middleware/apiauth.js'
import { validateCreateContrato, validateGetContrato } from '../validators/contrato.js'

const router = express.Router();

router.get('/', getContratos)
router.get('/:id', validateGetContrato, getContrato)
router.post('/create', validateCreateContrato, apiAuth, createContrato)
router.delete('/delete/:id', deleteContrato)


export default router
