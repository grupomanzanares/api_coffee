import express from 'express';
import { getBanco, getBancos, createBanco, deleteBanco, updateBancos } from '../controllers/bancoController.js';
import { apiAuth } from '../middleware/apiauth.js'
import { validateCreateBanco, validateGetBanco } from '../validators/banco.js';

const router = express.Router();

router.get('/', getBancos)
router.get('/:id', validateGetBanco, getBanco)
router.post('/create', validateCreateBanco, apiAuth, createBanco)
router.put('/:id', validateGetBanco, updateBancos)
router.delete('/delete/:id',  deleteBanco)


export default router