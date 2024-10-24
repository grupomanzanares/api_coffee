import express from 'express';
import { createFinca, deleteFinca, getFinca, getFincas } from '../controllers/fincaController.js';
import { validateCreateFinca, validateGetFinca } from '../validators/fincas.js';
import uploadFile from '../middleware/upload.js';

const router = express.Router()

router.get('/', getFincas)
router.get('/:id', validateGetFinca, getFinca)
router.post('/create', uploadFile.single('imagen'), createFinca)
router.delete('/delete/:id', deleteFinca)

export default router