import express from 'express';
import { getFincaLote } from '../controllers/fincaloteController.js';

const router = express.Router();

router.get('/', getFincaLote)

export default router