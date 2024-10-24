import express from 'express';
import { createFincaLote, deleteFincaLote, getFincaLote, getFincaLotes, updateFincaLote } from '../controllers/fincaloteController.js';
import { validateCreateFincaLote, validateGetFincaLote } from '../validators/fincalotes.js';
import uploadFile from '../middleware/upload.js';

const router = express.Router();

router.get('/', getFincaLotes)
router.get('/:finca/:lote', validateGetFincaLote, getFincaLote)
router.post('/create', uploadFile.single('imagen'), validateCreateFincaLote, createFincaLote)
router.put('/:finca/:lote', validateGetFincaLote, updateFincaLote)
router.delete('/delete/:finca/:lote', deleteFincaLote)

export default router