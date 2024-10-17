import express from 'express';
import { getTipoContrato, getTipoContratos, createTipoContrato, deleteTipoContrato } from '../controllers/tipoContratoController.js';
import { apiAuth } from '../middleware/apiauth.js'
import { validateCreateTipoContrato, validateGetTipoContrato } from '../validators/tipoContrato.js'

const router = express.Router();

router.get('/', getTipoContratos)
router.get('/:id', validateGetTipoContrato, getTipoContrato)
router.post('/create', validateCreateTipoContrato, apiAuth, createTipoContrato)
router.delete('/delete/:id', deleteTipoContrato)


export default router
