import express from 'express';
import { createVariedad, deleteVariedad, getVariedad, getVariedades } from '../controllers/VariedadController.js';
// import { validateCreateFinca, validateGetFinca } from '../validators/fincas.js';
// import uploadFile from '../middleware/upload.js';

const router = express.Router()

router.get('/', getVariedades)
router.get('/:id',  getVariedad)
//router.post('/create', uploadFile.single('imagen'), createFinca)
//router.delete('/delete/:id', deleteFinca)

export default router