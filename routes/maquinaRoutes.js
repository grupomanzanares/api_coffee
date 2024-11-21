import express from 'express';
import { getMaquina, getMaquinas} from '../controllers/maquinaController.js';

const router = express.Router()

router.get('/', getMaquinas)
router.get('/:id',  getMaquina)

export default router