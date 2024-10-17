import express from 'express';
import { getBanco, getBancos, createBanco, deleteBanco } from '../controllers/bancoController.js';
import { apiAuth } from '../middleware/apiauth.js'
//import { validateCreateTipoContrato, validateGetTipoContrato } from '../validators/tipoContrato.js'

const router = express.Router();

router.get('/', getBancos)
//router.get('/:id', validateGetTipoContrato, getTipoContrato)
//router.post('/create', validateCreateTipoContrato, apiAuth, createTipoContrato)
//router.delete('/delete/:id', deleteTipoContrato)


export default router