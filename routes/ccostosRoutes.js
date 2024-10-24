import express from 'express';
import { createCcosto, deleteCcosto, getCcosto, getCcostos, updateCcosto } from '../controllers/ccostoController.js';
import { validateCreateCcostos, validateGetCcosto } from '../validators/ccostos.js';


const router = express.Router();

router.get('/', getCcostos)
router.get('/:ccosto', validateGetCcosto, getCcosto)
router.post('/create', validateCreateCcostos, createCcosto)
router.put('/:ccosto', validateGetCcosto, updateCcosto)
router.delete('/delete/:ccosto', deleteCcosto)

export default router